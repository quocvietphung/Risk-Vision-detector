function DataTable() {
  const styles = {
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
  }

  return (
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
  )
}

export default DataTable
