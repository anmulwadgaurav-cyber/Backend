import React, { useState } from "react";
import "../styles/login.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your Email"
            type="email"
          />
          <FormGroup
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your Password"
            type="password"
          />

          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="redirect" to="/register">
            Register now
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
