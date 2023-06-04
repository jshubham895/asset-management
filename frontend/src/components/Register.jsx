import { useNavigate } from "react-router-dom";
import userManager from "../manager/userManager.js";
import SignInSignUpForm from "./signInSignUpForm.jsx";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = { token: localStorage.getItem("token") };
    if (auth.token) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = (values) => {
    const formBody = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    userManager
      .createUser(formBody)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <div>
      Register
      <SignInSignUpForm handleSubmit={handleSubmit} isRegistration />
    </div>
  );
};

export default Register;
