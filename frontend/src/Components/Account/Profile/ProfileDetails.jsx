import React, { useContext,useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import ProfileEdit from "./ProfileEdit";

function ProfileDetails() {
  const {
    user,
    profileImageAccessUrl,
    profileEditForm,
    setProfileEditForm,
    deleteAccount,
    timestampToDate,
    Logout,
  } = useContext(AppContext);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return (
    <div>
      <h1>{user.userName}</h1>
      <h1>{user.email}</h1>
      <h1>{user.age}</h1>
      <h1>{user.user_id}</h1>
      <p>{user.phone}</p>
      <p>{user.location}</p>
      <p>{user.address}</p>
      <p>{user.bio}</p>
      <p>{user.returnPolicy}</p>
      <p>{user.paymentDetails.upi}</p>
      <p>{user.paymentDetails.bank.accountNumber}</p>
      <p>{user.paymentDetails.bank.bankName}</p>
      <p>{user.paymentDetails.bank.ifscCode}</p>
      <p>{user.returnDays}</p>
      <p>{user.deliveryOption}</p>
      <p>{timestampToDate(user.created_at)}</p>
      <img
        src={profileImageAccessUrl + user.profileImage}
        alt=""
        style={{
          width: "100px",
          height: "100px",
          display: "block",
          borderRadius: "50%",
        }}
      />
      <button onClick={() => Logout()}>Logout</button>
      <button
        onClick={() =>
          setProfileEditForm({ ...user, oldProfileImage: user.profileImage })
        }
      >
        Edit
      </button>
      <button onClick={() => setDeleteConfirm(true)}>Delete</button>
      <br />
      {profileEditForm && <ProfileEdit />}
      {deleteConfirm && (
        <div>
          <h2>Are you sure you want to delete this account?</h2>
          <button onClick={() => setDeleteConfirm(false)}>Cancel</button>
          <button onClick={() => deleteAccount()}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
