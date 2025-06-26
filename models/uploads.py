import sqlite3

DB_PATH = "db/fraud.db"

class Upload:
    def __init__(self, db_path=DB_PATH):
        """
        Initialisiert eine neue Instanz der Klasse Upload und stellt sicher, dass die benötigte Tabelle existiert.
        """
        self.db_path = db_path
        self._ensure_tables()

    def _ensure_tables(self):
        """
        Erstellt die Tabelle 'uploads' in der SQLite-Datenbank, falls sie noch nicht existiert.
        """
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
        """
        Fügt einen neuen Eintrag mit Analyse-Metadaten in die Tabelle 'uploads' ein.

        Parameter:
            file_name (str): Name der hochgeladenen CSV-Datei.
            total_transactions (int): Gesamtanzahl der Transaktionen.
            actual_fraud (int): Tatsächliche Anzahl der Betrugsfälle.
            predicted_fraud (int): Vom Modell vorhergesagte Anzahl der Betrugsfälle.
            fraud_percentage (float): Prozentsatz der Betrugsfälle.
            total_amount (float): Gesamtsumme aller Transaktionen.
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO uploads (file_name, total_transactions, actual_fraud, predicted_fraud, fraud_percentage, total_amount)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (file_name, total_transactions, actual_fraud, predicted_fraud, fraud_percentage, total_amount))
        conn.commit()
        conn.close()