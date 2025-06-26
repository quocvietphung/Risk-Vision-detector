from flask import Flask, send_from_directory
from flask import request, jsonify
from models.uploads import Upload
import pandas as pd
import joblib
import numpy as np
from flask_cors import CORS
tx_model = Upload()
model = joblib.load("models/fraud_model.pkl")

app = Flask(__name__, static_folder="fraud-detection/dist", static_url_path="/")
CORS(app)

@app.route("/")
def serve_frontend():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route("/api/hello")
def hello_api():
    return {"message": "Hello from Flask API!"}

@app.route("/api/upload", methods=["POST"])
def upload_csv():
    """
    Lädt eine CSV-Datei mit Transaktionsdaten hoch, analysiert sie und berechnet Betrugsstatistiken.

    Die Funktion verarbeitet die hochgeladene CSV-Datei, berechnet:
    - Gesamtanzahl der Transaktionen
    - Anzahl der tatsächlichen Betrugsfälle (Class == 1)
    - Anzahl der vom Modell vorhergesagten Betrugsfälle
    - Betrugsrate (in Prozent)
    - Gesamtbetrag aller Transaktionen

    Zusätzlich wird eine Vorschau von 10 Beispieltransaktionen mit Risiko-Klassifizierung zurückgegeben.

    Rückgabe:
        JSON-Objekt mit folgenden Feldern:
        - file_name: Name der hochgeladenen Datei
        - total_transactions: Gesamtanzahl der Transaktionen
        - actual_fraud: Tatsächlich festgestellte Betrugsfälle
        - predicted_fraud: Vom Modell erkannte Betrugsfälle
        - fraud_percentage: Betrugsrate in Prozent
        - total_amount: Gesamtsumme der Transaktionen
        - transactions: Liste mit 10 Beispieltransaktionen mit Risiko ('Low' oder 'High')
    """
    file = request.files['file']
    filename = file.filename
    df = pd.read_csv(file)

    # Gesamtanzahl der Transaktionen berechnen
    total = len(df)

    # Tatsächliche Betrugsfälle zählen
    actual_fraud = df[df["Class"] == 1].shape[0]

    # Spalte 'Hour' hinzufügen (für Modellkompatibilität)
    df["Hour"] = (df["Time"] // 3600) % 24

    # Eingabedaten für Vorhersage vorbereiten
    X = df.drop(columns=["Class"]) if "Class" in df.columns else df

    # Betrugsvorhersage durch Modell
    y_pred = model.predict(X)
    predicted_fraud = int(np.sum(y_pred))

    # Falls verfügbar, Risiko-Wahrscheinlichkeit berechnen
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(X)[:, 1]
        df["risk_score"] = proba

    # Betrugsrate und Gesamtsumme berechnen
    fraud_percent = round((actual_fraud / total) * 100, 2)
    total_amount = round(df["Amount"].sum(), 2)

    # Statistiken in Datenbank speichern (ohne einzelne Transaktionen)
    tx_model.insert_upload_stats(
        file_name=filename,
        total_transactions=total,
        actual_fraud=actual_fraud,
        predicted_fraud=predicted_fraud,
        fraud_percentage=fraud_percent,
        total_amount=total_amount
    )

    # Vorschau: 10 Beispieltransaktionen
    sample = df.head(10).copy()
    sample["Hour"] = (sample["Time"] // 3600) % 24
    sample["pred"] = model.predict(sample[model.feature_names_in_])
    sample["risk"] = sample["pred"].apply(lambda x: "High" if x == 1 else "Low")

    transactions = sample[["Time", "Amount", "risk"]].rename(
        columns={"Time": "time", "Amount": "amount"}
    ).to_dict(orient="records")

    return jsonify({
        "file_name": filename,
        "total_transactions": total,
        "actual_fraud": actual_fraud,
        "predicted_fraud": predicted_fraud,
        "fraud_percentage": fraud_percent,
        "total_amount": total_amount,
        "transactions": transactions
    })


if __name__ == "__main__":
    app.run(debug=True)
