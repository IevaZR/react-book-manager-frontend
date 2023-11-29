import React, { useEffect, useRef, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerThankYouMsgVisible, setRegisterThankYouMsgVisible] =
    useState(false);
  const [users, setUsers] = useState([]);
  const [inputValues, setInputValues] = useState({
    name: "",
    surname: "",
    email: "",
    email2: "",
    password: "",
    password2: "",
  });
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(false);
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState(false);
  const [emailOneValidErrorMsg, setEmailOneValidErrorMsg] = useState(false);
  const [emailTwoValidErrorMsg, setEmailTwoValidErrorMsg] = useState(false);
  const [emailOneMatchErrorMsg, setEmailOneMatchErrorMsg] = useState(false);
  const [emailTwoMatchErrorMsg, setEmailTwoMatchErrorMsg] = useState(false);
  const [emailOneDuplicateErrorMsg, setEmailOneDuplicateErrorMsg] =
    useState(false);
  const [passwordOneTooShortErrorMsg, setPasswordOneTooShortErrorMsg] =
    useState(false);
  const [passwordTwoTooShortErrorMsg, setPasswordTwoTooShortErrorMsg] =
    useState(false);
  const [passwordOneMatchErrorMsg, setPasswordOneMatchErrorMsg] =
    useState(false);
  const [passwordTwoMatchErrorMsg, setPasswordTwoMatchErrorMsg] =
    useState(false);
    const nameInputRef = useRef()

    useEffect(() => {
      nameInputRef.current.focus()
    }, [])

  const handleInputChange = (event) => {
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const getUsers = async () => {
    try {
      const data = await axios.get("http://localhost:3009/user");
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async () => {
    validRegisterName();
    validRegisterSurname();
    validRegisterEmail();
    validRegisterPassword();
    if (
      validRegisterName() &&
      validRegisterSurname() &&
      validRegisterEmail() &&
      validRegisterPassword()
    ) {
      const user = {
        firstName: inputValues.name,
        lastName: inputValues.surname,
        email: inputValues.email,
        password: inputValues.password,
        readingListBooks: [],
        finishedBooks: [],
      };
      try {
        await axios.post("http://localhost:3009/user/create-user", user);
        setRegisterThankYouMsgVisible(true);
        setInputValues({
          name: "",
          surname: "",
          email: "",
          email2: "",
          password: "",
          password2: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  function validRegisterName() {
    if (inputValues.name.length < 2) {
      setFirstNameErrorMsg(true);
      return false;
    } else {
      setFirstNameErrorMsg(false);
      return true;
    }
  }

  function validRegisterSurname() {
    if (inputValues.surname.length <= 2) {
      setLastNameErrorMsg(true);
      return false;
    } else {
      setLastNameErrorMsg(false);
      return true;
    }
  }

  function registerEmailMatch() {
    if (inputValues.email === inputValues.email2) {
      setEmailOneMatchErrorMsg(false);
      setEmailTwoMatchErrorMsg(false);
      return true;
    } else {
      setEmailOneMatchErrorMsg(true);
      setEmailTwoMatchErrorMsg(true);
    }
  }

  function emailMatch() {
    getUsers()

    if (!users) {
      return false;
    }

    const emailFound = users.some((item) => item.email === inputValues.email);

    if (emailFound) {
      setEmailOneDuplicateErrorMsg(true);
      setEmailOneValidErrorMsg(false);
      setEmailOneMatchErrorMsg(false);
    }

    return emailFound;
  }

  function validRegisterEmail() {
    const emailFound = emailMatch();
    if (!emailFound) {
      setEmailOneDuplicateErrorMsg(false);
      const validEmailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (inputValues.email.match(validEmailRegex) && registerEmailMatch()) {
        setEmailOneValidErrorMsg(false);
        setEmailTwoValidErrorMsg(false);
        return true;
      } else if (
        inputValues.email.match(validEmailRegex) &&
        !registerEmailMatch()
      ) {
        setEmailOneValidErrorMsg(false);
        setEmailTwoValidErrorMsg(false);
      } else {
        setEmailOneValidErrorMsg(true);
        setEmailTwoValidErrorMsg(true);
      }
    }
  }

  function validRegisterPassword() {
    if (inputValues.password.length >= 5 && registerPasswordMatch()) {
      setPasswordOneTooShortErrorMsg(false);
      setPasswordTwoTooShortErrorMsg(false);
      return true;
    } else if (inputValues.password.length >= 5 && !registerPasswordMatch()) {
      setPasswordOneTooShortErrorMsg(false);
      setPasswordTwoTooShortErrorMsg(false);
    } else {
      setPasswordOneTooShortErrorMsg(true);
      setPasswordTwoTooShortErrorMsg(true);
    }
  }

  function registerPasswordMatch() {
    if (inputValues.password === inputValues.password2) {
      setPasswordOneMatchErrorMsg(false);
      setPasswordTwoMatchErrorMsg(false);
      return true;
    } else {
      setPasswordOneMatchErrorMsg(true);
      setPasswordTwoMatchErrorMsg(true);
    }
  }

  return (
    <div className="RegisterWrapper">
      <h3>Please fill the form below</h3>
      <form className="RegisterForm">
        <div className="RegisterNameWrapper">
          <div className="RegisterInputWrapper">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
              ref={nameInputRef}
            ></input>
            {firstNameErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterName"
              >
                Name should consist of at least 2 letters
              </p>
            )}
          </div>
          <div className="RegisterInputWrapper">
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={inputValues.surname}
              onChange={handleInputChange}
            ></input>
            {lastNameErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterSurname"
              >
                Surname should consist of at least 2 letters
              </p>
            )}
          </div>
        </div>
        <div className="RegisterEmailWrapper">
          <div className="RegisterInputWrapper">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
            ></input>
            {emailOneValidErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterEmailOneValid"
              >
                Please provide valid email address
              </p>
            )}
            {emailOneDuplicateErrorMsg && (
              <p className="RegisterValidErrMsg" id="EmailExists">
                Email already registered
              </p>
            )}
            {emailOneMatchErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterEmailOneMatch"
              >
                Emails do not match
              </p>
            )}
          </div>
          <div className="RegisterInputWrapper">
            <label>Please confirm email</label>
            <input
              type="text"
              name="email2"
              value={inputValues.email2}
              onChange={handleInputChange}
            ></input>
            {emailTwoValidErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterEmailTwoValid"
              >
                Please provide valid email address
              </p>
            )}
            {emailTwoMatchErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterEmailTwoMatch"
              >
                Emails do not match
              </p>
            )}
          </div>
        </div>
        <div className="RegisterPasswordWrapper">
          <div className="RegisterInputWrapper">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={inputValues.password}
              onChange={handleInputChange}
            ></input>
            {passwordOneTooShortErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterPasswordOneValid"
              >
                Password should contain at least 5 characters
              </p>
            )}
            {passwordOneMatchErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterPasswordOneMatch"
              >
                Passwords do not match
              </p>
            )}
          </div>
          <div className="RegisterInputWrapper">
            <label>Please confirm password</label>
            <input
              type="password"
              name="password2"
              value={inputValues.password2}
              onChange={handleInputChange}
            ></input>
            {passwordTwoTooShortErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterPasswordTwoValid"
              >
                Password should contain at least 5 characters
              </p>
            )}
            {passwordTwoMatchErrorMsg && (
              <p
                className="RegisterValidErrMsg"
                id="RegisterValidErrMsgRegisterPasswordTwoMatch"
              >
                Passwords do not match
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          className="RegisterFormBtn"
          onClick={registerUser}
        >
          Register
        </button>
        {registerThankYouMsgVisible && (
          <div className="RegisterThankYouMsg">
            <p>Thank you for registering! Please</p>
            <Link to="/login">LOG IN HERE</Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
