import sqlite3
from datetime import datetime

DB_PATH = "db/fraud.db"

class Upload:
    def __init__(self, db_path=DB_PATH):
        self.db_path = db_path
        self._ensure_tables()

    def _ensure_tables(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        # Create uploads table if not exists
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS uploads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                file_name TEXT,
                total_transactions INTEGER,
                actual_fraud INTEGER,
                predicted_fraud INTEGER,
                fraud_percentage REAL,
                total_amount REAL,
                uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        conn.close()

    def insert_upload_stats(self, file_name, total_transactions, actual_fraud, predicted_fraud, fraud_percentage, total_amount):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO uploads (file_name, total_transactions, actual_fraud, predicted_fraud, fraud_percentage, total_amount)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (file_name, total_transactions, actual_fraud, predicted_fraud, fraud_percentage, total_amount))
        conn.commit()
        conn.close()