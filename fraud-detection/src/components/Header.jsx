import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

function Header() {
  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
          🔐 Fraud Detector
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Link href="#" underline="none" sx={{ color: "#fff", fontWeight: 500, fontSize: "16px", "&:hover": { color: "#90caf9" } }}>
            Dashboard
          </Link>
          {/* <Link href="#" underline="none" sx={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}>Predict</Link>
          <Link href="#" underline="none" sx={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}>History</Link>
          <Link href="#" underline="none" sx={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}>About</Link> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header
