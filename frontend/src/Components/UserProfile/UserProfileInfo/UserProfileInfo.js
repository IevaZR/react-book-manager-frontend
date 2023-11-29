import React, { useState } from "react";
import "./UserProfileInfo.css";
import EditIcon from "./../../../Assets/edit-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setCurrentUser } from "../../../Redux/userSlice";
import axios from "axios";

const UserProfileInfo = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [isSurnameEdited, setIsSurnameEdited] = useState(false);
  const [isEmailEdited, setIsEmailEdited] = useState(false);
  const [inputData, setInputData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: currentUser.password,
  });
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const updateUserInfo = () => {
    let updatedUser = {
      ...currentUser,
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      email: inputData.email,
    };

    dispatch(setCurrentUser(updatedUser));
    updateUserInDB(updatedUser);

    setIsNameEdited(false);
    setIsSurnameEdited(false);
    setIsEmailEdited(false);
  };

  const updateUserInDB = async (updatedUser) => {
    console.log(updatedUser);
    try {
      await axios.put(
        `http://localhost:3009/user/update-user-by-id/${updatedUser._id}`,
        updatedUser
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:3009/user/delete-user/${currentUser._id}`
      );
      dispatch(logoutUser())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="UserProfileInfoWrapper">
      <div>
        <div className="UserProfileInfoDetailWrapper">
          <p className="UserProfileInfoHeading">Name:</p>
          {!isNameEdited && (
            <p className="UserProfileInfoValue">{currentUser.firstName}</p>
          )}
          {isNameEdited && (
            <input
              type="text"
              value={inputData.firstName}
              name="firstName"
              onChange={handleInputChange}
            />
          )}
          {!isNameEdited && (
            <img
              src={EditIcon}
              alt="edit-icon"
              onClick={() => {
                setIsNameEdited(true);
              }}
            />
          )}
        </div>
        <div className="UserProfileInfoDetailWrapper">
          <p className="UserProfileInfoHeading">Surname:</p>
          {!isSurnameEdited && (
            <p className="UserProfileInfoValue">{currentUser.lastName}</p>
          )}
          {isSurnameEdited && (
            <input
              type="text"
              value={inputData.lastName}
              name="lastName"
              onChange={handleInputChange}
            />
          )}
          {!isSurnameEdited && (
            <img
              src={EditIcon}
              alt="edit-icon"
              onClick={() => {
                setIsSurnameEdited(true);
              }}
            />
          )}
        </div>
        <div className="UserProfileInfoDetailWrapper">
          <p className="UserProfileInfoHeading">Email:</p>
          {!isEmailEdited && (
            <p className="UserProfileInfoValue">{currentUser.email}</p>
          )}
          {isEmailEdited && (
            <input
              type="text"
              value={inputData.email}
              name="email"
              onChange={handleInputChange}
            />
          )}
          {!isEmailEdited && (
            <img
              src={EditIcon}
              alt="edit-icon"
              onClick={() => {
                setIsEmailEdited(true);
              }}
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="UserProfileInfoFormBtn"
        onClick={updateUserInfo}
        disabled={
          isNameEdited || isSurnameEdited || isEmailEdited ? false : true
        }
      >
        Save and Update
      </button>
      <button
        type="button"
        className="UserProfileInfoFormDeleteBtn"
        onClick={deleteUser}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default UserProfileInfo;
