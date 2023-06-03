import { Navigate } from "react-router-dom";

const Home = () => {
  const auth = { token: localStorage.getItem("token") };

  return auth.token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default Home;
