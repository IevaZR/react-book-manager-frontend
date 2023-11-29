import React, { useState } from "react";
import "./UserProfile.css";

import UserFinishedBooks from "./UserFinishedBooks/UserFinishedBooks";
import UserProfileInfo from "./UserProfileInfo/UserProfileInfo";
import UserReadingList from "./UserReadingList/UserReadingList";

const UserProfile = () => {
  const [userReadingListVisible, setUserReadingListVisible] = useState(true);
  const [userFinishedReadingVisible, setUserFinishedReadingVisible] =
    useState(false);
  const [userProfileInfoVisible, setProfileInfoVisible] = useState(false);

  const openUserReadingList = () => {
    setUserReadingListVisible(true);
    setUserFinishedReadingVisible(false);
    setProfileInfoVisible(false);
  };
  const openUserFinishedList = () => {
    setUserReadingListVisible(false);
    setUserFinishedReadingVisible(true);
    setProfileInfoVisible(false);
  };
  const openUserProfileInfo = () => {
    setUserReadingListVisible(false);
    setUserFinishedReadingVisible(false);
    setProfileInfoVisible(true);
  };

  return (
    <div className="UserProfileWrapper">
      <div className="UserProfileMenu">
        <button
          className={
            userReadingListVisible
              ? "UserProfileMenuButton List BtnActive"
              : "UserProfileMenuButton List"
          }
          onClick={openUserReadingList}
        >
          My Reading List
        </button>
        <button
          className={
            userFinishedReadingVisible
              ? "UserProfileMenuButton Finished BtnActive"
              : "UserProfileMenuButton Finished"
          }
          onClick={openUserFinishedList}
        >
          Finsihed reading
        </button>
        <button
          className={
            userProfileInfoVisible
              ? "UserProfileMenuButton Profile BtnActive"
              : "UserProfileMenuButton Profile"
          }
          onClick={openUserProfileInfo}
        >
          Update Prodile Info
        </button>
      </div>
      <div className="UserProfileMainSection">
        {userReadingListVisible && <UserReadingList />}
        {userFinishedReadingVisible && <UserFinishedBooks />}
        {userProfileInfoVisible && <UserProfileInfo />}
      </div>
    </div>
  );
};

export default UserProfile;
