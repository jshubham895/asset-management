import { useNavigate } from "react-router-dom";
import authManager from "../manager/authManager";
import SignInSignUpForm from "./SignInSignUpForm";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = { token: localStorage.getItem("token") };
    if (auth.token) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = (values) => {
    const formBody = {
      email: values.email,
      password: values.password,
    };
    authManager
      .login(formBody)
      .then((res) => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: res.token,
            user: res.user,
          })
        );
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err?.response?.data.message || "failed to login");
      });
  };
  return (
    <div>
      Login
      <SignInSignUpForm handleSubmit={handleSubmit} />
      <ToastContainer />
    </div>
  );
};

export default Login;
