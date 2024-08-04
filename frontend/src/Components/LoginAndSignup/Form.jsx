import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import uploadImage from "../../Assets/uploadImage.png";
import "./Form.css";

function Form() {
  const { registrationForm, setRegistrationForm, handleFormSubmit } =
    useContext(AppContext);
  const [form, setForm] = useState("Login");

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <button
            className={`form-toggle-button ${
              form === "Login" ? "active" : "inactive"
            }`}
            onClick={() => setForm("Login")}
          >
            Login
          </button>
          <button
            className={`form-toggle-button ${
              form === "Login" ? "inactive" : "active"
            }`}
            onClick={() => setForm("Signup")}
          >
            Sign&nbsp;Up
          </button>
        </div>
        <form className="form" onSubmit={(e) => handleFormSubmit(e, form)}>
          {form === "Login" ? <></> : <h3>Personal Details:-</h3>}
          <div className="personal-details">
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group profile-image">
                <label htmlFor="profileImage">
                  <img
                    src={
                      registrationForm.profileImage
                        ? URL.createObjectURL(registrationForm.profileImage)
                        : uploadImage
                    }
                    alt="profile"
                    className={
                      registrationForm.profileImage
                        ? ""
                        : "remove-circle-border"
                    }
                  />
                </label>
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      profileImage: e.target.files[0],
                    }));
                  }}
                  hidden
                />
              </div>
            )}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>
                  Name:<span className="required">*</span>&nbsp;
                </p>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Name"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      userName: e.target.value,
                    }));
                  }}
                  maxLength={50}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <p>
                E-mail:<span className="required">*</span>&nbsp;
              </p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                maxLength={50}
                onChange={(e) => {
                  setRegistrationForm((r) => ({
                    ...r,
                    email: e.target.value,
                  }));
                }}
                required
              />
            </div>
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>
                  Phone:<span className="required">*</span>&nbsp;
                </p>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      phone: e.target.value,
                    }));
                  }}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            )}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>
                  Age:<span className="required">*</span>&nbsp;
                </p>
                <input
                  type="number"
                  name="age"
                  id="age"
                  min={18}
                  placeholder="Age (Minimum 18)"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      age: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
            )}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>
                  Gender:<span className="required">*</span>&nbsp;
                </p>
                <div className="gender-options">
                  <input
                    type="radio"
                    name="gender"
                    id="Male"
                    onClick={() => {
                      setRegistrationForm((r) => ({
                        ...r,
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
                    onClick={() => {
                      setRegistrationForm((r) => ({
                        ...r,
                        gender: "Female",
                      }));
                    }}
                    required
                  />
                  <label htmlFor="Female">Female</label>
                  <input
                    type="radio"
                    name="gender"
                    id="Female"
                    onClick={() => {
                      setRegistrationForm((r) => ({
                        ...r,
                        gender: "Others",
                      }));
                    }}
                    required
                  />
                  <label htmlFor="Others">Others</label>
                </div>
              </div>
            )}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>Bio:&nbsp;</p>
                <textarea
                  placeholder="Bio"
                  name="bio"
                  id="bio"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      bio: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
            )}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>
                  Location:<span className="required">*</span>&nbsp;
                </p>
                <select
                  name="location"
                  id="location"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      location: e.target.value,
                    }));
                  }}
                  placeholder="Enter your Location"
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
            )}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>
                  Address:<span className="required">*</span>&nbsp;
                </p>
                <textarea
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      address: e.target.value,
                    }));
                  }}
                  required
                ></textarea>
              </div>
            )}
          </div>
          <div className="delivery-details">
            {form === "Login" ? <></> : <h3>Delivery Details:-</h3>}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>
                  Delivery Option:<span className="required">*</span>&nbsp;
                </p>
                <div className="delivery-options">
                  <input
                    type="radio"
                    name="deliverOption"
                    id="local"
                    value="local"
                    onChange={(e) => {
                      setRegistrationForm((r) => ({
                        ...r,
                        deliveryOption: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor="local">Local</label>
                  <input
                    type="radio"
                    name="deliverOption"
                    id="domestic"
                    value="domestic"
                    onChange={(e) => {
                      setRegistrationForm((r) => ({
                        ...r,
                        deliveryOption: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor="domestic">Domestic</label>
                </div>
              </div>
            )}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>Return Days:&nbsp;</p>
                <input
                  type="number"
                  name="returnDays"
                  id="returnDays"
                  placeholder="Return Days"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      returnDays: e.target.value,
                    }));
                  }}
                  min={1}
                />
              </div>
            )}
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>Return Policy:&nbsp;</p>
                <textarea
                  name="returnPolicy"
                  id="returnPolicy"
                  placeholder="Return Policy"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      returnPolicy: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
            )}
          </div>
          {form === "Login" ? (
            <></>
          ) : (
            <div className="form-group payment-details">
              <h3>Payment Details:-</h3>
              <p>
                Upi:<span className="required">*</span>&nbsp;
              </p>
              <input
                type="text"
                name="upi"
                id="upi"
                placeholder="UPI Id"
                onChange={(e) => {
                  setRegistrationForm((r) => ({
                    ...r,
                    paymentDetails: {
                      ...r.paymentDetails,
                      upi: e.target.value,
                    },
                  }));
                }}
                required
              />
              <p>
                Bank Details:<span className="required">*</span>&nbsp;
              </p>
              <input
                type="text"
                name="bankName"
                id="bankName"
                placeholder="Bank Name"
                onChange={(e) => {
                  setRegistrationForm((r) => ({
                    ...r,
                    paymentDetails: {
                      ...r.paymentDetails,
                      bank: {
                        ...r.paymentDetails.bank,
                        bankName: e.target.value,
                      },
                    },
                  }));
                }}
                required
              />
              <input
                type="text"
                name="accountNumber"
                id="accountNumber"
                placeholder="Account Number"
                onChange={(e) => {
                  setRegistrationForm((r) => ({
                    ...r,
                    paymentDetails: {
                      ...r.paymentDetails,
                      bank: {
                        ...r.paymentDetails.bank,
                        accountNumber: e.target.value,
                      },
                    },
                  }));
                }}
                required
              />
              <input
                type="text"
                name="ifscCode"
                id="ifscCode"
                placeholder="IFSC Code"
                onChange={(e) => {
                  setRegistrationForm((r) => ({
                    ...r,
                    paymentDetails: {
                      ...r.paymentDetails,
                      bank: {
                        ...r.paymentDetails.bank,
                        ifscCode: e.target.value,
                      },
                    },
                  }));
                }}
                required
              />
            </div>
          )}
          {form === "Login" ? <></> : <h3>Set Password:-</h3>}
          <div className="form-password">
            <div className="form-group">
              <p>
                Password:<span className="required">*</span>&nbsp;
              </p>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setRegistrationForm((r) => ({
                    ...r,
                    password: e.target.value,
                  }));
                }}
                required
              />
            </div>
            {form === "Login" ? (
              <></>
            ) : (
              <div className="form-group">
                <p>
                  Confirm Password:<span className="required">*</span>&nbsp;
                </p>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setRegistrationForm((r) => ({
                      ...r,
                      confirmPassword: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
            )}
          </div>
          <button type="submit" className="form-submit">{form}</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
