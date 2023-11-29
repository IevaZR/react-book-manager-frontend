import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/userSlice";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [loginErrorMsg, setLoginErrorMsg] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const emailInputRef = useRef()

  useEffect(() => {
    emailInputRef.current.focus()
  },[])

  const handleInputChange = (event) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const loginUser = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3009/user/login-user",
        inputData
      );
      if (data === "Authorized") {
        fetchUserData();
        setTimeout(() => {
          navigate("/user");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setLoginErrorMsg(true);
    }
  };

  const fetchUserData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:3009/user/get-user/${inputData.email}`
      );
      const user = data.data[0];
      console.log(user);
      dispatch(setCurrentUser(user));
      setLoginErrorMsg(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="LoginWrapper">
      <h3>Please log in</h3>
      <form className="LoginForm">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={inputData.email}
          onChange={handleInputChange}
          ref={emailInputRef}
        ></input>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={inputData.password}
          onChange={handleInputChange}
        ></input>
        {loginErrorMsg && (
          <p className="LoginErrorMsg">Email or Password is incorrect</p>
        )}
        <button className="LoginFormBtn" onClick={loginUser} type="button">
          Log In
        </button>
      </form>

      <Link to="/register" className="LinkToRegister">
        Or click here to register
      </Link>
    </div>
  );
};

export default Login;
