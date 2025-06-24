import Header from './components/Header'
import UploadBox from './components/UploadBox'
import StatsPanel from './components/StatsPanel'
import ManualInput from './components/ManualInput'
import ResultBox from './components/ResultBox'
import DataTable from './components/DataTable'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", padding: 20 }}>
      <Header />
      <UploadBox />
      <StatsPanel />
      <ManualInput />
      <ResultBox />
      <DataTable />
      <Footer />
    </div>
  )
}

export default App
