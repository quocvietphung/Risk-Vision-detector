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
    borderRadius: 24
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
              <Typography variant="h4" style={styles.title}>
                📁 Upload Your Credit Card CSV File
              </Typography>
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  component="label"
                  style={styles.button}
                >
                  📁 Choose CSV File
                  <input
                    type="file"
                    hidden
                    accept=".csv"
                    id="csvFileInput"
                    onChange={handleFileChange}
                  />
                </Button>
                {selectedFile && (
                  <Alert severity="info" style={styles.alert}>
                    📄 <strong>{selectedFile.name}</strong> selected for analysis.
                  </Alert>
                )}
                <Stack direction="row" spacing={2}>
                  {!stats && (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!selectedFile || loading}
                      onClick={handleAnalyze}
                      style={styles.button}
                    >
                      {loading ? "Analyzing..." : "🔍 Analyze"}
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={!selectedFile}
                    onClick={handleRemove}
                    style={styles.button}
                  >
                    🔄 Reset
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {stats && (
          <Grid item xs={12}>
            <Card variant="outlined" style={styles.card}>
              <CardContent>
                <Typography variant="h5" style={styles.summaryTitle}>
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
                <Typography variant="h5" gutterBottom style={styles.title}>
                  📋 Transaction Preview (Top 10)
                </Typography>
                <Divider style={{ marginTop: 16, marginBottom: 16 }} />
                <TableContainer component={Paper} style={{ maxHeight: 500, overflowX: "auto" }}>
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
                            {tx.risk}
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