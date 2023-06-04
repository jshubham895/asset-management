import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateAsset from "./components/CreateAsset";
import UpdateAsset from "./components/UpdateAsset";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-asset" element={<CreateAsset />} />
          <Route path="/update-asset/:assetId" element={<UpdateAsset />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<h2>404 page</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
