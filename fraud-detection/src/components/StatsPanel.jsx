function StatsPanel() {
  const styles = {
    panel: {
      backgroundColor: "#e9ecef",
      padding: "20px",
      borderRadius: "8px",
      margin: "20px auto",
      maxWidth: "500px"
    },
    item: {
      margin: "10px 0"
    }
  }

  return (
    <div style={styles.panel}>
      <div style={styles.item}>📊 Total Transactions: 284,807</div>
      <div style={styles.item}>❗ Fraudulent: 492 (0.17%)</div>
      <div style={styles.item}>💰 Total Amount: €2,345,678</div>
    </div>
  )
}

export default StatsPanel
