import {
  useState
} from "react";

import supabase
from "./supabase";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  // Sign Up
  const signUp = async () => {

    const { error } =
      await supabase.auth.signUp({

        email,
        password
      });

    if (error) {

      alert(error.message);

    } else {

      alert(
        "Signup successful"
      );
    }
  };

  // Login
  const login = async () => {

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password
      });

    if (error) {

      alert(error.message);

    } else {

      alert(
        "Login successful"
      );
    }
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">

      <h1 className="text-3xl font-bold">

        Login

      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border p-2 rounded w-72"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="border p-2 rounded w-72"
      />

      <div className="flex gap-4">

        <button
          onClick={signUp}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >

          Sign Up

        </button>

        <button
          onClick={login}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >

          Login

        </button>

      </div>

    </div>
  );
}

export default Login;