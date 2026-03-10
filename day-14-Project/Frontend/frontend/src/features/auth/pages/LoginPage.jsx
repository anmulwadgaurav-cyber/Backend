import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/userAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate()

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }

  function submitHandler(e) {
    e.preventDefault();

    handleLogin(username, password).then((res) => {
      navigate("/")
      console.log(res);
    });
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
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
          <button>Login</button>
          <p>
            Dont have an account?{" "}
            <Link className="toggleAuthForm" to="/register">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
