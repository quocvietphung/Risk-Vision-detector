import { Box, Typography, Link } from "@mui/material";

function Footer() {
  const styles = {
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "#ddd",
    marginTop: 64,
    paddingTop: 16,
    paddingBottom: 16,
    textAlign: "center"
  };

  return (
    <Box
      component="footer"
      style={styles}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 - Fraud Detector App &nbsp;|&nbsp;
        <Link href="#" underline="hover">GitHub</Link> &nbsp;|&nbsp;
        <Link href="#" underline="hover">Contact</Link> &nbsp;|&nbsp;
        <Link href="#" underline="hover">Docs</Link>
      </Typography>
    </Box>
  );
}

export default Footer;
