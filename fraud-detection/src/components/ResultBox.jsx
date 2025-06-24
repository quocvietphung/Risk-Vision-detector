function ResultBox() {
  const styles = {
    box: {
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
    }
  }

  return (
    <div style={styles.box}>
      ✅ <strong>Prediction Result:</strong> This transaction is <strong>NOT Fraudulent</strong><br />
      🔎 <strong>Risk Score:</strong> 0.03
    </div>
  )
}

export default ResultBox
