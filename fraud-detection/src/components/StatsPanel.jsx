function StatsPanel() {
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
