import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

function Header() {
  const styles = {
    appBar: {
      background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      boxShadow: 3,
    },
    toolbar: {
      justifyContent: "space-between",
      px: 4,
    },
    title: {
      fontWeight: "bold",
      letterSpacing: 1,
    },
    navBox: {
      display: "flex",
      gap: 4,
    },
    navLink: {
      color: "#fff",
      fontWeight: 500,
      fontSize: "16px",
      "&:hover": {
        color: "#90caf9",
      },
    },
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h6" component="div" sx={styles.title}>
          🔐 Fraud Detector
        </Typography>
        <Box sx={styles.navBox}>
          <Link href="#" underline="none" sx={styles.navLink}>
            Dashboard
          </Link>
          {/* <Link href="#" underline="none" sx={styles.navLink}>Predict</Link>
          <Link href="#" underline="none" sx={styles.navLink}>History</Link>
          <Link href="#" underline="none" sx={styles.navLink}>About</Link> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header
