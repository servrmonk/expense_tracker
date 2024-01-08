import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import Navbar from "./Navbar";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegistrationPageByme() {
  const [isLogin, setIsLogin] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // for navigate
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  console.log("authCtx", authCtx);

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      console.log(
        "Password is ",
        password,
        " and confirm pass",
        confirmPassword
      );
      return;
    }
    console.log("Email", email, " Password:", password);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4n3mxcRsx9p4NlhU9Pawi75LNOUgQkr8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4n3mxcRsx9p4NlhU9Pawi75LNOUgQkr8";
    }

    const register = async () => {
      try {
        const response = await axios.post(url, {
          email: email,
          password: password,
          returnSecureToken: true,
        });
        console.log("response", response);
        if (response.status === 200) {
          const data = response.data;
          // console.log("data.idtoken",data.idToken);
          authCtx.login(data.idToken);
          console.log("authctx.login", authCtx.login);
          console.log("Login succesfully");
          localStorage.setItem("idToken", data.idToken);
          localStorage.setItem("email", data.email);

          navigate("/homepage");
        } else {
          let errorMessage = "Authentication failed!";
          throw new Error(errorMessage);
        }
      } catch (err) {
        alert("error in login page ", err.message);
      }
    };
    register(url);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    console.log("login status now", isLogin);
  };

  return (
    <div className="bg-gradient-to-tl p-32 from-green-400 to-indigo-900 h-1/2 max-w-full ">
      <div className="bg-slate-50 bg-opacity-10 shadow-2xl rounded-3xl  p-7  h-30 m-auto w-[500px]">
        <form onSubmit={submitHandler}>
          {isLogin ? (
            <p className="font-black font-serif text-2xl ">
              Login to your account
            </p>
          ) : (
            <p className="font-black font-serif text-2xl ">
              Create your account
            </p>
          )}
          <label
            htmlFor="email"
            className="mb-2 hover:font-serif hover:text-2xl font-medium"
          >
            Email
          </label>
          <br />
          <input
            className="bg-slate-200 rounded-md    shadow-[inset_-12px_-8px_40px_#46464620] mb-7 w-[85%] h-9"
            type="email"
            id="email"
            required
            ref={emailRef}
          />
          <label
            htmlFor="password"
            className="mb-2 hover:font-serif hover:text-2xl font-medium"
          >
            Password
          </label>
          <br />
          <input
            className="bg-slate-200 rounded-md  mb-7  w-[85%] h-9 mt-1 shadow-[inset_-12px_-8px_40px_#46464620]"
            type="password"
            id="password"
            ref={passwordRef}
          />
          <br />
          <label
            htmlFor="confirmPassword"
            className="mb-2 hover:font-serif hover:text-2xl font-medium "
          >
            Confirm Password
          </label>

          <input
            className="bg-slate-200 rounded-md  mb-7  shadow-[inset_-12px_-8px_40px_#46464620] w-[85%] h-9 mt-1 "
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
          />
          <br />
          {/* npx tailwindcss -i ./src/input.css -o ./dist/style.css   fir --watch */}

          {isLogin ? (
            <button
              type="submit"
              className="text-white w-[83%] h-10 shadow-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          ) : (
            <button
              type="submit"
              className="text-white w-[83%] h-10 shadow-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create my account
            </button>
          )}
          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
              OR
            </p>
            <hr className="w-full bg-gray-400  " />
          </div>
          {isLogin ? (
            <p>
              Don't have account?{" "}
              <button onClick={switchAuthModeHandler}>Sign up here</button>
            </p>
          ) : (
            <p>
              Login with existing account{" "}
              <button onClick={switchAuthModeHandler}>Login </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
