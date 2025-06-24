from flask import Flask, send_from_directory
from flask import request, jsonify
from model.transaction import Transaction
tx_model = Transaction()

app = Flask(__name__, static_folder="fraud-detection/dist", static_url_path="/")

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

@app.route("/api/transactions", methods=["POST"])
def add_transaction():
    req = request.json
    tx_model.insert(
        time=req["time"],
        amount=req["amount"],
        risk=req["risk"],
        is_fraud=req["is_fraud"],
        predicted_score=req["predicted_score"]
    )
    return jsonify({"message": "Inserted successfully"}), 201


if __name__ == "__main__":
    app.run(debug=True)
