import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import ProfileEdit from "./ProfileEdit";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function ProfileDetails() {
  const {
    user,
    profileImageAccessUrl,
    profileEditForm,
    setProfileEditForm,
    deleteAccount,
    timestampToDate,
    Logout,
    calculate_Rating,
    deleteConfirm,
    setDeleteConfirm,
  } = useContext(AppContext);

  useEffect(() => {
    setProfileEditForm(null);
  }, []);

  return (
    <div className="profile-page">
      <div
        className={`profile-container ${
          profileEditForm || deleteConfirm ? "blurred" : ""
        }`}
      >
        <div className="account-profile-image profile-box-shadow">
          <img src={profileImageAccessUrl + user.profileImage} alt="profile" className="box remove-padding"/>
        </div>
        <div className="profile-short-intro profile-box-shadow">
          <div className="profile-intro-title">
            <h1>{user.userName}</h1>
            <p>
              <FontAwesomeIcon icon={faLocationDot} />
              &nbsp;
              {user.location}
            </p>
          </div>
          <p>
            Rating:&nbsp;⭐{calculate_Rating(user.rating)}
            <span className="side-small-text">({user.rating.length})</span>
          </p>
          <p>Bio:&nbsp;{user.bio}</p>
          <p className="profile-short-end">
            Member of TradeConnect Since&nbsp;
            <span className="profile-short-highlight">
              {timestampToDate(user.created_at, false)}
            </span>
          </p>
        </div>
        <div className="profile-personal-details profile-box-shadow">
          <h3>Personal Details:-</h3>
          <p>E-mail:&nbsp;{user.email}</p>
          <p>Phone:&nbsp;{user.phone}</p>
          <p>Age:&nbsp;{user.age}</p>
          <p>Gender:&nbsp;{user.gender}</p>
          <p>Address:&nbsp;{user.address}</p>
        </div>
        <div className="profile-payment-details profile-box-shadow">
          <h3>Payment Details:-</h3>
          <p>UPI Id:&nbsp;{user.paymentDetails.upi}</p>
          <p>Bank Name:&nbsp;{user.paymentDetails.bank.bankName}</p>
          <p>Account Number:&nbsp;{user.paymentDetails.bank.accountNumber}</p>
          <p>IFSC Code:&nbsp;{user.paymentDetails.bank.ifscCode}</p>
        </div>
        <div className="profile-delivery-details profile-box-shadow">
          <h3>Delivery Details:-</h3>
          <p>Delivery Option:&nbsp;{user.deliveryOption}</p>
          <p>Return Days:&nbsp;{user.returnDays}</p>
          <p>Return Policy:&nbsp;{user.returnPolicy}</p>
        </div>
        <div className="profile-buttons profile-box-shadow">
          <button className="logout" onClick={() => Logout()}>
            Logout
          </button>
          <button
            className="edit"
            onClick={() =>
              setProfileEditForm({
                ...user,
                oldProfileImage: user.profileImage,
              })
            }
          >
            Edit
          </button>
          <button className="delete" onClick={() => setDeleteConfirm(true)}>
            Delete
          </button>
        </div>
      </div>
      {profileEditForm && <ProfileEdit />}
      {deleteConfirm && (
        <div className="profile-delete-confirmation-box box">
          <h2>
            <span className="accent-1">Trade</span>Connect:-
          </h2>
          <h4>Are you sure you want to delete this account?</h4>
          <div className="profile-delete-confirmation-box-buttons">
            <button onClick={() => setDeleteConfirm(false)} className="cancel">
              Cancel
            </button>
            <button
              onClick={() => {
                deleteAccount();
                setDeleteConfirm(false);
              }}
              className="delete"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
