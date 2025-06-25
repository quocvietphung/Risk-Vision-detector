import { Button } from "@mui/material";
import { useState } from "react";
import { uploadCSV } from "../services/api";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Dashboard() {
  const styles = {
    panel: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      margin: "30px auto",
      maxWidth: "600px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px"
    },
    item: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#333"
    },
    box: {
      border: "2px dashed #6c757d",
      backgroundColor: "#fdfdfd",
      padding: "30px",
      borderRadius: "12px",
      textAlign: "center",
      width: "100%",
      maxWidth: "600px",
      margin: "30px auto",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      fontSize: "18px",
      fontWeight: "500"
    },
    input: {
      marginTop: "20px",
      fontSize: "16px"
    },
    inputBox: {
      margin: "30px auto",
      maxWidth: "600px",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    },
    label: {
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "10px"
    },
    predictInput: {
      width: "95%",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px"
    },
    button: {
      marginTop: "20px",
      padding: "12px 24px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.2s ease-in-out"
    },
    resultBox: {
      margin: "30px auto",
      padding: "24px",
      maxWidth: "600px",
      backgroundColor: "#e6ffed",
      border: "1px solid #b7eb8f",
      borderRadius: "10px",
      color: "#237804",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "500",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    },
    table: {
      width: "90%",
      margin: "30px auto",
      borderCollapse: "collapse",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    thtd: {
      border: "1px solid #ddd",
      padding: "12px 16px",
      textAlign: "center",
      fontSize: "14px"
    },
    header: {
      backgroundColor: "#2c5364",
      color: "#ffffff",
      fontWeight: "bold"
    },
    row: {
      backgroundColor: "#ffffff",
      transition: "background-color 0.2s ease-in-out"
    },
    rowHover: {
      backgroundColor: "#f1f1f1"
    }
  };

  const [stats, setStats] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setStats(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const data = await uploadCSV(selectedFile); // API mới đã xử lý prediction
      setStats({
        ...data,
        file_name: selectedFile.name
      });
      setTransactions(data.transactions || []);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setStats(null);
    document.getElementById("csvFileInput").value = "";
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>📁 Step 1: Upload your CSV file</Typography>
        <input
          id="csvFileInput"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="csvFileInput">
          <Button variant="outlined" component="span" sx={{ mt: 1 }}>
            📁 Choose CSV File
          </Button>
        </label>
        {selectedFile && (
          <Box
            mt={2}
            p={2}
            sx={{
              backgroundColor: "#f0f4f8",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              fontSize: "16px",
              fontWeight: 500,
              color: "#333"
            }}
          >
            <span role="img" aria-label="file">📄</span> Selected File: {selectedFile.name}
          </Box>
        )}
        {selectedFile && (
          <Box mt={2} display="flex" gap={2} justifyContent="center">
            <Button
              variant="contained"
              color="success"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "🔍 Step 2: Analyze"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleRemoveFile}
            >
              ❌ Remove File
            </Button>
          </Box>
        )}
        {stats && (
          <Box mt={4} textAlign="center">
            <Typography variant="subtitle1">📄 File Name: {stats.file_name}</Typography>
            <Typography variant="subtitle1">📊 Total Transactions: {stats.total_transactions}</Typography>
            <Typography variant="subtitle1">❗ Actual Fraudulent Transactions: {stats.actual_fraud}</Typography>
            <Typography variant="subtitle1">🤖 Predicted as Fraud by Model: {stats.predicted_fraud}</Typography>
            <Typography variant="subtitle1">📈 Fraud Rate: {stats.fraud_percentage}%</Typography>
            <Typography variant="subtitle1">💰 Total Amount: €{stats.total_amount.toLocaleString()}</Typography>
          </Box>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 4, height: 500 }}>
        <Typography variant="h6" gutterBottom>📊 Transaction Preview</Typography>
        <DataGrid
          rows={transactions.map((tx, i) => ({ id: i, ...tx }))}
          columns={[
            { field: "time", headerName: "Time", flex: 1 },
            { field: "amount", headerName: "Amount (€)", flex: 1, type: "number" },
            { field: "risk", headerName: "Risk", flex: 1 }
          ]}
          pageSize={15}
          rowsPerPageOptions={[15]}
          disableRowSelectionOnClick
          sx={{
            mt: 2,
            backgroundColor: "#fff",
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#2c5364",
              color: "#fff",
              fontWeight: "bold"
            }
          }}
        />
      </Paper>
    </Container>
  );
}

export default Dashboard;
