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
import { DataGrid } from "@mui/x-data-grid";
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
                <Box
                  sx={{
                    height: 440,
                    width: "100%",
                    "& .MuiDataGrid-root": {
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      backgroundColor: "#fefefe"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#2c5364",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "16px"
                    },
                    "& .MuiDataGrid-row": {
                      fontSize: "14px"
                    },
                    "& .risk-high": {
                      color: "#d32f2f",
                      fontWeight: "bold"
                    },
                    "& .risk-low": {
                      color: "#388e3c",
                      fontWeight: "bold"
                    }
                  }}
                >
                  <DataGrid
                    rows={transactions.map((tx, i) => ({
                      id: `${i}-${tx.time}`,
                      no: i + 1,
                      time: Number(tx.time),
                      amount:
                        typeof tx.amount === "number" && !isNaN(tx.amount)
                          ? tx.amount
                          : 0,
                      risk: tx.risk
                    }))}
                    columns={[
                      {
                        field: "no",
                        headerName: "#",
                        flex: 0.3,
                        sortable: false
                      },
                      {
                        field: "time",
                        headerName: "Time",
                        flex: 1,
                        type: "number"
                      },
                      {
                        field: "amount",
                        headerName: "Amount (€)",
                        flex: 1,
                        type: "number",
                        valueFormatter: (params) =>
                          typeof params.value === "number" && !isNaN(params.value)
                            ? `€${params.value.toFixed(2)}`
                            : "€0.00"
                      },
                      {
                        field: "risk",
                        headerName: "Risk",
                        flex: 1,
                        cellClassName: (params) =>
                          params.value === "High" ? "risk-high" : "risk-low"
                      }
                    ]}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    disableRowSelectionOnClick
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Dashboard;
