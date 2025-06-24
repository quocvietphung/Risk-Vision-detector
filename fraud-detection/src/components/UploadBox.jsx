function UploadBox() {
  const styles = {
    box: {
      border: "2px dashed #ccc",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      width: "100%",
      maxWidth: "500px",
      margin: "20px auto",
    },
    input: {
      marginTop: "10px"
    }
  }

  return (
    <div style={styles.box}>
      <div>📂 Upload your CSV file</div>
      <input type="file" accept=".csv" style={styles.input} />
    </div>
  )
}

export default UploadBox
