import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from "./components/Dashboard.jsx";
import {Box} from "@mui/material";

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Dashboard />
      </Box>
      <Footer />
    </Box>
  );
}

export default App
