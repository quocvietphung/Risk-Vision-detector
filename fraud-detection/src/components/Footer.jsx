import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #ddd",
        mt: 8,
        py: 2,
        textAlign: "center"
      }}
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
