function ResultBox() {
  const styles = {
    box: {
      margin: "20px auto",
      padding: "20px",
      maxWidth: "500px",
      backgroundColor: "#d4edda",
      border: "1px solid #c3e6cb",
      borderRadius: "5px",
      color: "#155724"
    }
  }

  return (
    <div style={styles.box}>
      ✅ Result: This transaction is NOT Fraudulent (Risk Score: 0.03)
    </div>
  )
}

export default ResultBox
