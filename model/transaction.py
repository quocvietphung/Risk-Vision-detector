import sqlite3
from datetime import datetime

DB_PATH = "db/fraud.db"

class Transaction:
    def __init__(self, db_path=DB_PATH):
        self.db_path = db_path
        self._ensure_tables()

    def _ensure_tables(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        # Create transactions table if not exists
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                time TEXT,
                amount REAL,
                risk REAL,
                is_fraud INTEGER,
                predicted_score REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
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

    def insert(self, time, amount, risk, is_fraud, predicted_score):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO transactions (time, amount, risk, is_fraud, predicted_score)
            VALUES (?, ?, ?, ?, ?)
        """, (time, amount, risk, is_fraud, predicted_score))
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

    def fetch_all(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM transactions ORDER BY created_at DESC")
        rows = cursor.fetchall()
        conn.close()
        return rows