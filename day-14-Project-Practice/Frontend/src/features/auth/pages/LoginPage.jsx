import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/userAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  //Two way binding
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  function submithHandler(e) {
    e.preventDefault();

    handleLogin(username, password).then((res) => {
      navigate("/");
      console.log(res);
    });

    if(loading){
      return(
        <h1>Loading</h1>
      )
    }
  }

  return (
    <main className="h-screen w-screen text-slate-200 bg-zinc-950 font-[mainFont] flex justify-center items-center">
      <div className=" bg-zinc-900 p-4 w-md rounded-md flex flex-col gap-4">
        <div className="flex flex-col gap-2 my-4 text-center">
          <h1 className="text-3xl font-medium">Welcome Back!</h1>
          <p className="text-[1rem] text-slate-400">
            Let’s pick up where you left off.
          </p>
        </div>
        <form onSubmit={submithHandler} className="flex flex-col gap-4">
          <input
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            className="p-4 text-[1rem] bg-zinc-800 outline-none w-full rounded-md border border-transparent hover:border-purple-700 focus:border-purple-700 transition-all ease duration-200"
            placeholder="Username"
          />
          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="p-4 text-[1rem] bg-zinc-800 outline-none w-full rounded-md border border-transparent hover:border-purple-700 focus:border-purple-700 transition-all ease duration-200"
            placeholder="Password"
          />
          <button className="p-4 text-[1rem] bg-purple-700 cursor-pointer outline-none w-full rounded-md hover:bg-purple-800 transition-all ease duration-200">
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-500">
              Register.
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
