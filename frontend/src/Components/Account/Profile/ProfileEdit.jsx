import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function ProfileEdit() {
  const {
    profileEditForm,
    setProfileEditForm,
    updateProfile,
    profileImageAccessUrl,
  } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile-edit-page">
      <form onSubmit={(e) => updateProfile(e)} className="profile-edit-form">
        <div className="profile-edit-personal-details profile-edit-box-design">
          <h3>Personal Details:-</h3>
          <div className="profile-edit-group profile-edit-image">
            <label htmlFor="profileImage">
              <img
                src={
                  profileEditForm.profileImage &&
                  typeof profileEditForm.profileImage === "string"
                    ? profileImageAccessUrl + profileEditForm.profileImage
                    : URL.createObjectURL(profileEditForm.profileImage)
                }
                alt="profile"
              />
              <FontAwesomeIcon icon={faPen} />
            </label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  profileImage: e.target.files[0],
                }));
              }}
              hidden
            />
          </div>
          <div className="profile-edit-group">
            <p>Name:&nbsp;</p>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Name"
              value={profileEditForm.userName}
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  userName: e.target.value,
                }));
              }}
              maxLength={50}
              required
            />
          </div>
          <div className="profile-edit-group">
            <p>Phone:&nbsp;</p>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="phone"
              value={profileEditForm.phone}
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  phone: e.target.value,
                }));
              }}
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="profile-edit-group">
            <p>Age:&nbsp;</p>
            <input
              type="number"
              name="age"
              id="age"
              min={18}
              placeholder="age"
              value={profileEditForm.age}
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  age: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="profile-edit-group">
            <p>Gender:&nbsp;</p>
            <div className="profile-edit-gender-options">
              <input
                type="radio"
                name="gender"
                id="Male"
                value="Male"
                checked={profileEditForm.gender === "Male"}
                onChange={(e) => {
                  setProfileEditForm((s) => ({
                    ...s,
                    gender: "Male",
                  }));
                }}
                required
              />
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                name="gender"
                id="Female"
                value="Female"
                checked={profileEditForm.gender === "Female"}
                onChange={(e) => {
                  setProfileEditForm((s) => ({
                    ...s,
                    gender: "Female",
                  }));
                }}
                required
              />
              <label htmlFor="Female">Female</label>
            </div>
          </div>
          <div className="profile-edit-group">
            <p>Bio:&nbsp;</p>
            <textarea
              placeholder="Bio"
              name="bio"
              id="bio"
              value={profileEditForm.bio}
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  bio: e.target.value,
                }));
              }}
              required
            ></textarea>
          </div>
          <div className="profile-edit-group">
            <p>Location:&nbsp;</p>
            <select
              name="location"
              id="location"
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  location: e.target.value,
                }));
              }}
              placeholder="Enter you location"
              value={profileEditForm.location}
              required
            >
              <option value="">Select a state or UT</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Ladakh">Ladakh</option>
            </select>
          </div>
          <div className="profile-edit-group">
            <p>Address&nbsp;</p>
            <textarea
              name="address"
              id="address"
              value={profileEditForm.address}
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  address: e.target.value,
                }));
              }}
              required
            ></textarea>
          </div>
        </div>
        <div className="profile-edit-payment-details profile-edit-box-design">
          <h3>Payment Details:-</h3>
          <div className="profile-edit-group">
            <div className="profile-edit-bank-details">
              <h4>UPI Id:</h4>
              <input
                type="text"
                name="upi"
                id="upi"
                placeholder="UPI Id"
                value={profileEditForm.paymentDetails.upi}
                onChange={(e) => {
                  setProfileEditForm((s) => ({
                    ...s,
                    paymentDetails: {
                      ...s.paymentDetails,
                      upi: e.target.value,
                    },
                  }));
                }}
                required
              />
            </div>
            <h4>Bank Details:-</h4>
            <div className="profile-edit-bank-details">
              <p>Bank Name:&nbsp;</p>
              <input
                type="text"
                name="bankName"
                id="bankName"
                placeholder="Bank Name"
                value={profileEditForm.paymentDetails.bank.bankName}
                onChange={(e) => {
                  setProfileEditForm((s) => ({
                    ...s,
                    paymentDetails: {
                      ...s.paymentDetails,
                      bank: {
                        ...s.paymentDetails.bank,
                        bankName: e.target.value,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
            <div className="profile-edit-bank-details">
              <p>Account Number:&nbsp;</p>
              <input
                type="text"
                name="accountNumber"
                id="accountNumber"
                placeholder="Account Number"
                value={profileEditForm.paymentDetails.bank.accountNumber}
                onChange={(e) => {
                  setProfileEditForm((s) => ({
                    ...s,
                    paymentDetails: {
                      ...s.paymentDetails,
                      bank: {
                        ...s.paymentDetails.bank,
                        accountNumber: e.target.value,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
            <div className="profile-edit-bank-details">
              <p>IFSC Code:&nbsp;</p>
              <input
                type="text"
                name="ifscCode"
                id="ifscCode"
                placeholder="IFSC Code"
                value={profileEditForm.paymentDetails.bank.ifscCode}
                onChange={(e) => {
                  setProfileEditForm((s) => ({
                    ...s,
                    paymentDetails: {
                      ...s.paymentDetails,
                      bank: {
                        ...s.paymentDetails.bank,
                        ifscCode: e.target.value,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="profile-edit-delivery-details profile-edit-box-design">
          <h3>Delivery Details:-</h3>
          <div className="profile-edit-group">
            <p>Delivery Option:&nbsp;</p>
            <div className="profile-edit-delivery-options">
              <input
                type="radio"
                name="deliverOption"
                id="local"
                value="local"
                checked={profileEditForm.deliveryOption === "local"}
                onChange={(e) => {
                  setProfileEditForm((s) => ({
                    ...s,
                    deliveryOption: "local",
                  }));
                }}
                required
              />
              <label htmlFor="local">Local</label>
              <input
                type="radio"
                name="deliverOption"
                id="domestic"
                value="domestic"
                checked={profileEditForm.deliveryOption === "domestic"}
                onChange={(e) => {
                  setProfileEditForm((s) => ({
                    ...s,
                    deliveryOption: "domestic",
                  }));
                }}
                required
              />
              <label htmlFor="domestic">Domestic</label>
            </div>
          </div>
          <div className="profile-edit-group">
            <p>Return Days:&nbsp;</p>
            <input
              type="number"
              name="returnDays"
              id="returnDays"
              placeholder="Return Days"
              value={profileEditForm.returnDays}
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  returnDays: e.target.value,
                }));
              }}
              min={1}
              required
            />
          </div>
          <div className="profile-edit-group">
            <p>Return Policy:&nbsp;</p>
            <textarea
              name="returnPolicy"
              id="returnPolicy"
              placeholder="Return Policy"
              value={profileEditForm.returnPolicy}
              onChange={(e) => {
                setProfileEditForm((s) => ({
                  ...s,
                  returnPolicy: e.target.value,
                }));
              }}
              required
            ></textarea>
          </div>
        </div>
        <div className="profile-edit-buttons profile-edit-box-design">
          <button type="submit" className="update">Update Profile</button>
          <button type="reset" className="cancel" onClick={() => setProfileEditForm(null)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
