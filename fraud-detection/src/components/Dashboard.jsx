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
  Alert
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
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                📁 Upload CSV File
              </Typography>
              <Input
                type="file"
                inputProps={{ accept: ".csv" }}
                id="csvFileInput"
                onChange={handleFileChange}
                sx={{ mt: 2 }}
              />
              {selectedFile && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  📄 Selected File: <strong>{selectedFile.name}</strong>
                </Alert>
              )}
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
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
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {stats && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📊 Analysis Result
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>📄 File Name: {stats.file_name}</Typography>
                <Typography>📊 Total Transactions: {stats.total_transactions}</Typography>
                <Typography>❗ Actual Fraudulent Transactions: {stats.actual_fraud}</Typography>
                <Typography>🤖 Predicted as Fraud by Model: {stats.predicted_fraud}</Typography>
                <Typography>📈 Fraud Rate: {stats.fraud_percentage}%</Typography>
                <Typography>💰 Total Amount: €{stats.total_amount.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {transactions.length > 0 && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📋 Transaction Preview
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={transactions.map((tx, i) => ({ id: i, ...tx }))}
                    columns={[
                      { field: "time", headerName: "Time", flex: 1 },
                      {
                        field: "amount",
                        headerName: "Amount (€)",
                        flex: 1,
                        type: "number",
                        valueFormatter: (params) =>
                          `€${Number(params.value).toFixed(2)}`
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
                    sx={{
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#2c5364",
                        color: "#fff",
                        fontWeight: "bold"
                      },
                      "& .risk-high": {
                        color: "#d32f2f"
                      },
                      "& .risk-low": {
                        color: "#388e3c"
                      }
                    }}
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
