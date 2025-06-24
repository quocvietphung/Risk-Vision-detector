import { useState } from "react";
import { uploadCSV } from "../services/api";

function Dashboard() {
  const styles = {
    panel: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      margin: "30px auto",
      maxWidth: "600px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px"
    },
    item: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#333"
    },
    box: {
      border: "2px dashed #6c757d",
      backgroundColor: "#fdfdfd",
      padding: "30px",
      borderRadius: "12px",
      textAlign: "center",
      width: "100%",
      maxWidth: "600px",
      margin: "30px auto",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      fontSize: "18px",
      fontWeight: "500"
    },
    input: {
      marginTop: "20px",
      fontSize: "16px"
    },
    inputBox: {
      margin: "30px auto",
      maxWidth: "600px",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    },
    label: {
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "10px"
    },
    predictInput: {
      width: "95%",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px"
    },
    button: {
      marginTop: "20px",
      padding: "12px 24px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.2s ease-in-out"
    },
    resultBox: {
      margin: "30px auto",
      padding: "24px",
      maxWidth: "600px",
      backgroundColor: "#e6ffed",
      border: "1px solid #b7eb8f",
      borderRadius: "10px",
      color: "#237804",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "500",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    },
    table: {
      width: "90%",
      margin: "30px auto",
      borderCollapse: "collapse",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    thtd: {
      border: "1px solid #ddd",
      padding: "12px 16px",
      textAlign: "center",
      fontSize: "14px"
    },
    header: {
      backgroundColor: "#2c5364",
      color: "#ffffff",
      fontWeight: "bold"
    },
    row: {
      backgroundColor: "#ffffff",
      transition: "background-color 0.2s ease-in-out"
    },
    rowHover: {
      backgroundColor: "#f1f1f1"
    }
  };

  const [stats, setStats] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await uploadCSV(file);
      console.log("📦 Upload response:", data);
      if (data && data.total_transactions) {
        setStats(data);
      } else {
        console.warn("❗ Dữ liệu trả về không hợp lệ:", data);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <>
      <div style={styles.box}>
        <div>📁 <strong>Upload your CSV file for fraud detection</strong></div>
        <input type="file" accept=".csv" style={styles.input} onChange={handleFileUpload} />
        {stats && (
          <div style={styles.panel}>
            <div style={styles.item}>📊 Total Transactions: {stats.total_transactions}</div>
            <div style={styles.item}>❗ Fraudulent Transactions: {stats.fraud_count}</div>
            <div style={styles.item}>📈 Fraud Rate: {stats.fraud_percentage}%</div>
            <div style={styles.item}>💰 Total Amount: €{stats.total_amount.toLocaleString()}</div>
          </div>
        )}
      </div>

      <div style={styles.inputBox}>
        <div style={styles.label}>🔍 Enter 30 features (comma separated):</div>
        <input type="text" style={styles.predictInput} placeholder="0.1, 0.3, 1.2, ..." />
        <br />
        <button
          style={styles.button}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#218838"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#28a745"}
        >
          Predict Fraud
        </button>
      </div>

      <div style={styles.resultBox}>
        ✅ <strong>Prediction Result:</strong> This transaction is <strong>NOT Fraudulent</strong><br />
        🔎 <strong>Risk Score:</strong> 0.03
      </div>

      <table style={styles.table}>
        <thead style={styles.header}>
          <tr>
            <th style={styles.thtd}>Time</th>
            <th style={styles.thtd}>Amount</th>
            <th style={styles.thtd}>Risk</th>
          </tr>
        </thead>
        <tbody>
          {[{
            time: "123456",
            amount: "€120.50",
            risk: "Low"
          }, {
            time: "123457",
            amount: "€980.00",
            risk: "High"
          }].map((tx, index) => (
            <tr
              key={index}
              style={styles.row}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.rowHover.backgroundColor}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = styles.row.backgroundColor}
            >
              <td style={styles.thtd}>{tx.time}</td>
              <td style={styles.thtd}>{tx.amount}</td>
              <td style={styles.thtd}>{tx.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Dashboard;
