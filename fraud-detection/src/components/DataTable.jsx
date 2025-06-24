function DataTable() {
  const styles = {
    table: {
      width: "90%",
      margin: "30px auto",
      borderCollapse: "collapse"
    },
    thtd: {
      border: "1px solid #ddd",
      padding: "8px"
    },
    header: {
      backgroundColor: "#f2f2f2"
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
        <tr>
          <td style={styles.thtd}>123456</td>
          <td style={styles.thtd}>€120.50</td>
          <td style={styles.thtd}>Low</td>
        </tr>
        <tr>
          <td style={styles.thtd}>123457</td>
          <td style={styles.thtd}>€980.00</td>
          <td style={styles.thtd}>High</td>
        </tr>
      </tbody>
    </table>
  )
}

export default DataTable
