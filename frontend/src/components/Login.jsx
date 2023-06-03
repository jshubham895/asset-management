import { useNavigate } from "react-router-dom";
import authManager from "../manager/authManager";
import SignInSignUpForm from "./signInSignUpForm";
import { useEffect } from "react";

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
      .catch((err) => console.log("Error", err));
  };
  return (
    <div>
      Login
      <SignInSignUpForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
