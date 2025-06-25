import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Input,
  Divider,
  Alert,
  Stack
} from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from "@mui/material";
import { uploadCSV } from "../services/api";

const styles = {
  container: {
    marginTop: 20,
    paddingTop: 48,
    paddingBottom: 48,
    backgroundColor: "#f5f7fa",
    borderRadius: 24,
    boxShadow: "0 0 40px rgba(0,0,0,0.04)"
  },
  card: {
    padding: 24,
    backgroundColor: "#ffffff"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1a237e"
  },
  button: {
    textTransform: "none",
    fontSize: 16,
    paddingLeft: 24,
    paddingRight: 24
  },
  alert: {
    fontSize: 16
  },
  summaryTitle: {
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2e7d32"
  },
  divider: {
    marginBottom: 16
  },
  tableHeader: {
    backgroundColor: "#1a237e"
  },
  tableCellHead: {
    color: "#fff",
    fontWeight: "bold"
  },
  riskLow: {
    fontWeight: "bold",
    color: "#388e3c"
  },
  riskHigh: {
    fontWeight: "bold",
    color: "#d32f2f"
  }
};

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setStats(null);
    setTransactions([]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const data = await uploadCSV(selectedFile);
      setStats(data);
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setStats(null);
    setTransactions([]);
    document.getElementById("csvFileInput").value = "";
  };

  return (
    <Container maxWidth="lg" style={styles.container}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card variant="outlined" style={styles.card}>
            <CardContent>
              <Typography variant="h3" style={{ fontWeight: 700, marginBottom: 16, color: "#0d47a1" }}>
                💳 Credit Card Fraud Detector
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: 24, color: "#546e7a" }}>
                Upload your dataset and discover fraudulent patterns instantly.
              </Typography>
              <Stack spacing={2}>
                {!selectedFile && (
                  <Box
                    sx={{
                      border: "2px dashed #90caf9",
                      padding: "36px",
                      borderRadius: "16px",
                      textAlign: "center",
                      backgroundColor: "#e3f2fd",
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#bbdefb",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                      }
                    }}
                    onClick={() => document.getElementById("csvFileInput").click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file && file.name.endsWith(".csv")) {
                        setSelectedFile(file);
                        setStats(null);
                        setTransactions([]);
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src="https://img.icons8.com/ios-filled/100/000000/upload-to-cloud.png"
                        alt="Upload"
                        width={64}
                        height={64}
                        style={{ marginBottom: 16, opacity: 0.8 }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#0d47a1" }}>
                        Drag & Drop your CSV file here
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#546e7a", mt: 1 }}>
                        or click to browse
                      </Typography>
                      <input
                        type="file"
                        accept=".csv"
                        hidden
                        id="csvFileInput"
                        onChange={handleFileChange}
                      />
                    </Box>
                  </Box>
                )}
                {selectedFile && (
                  <Alert severity="info" style={styles.alert}>
                    📄 <strong>{selectedFile.name}</strong> selected for analysis.
                  </Alert>
                )}
                <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
                  {!stats && (
                    <Button
                      variant="contained"
                      color="success"
                      disabled={!selectedFile || loading}
                      onClick={handleAnalyze}
                      style={{ fontWeight: 600, padding: "12px 24px" }}
                    >
                      {loading ? "🔎 Analyzing..." : "🔎 Start Analysis"}
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={!selectedFile}
                    onClick={handleRemove}
                    style={{ fontWeight: 600, padding: "12px 24px" }}
                  >
                    ♻️ Reset Upload
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {stats && (
          <Grid item xs={12}>
            <Card variant="outlined" style={styles.card}>
              <CardContent>
                <Typography variant="h4" style={{ fontWeight: 700, marginBottom: 16, color: "#2e7d32" }}>
                  📊 Analysis Summary
                </Typography>
                <Divider style={styles.divider} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">📄 File Name: <strong>{stats.file_name}</strong></Typography>
                    <Typography variant="body1">📊 Total Transactions: {stats.total_transactions}</Typography>
                    <Typography variant="body1">💰 Total Amount: €{stats.total_amount.toLocaleString()}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">❗ Actual Fraudulent: {stats.actual_fraud}</Typography>
                    <Typography variant="body1">🤖 Predicted Fraud: {stats.predicted_fraud}</Typography>
                    <Typography variant="body1">📈 Fraud Rate: {stats.fraud_percentage}%</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {transactions.length > 0 && (
          <Grid item xs={12}>
            <Card variant="outlined" style={styles.card}>
              <CardContent>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 700, color: "#1565c0" }}>
                  📋 Transaction Preview
                </Typography>
                <Divider style={{ marginTop: 16, marginBottom: 16 }} />
                <TableContainer component={Paper} style={{ maxHeight: 500, borderRadius: 12, overflowX: "auto", border: "1px solid #e0e0e0" }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow style={styles.tableHeader}>
                        <TableCell style={styles.tableCellHead}>No.</TableCell>
                        <TableCell style={styles.tableCellHead}>Time</TableCell>
                        <TableCell style={styles.tableCellHead}>Amount (€)</TableCell>
                        <TableCell style={styles.tableCellHead}>Risk</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((tx, i) => (
                        <TableRow key={`${i}-${tx.time}`}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{Number(tx.time)}</TableCell>
                          <TableCell>{`€${Number(tx.amount || 0).toFixed(2)}`}</TableCell>
                          <TableCell
                            style={
                              tx.risk === "High" ? styles.riskHigh : styles.riskLow
                            }
                          >
                            {tx.risk === "High" ? "⚠️ High" : "✅ Low"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Dashboard;