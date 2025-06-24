function ManualInput() {
  const styles = {
    container: {
      margin: "20px auto",
      maxWidth: "500px",
      textAlign: "center"
    },
    input: {
      width: "90%",
      padding: "10px",
      marginTop: "10px"
    },
    button: {
      marginTop: "10px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px"
    }
  }

  return (
    <div style={styles.container}>
      <div>🔍 Enter 30 features (comma separated):</div>
      <input type="text" style={styles.input} placeholder="0.1, 0.3, 1.2, ..." />
      <br />
      <button style={styles.button}>Predict Fraud</button>
    </div>
  )
}

export default ManualInput
