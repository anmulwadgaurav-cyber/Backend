import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/userAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  async function submitHandler(e) {
    e.preventDefault(); //prevents from loading website

    handleRegister(username, email, password).then((res) => {
      navigate("/");
      console.log(res);
    });
  }

  return (
    <main>
      <div className="form-container">
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Set username"
          />
          <input
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter email"
          />
          <input
            value={password}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button>Register</button>

          <p>
            Already have an account?{" "}
            <Link className="toggleAuthForm" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
