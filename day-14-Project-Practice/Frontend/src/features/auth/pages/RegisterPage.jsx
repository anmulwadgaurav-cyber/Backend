import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  //Two way binding
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function submithHandler(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <main className="h-screen w-screen text-slate-200 bg-zinc-950 font-[mainFont] flex justify-center items-center">
      <div className=" bg-zinc-900 p-4 w-md rounded-md flex flex-col gap-4">
        <div className="flex flex-col gap-2 my-4 text-center">
          <h1 className="text-3xl font-medium">Create an account</h1>
          <p className="text-[1rem] text-slate-400">
            Create your account and get started.
          </p>
        </div>
        <form onSubmit={submithHandler} className="flex flex-col gap-4">
          <input
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            className="p-4 text-[1rem] bg-zinc-800 outline-none w-full rounded-md border border-transparent hover:border-purple-700 focus:border-purple-700 transition-all ease duration-200"
            placeholder="Set username"
          />
          <input
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            type="text"
            name="username"
            className="p-4 text-[1rem] bg-zinc-800 outline-none w-full rounded-md border border-transparent hover:border-purple-700 focus:border-purple-700 transition-all ease duration-200"
            placeholder="Enter email"
          />
          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="p-4 text-[1rem] bg-zinc-800 outline-none w-full rounded-md border border-transparent hover:border-purple-700 focus:border-purple-700 transition-all ease duration-200"
            placeholder="Set password"
          />
          <button className="p-4 text-[1rem] bg-purple-700 cursor-pointer outline-none w-full rounded-md hover:bg-purple-800 transition-all ease duration-200">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-purple-500">
              Login.
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
