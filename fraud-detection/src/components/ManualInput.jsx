function ManualInput() {
  const styles = {
    container: {
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
    input: {
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
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.label}>🔍 Enter 30 features (comma separated):</div>
      <input type="text" style={styles.input} placeholder="0.1, 0.3, 1.2, ..." />
      <br />
      <button
        style={styles.button}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "#218838"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "#28a745"}
      >
        Predict Fraud
      </button>
    </div>
  )
}

export default ManualInput
