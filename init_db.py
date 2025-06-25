import sqlite3
import os

DB_PATH = "db/fraud.db"

class DatabaseInitializer:
    def __init__(self, db_path=DB_PATH):
        self.db_path = db_path

    def create_db_and_table(self):
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Drop old uploads table
        cursor.execute("DROP TABLE IF EXISTS uploads;")

        # Create uploads table only
        cursor.execute("""
            CREATE TABLE uploads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                file_name TEXT,
                total_transactions INTEGER,
                actual_fraud INTEGER,
                predicted_fraud INTEGER,
                fraud_percentage REAL,
                total_amount REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)

        conn.commit()
        conn.close()
        print(f"✅ Database created at {self.db_path}")

if __name__ == "__main__":
    db_init = DatabaseInitializer()
    db_init.create_db_and_table()