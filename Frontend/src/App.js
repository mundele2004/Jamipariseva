import logo from './logo.svg'
import './App.css'
import Navbar from './components/navbar/page'
import Dashboard from './components/dashboard/page'
import { Routes, Route, Navigate } from 'react-router-dom'
import Khatian_search from './components/khatian-search/page'
import Payment from './components/payment/page'
import Login from './components/login/page'
import AvailableServices from './components/services/page'
import {Toaster} from "react-hot-toast"
import ApplicationStatus from './components/application-status/page'
import DownloadCertificate from './components/download/page'
function App() {
  return (
    <>
      <Toaster></Toaster>
      <div className="">
        <Routes>
          {/* Completely independent standalone route */}
          <Route path="/login" element={<Login />} />

          {/* Layout routes that require the Navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard/services" replace />} />        
                  
                  <Route path="/dashboard" element={<Dashboard />}>          
                    <Route index element={<h3>Welcome to your Dashboard! Select an option.</h3>} />      
                    <Route path="khatian-search" element={<Khatian_search />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="services" element={<AvailableServices />} />
                    <Route path="applications" element={<ApplicationStatus />} />
                    <Route path="download" element={<DownloadCertificate />} />
                  </Route>
                </Routes>
              </>
            }
            />
        </Routes>
      </div>
    </>
  );
}

export default App