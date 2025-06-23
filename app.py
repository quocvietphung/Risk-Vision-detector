from flask import Flask, send_from_directory
import os

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


if __name__ == "__main__":
    app.run(debug=True)
