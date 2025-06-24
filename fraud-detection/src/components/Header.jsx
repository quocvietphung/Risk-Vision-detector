function Header() {
  const styles = {
    header: {
      background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      color: "#ffffff",
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    },
    logo: {
      fontSize: "28px",
      fontWeight: "bold",
      letterSpacing: "1px"
    },
    nav: {
      display: "flex",
      gap: "30px"
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "500",
      transition: "color 0.2s ease-in-out"
    }
  }

  return (
    <header style={styles.header}>
      <div style={styles.logo}>🔐 Fraud Detector</div>
      <nav style={styles.nav}>
        <a href="#" style={styles.link}>Dashboard</a>
        {/*<a href="#" style={styles.link}>Predict</a>*/}
        {/*<a href="#" style={styles.link}>History</a>*/}
        {/*<a href="#" style={styles.link}>About</a>*/}
      </nav>
    </header>
  )
}

export default Header
