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
    <Container maxWidth="lg" sx={{ py: 6, backgroundColor: "#f5f7fa", borderRadius: 3 }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 3, backgroundColor: "#ffffff" }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#1a237e" }}>
                📁 Upload Your Credit Card CSV File
              </Typography>
              <Stack spacing={2}>
                <Input
                  type="file"
                  inputProps={{ accept: ".csv" }}
                  id="csvFileInput"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <Alert severity="info" sx={{ fontSize: "16px" }}>
                    📄 <strong>{selectedFile.name}</strong> selected for analysis.
                  </Alert>
                )}
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedFile || loading}
                    onClick={handleAnalyze}
                    sx={{ textTransform: "none", fontSize: "16px", px: 3 }}
                  >
                    {loading ? "Analyzing..." : "🔍 Analyze"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={!selectedFile}
                    onClick={handleRemove}
                    sx={{ textTransform: "none", fontSize: "16px", px: 3 }}
                  >
                    ❌ Remove
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {stats && (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 3, backgroundColor: "#ffffff" }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#2e7d32" }}>
                  📊 Analysis Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
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
            <Card variant="outlined" sx={{ p: 3, backgroundColor: "#ffffff" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1a237e" }}>
                  📋 Transaction Preview (Top 10)
                </Typography>
                <Divider sx={{ my: 2 }} />
                <TableContainer component={Paper} sx={{ maxHeight: 500, overflowX: "auto" }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#1a237e" }}>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>No.</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Time</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Amount (€)</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Risk</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((tx, i) => (
                        <TableRow key={`${i}-${tx.time}`}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{Number(tx.time)}</TableCell>
                          <TableCell>{`€${Number(tx.amount || 0).toFixed(2)}`}</TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              color: tx.risk === "High" ? "#d32f2f" : "#388e3c"
                            }}
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