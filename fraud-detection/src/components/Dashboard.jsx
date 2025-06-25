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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                📁 Step 1: Upload CSV File
              </Typography>
              <Stack spacing={2}>
                <Input
                  type="file"
                  inputProps={{ accept: ".csv" }}
                  id="csvFileInput"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <Alert severity="info">
                    📄 Selected File: <strong>{selectedFile.name}</strong>
                  </Alert>
                )}
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedFile || loading}
                    onClick={handleAnalyze}
                  >
                    {loading ? "Analyzing..." : "🔍 Analyze"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={!selectedFile}
                    onClick={handleRemove}
                  >
                    ❌ Remove File
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {stats && (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  📊 Step 2: Analysis Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1}>
                  <Typography>📄 File Name: {stats.file_name}</Typography>
                  <Typography>📊 Total Transactions: {stats.total_transactions}</Typography>
                  <Typography>❗ Actual Fraudulent Transactions: {stats.actual_fraud}</Typography>
                  <Typography>🤖 Predicted as Fraud by Model: {stats.predicted_fraud}</Typography>
                  <Typography>📈 Fraud Rate: {stats.fraud_percentage}%</Typography>
                  <Typography>💰 Total Amount: €{stats.total_amount.toLocaleString()}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}

        {transactions.length > 0 && (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#2c3e50" }}
                >
                  📋 Step 3: Transaction Preview
                </Typography>
                <Divider sx={{ my: 2 }} />
                <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#2c5364" }}>
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