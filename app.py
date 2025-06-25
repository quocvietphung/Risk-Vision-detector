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

@app.route("/api/transactions", methods=["GET"])
def get_transactions():
    data = tx_model.fetch_all()
    return jsonify(data)

@app.route("/api/upload", methods=["POST"])
def upload_csv():
    file = request.files['file']
    filename = file.filename
    df = pd.read_csv(file)

    total = len(df)
    actual_fraud = df[df["Class"] == 1].shape[0]
    # Ensure 'Hour' column exists for model compatibility
    df["Hour"] = (df["Time"] // 3600) % 24
    # Dự đoán fraud từ toàn bộ dữ liệu
    X = df.drop(columns=["Class"]) if "Class" in df.columns else df
    y_pred = model.predict(X)
    predicted_fraud = int(np.sum(y_pred))

    # Nếu model hỗ trợ predict_proba thì tính risk_score
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(X)[:, 1]
        df["risk_score"] = proba

    fraud_percent = round((actual_fraud / total) * 100, 2)
    total_amount = round(df["Amount"].sum(), 2)

    # Only store upload stats (no individual transactions)
    tx_model.insert_upload_stats(
        file_name=filename,
        total_transactions=total,
        actual_fraud=actual_fraud,
        predicted_fraud=predicted_fraud,
        fraud_percentage=fraud_percent,
        total_amount=total_amount
    )

    # Sample preview
    sample = df.head(10).copy()
    # Ensure Hour column is consistent for sample, and use only model features for prediction
    sample["Hour"] = (sample["Time"] // 3600) % 24
    sample["pred"] = model.predict(sample[model.feature_names_in_])
    sample["risk"] = sample["pred"].apply(lambda x: "High" if x == 1 else "Low")
    transactions = sample[["Time", "Amount", "risk"]].rename(columns={"Time": "time", "Amount": "amount"}).to_dict(orient="records")

    return jsonify({
        "file_name": filename,
        "total_transactions": total,
        "actual_fraud": actual_fraud,
        "predicted_fraud": predicted_fraud,
        "fraud_percentage": fraud_percent,
        "total_amount": total_amount,
        "transactions": transactions  # frontend preview only
    })


if __name__ == "__main__":
    app.run(debug=True)
