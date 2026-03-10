import React, { useState } from "react";
import "../styles/register.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister({ username, email, password });
    navigate("/");
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter Username"
            type="text"
          />
          <FormGroup
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Email"
            type="email"
          />
          <FormGroup
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
            type="password"
          />
          <button className="button" type="submit">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link className="redirect" to="/login">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
