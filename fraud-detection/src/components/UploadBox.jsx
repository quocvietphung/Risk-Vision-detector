function UploadBox() {
  const styles = {
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
    }
  }

  return (
    <div style={styles.box}>
      <div>📁 <strong>Upload your CSV file for fraud detection</strong></div>
      <input type="file" accept=".csv" style={styles.input} />
    </div>
  )
}

export default UploadBox
