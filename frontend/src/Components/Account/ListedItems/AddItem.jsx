import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";
import uploadImage from "../../../Assets/uploadImage.png";
import "./ListedItems.css"

function AddItem({ setShowAddItem }) {
  const { addItem, setItemAddForm, itemAddForm } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  
  return (
    <div className="listed-item-popup box">
      <h1>Add Item</h1>
      <form
        onSubmit={(e) => {
          addItem(e);
        }}
        className="listed-item-popup-form"
      >
        <div className="listed-item-popup-form-group box remove-padding">
          <label htmlFor="itemImage">
            <img
              src={
                itemAddForm.itemImage
                  ? URL.createObjectURL(itemAddForm.itemImage)
                  : uploadImage
              }
              alt="item"
            />
          </label>
          <input
            type="file"
            name="itemImage"
            id="itemImage"
            placeholder="itemImage"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setItemAddForm((s) => ({
                ...s,
                [e.target.name]: e.target.files[0],
              }));
            }}
            required
            style={{
              opacity: 0,
            }}
          />
        </div>
        <div className="listed-item-popup-form-group box">
          <div className="listed-item-popup-form-group-field">
            <p>
              Item Name:<span className="required">*</span>&nbsp;
            </p>
            <input
              type="text"
              name="itemName"
              id="itemName"
              placeholder="Item Name"
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  [e.target.name]: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="listed-item-popup-form-group-field">
            <p>
              Price:<span className="required">*</span>&nbsp;
            </p>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              min={0}
              onChange={(e) => {
                setItemAddForm((s) => ({ ...s, price: e.target.value }));
              }}
              required
            />
          </div>
          <div className="listed-item-popup-form-group-field">
            <p>Discount:&nbsp;</p>
            <input
              type="number"
              name="discount"
              id="discount"
              placeholder="Discount"
              min={0}
              max={100}
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </div>
          <div className="listed-item-popup-form-group-field">
            <p>
              Quantity:<span className="required">*</span>&nbsp;
            </p>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              min={1}
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  [e.target.name]: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="listed-item-popup-form-group-field">
            <p>
              Category:<span className="required">*</span>&nbsp;
            </p>
            <select
              name="category"
              id="category"
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  [e.target.name]: e.target.value,
                }));
              }}
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home_And_Garden">Home & Garden</option>
              <option value="Sports_And_Outdoors">Sports & Outdoors</option>
              <option value="Toys_And_Hobbies">Toys & Hobbies</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>
        </div>
        <div className="listed-item-popup-form-group box">
          <div className="listed-item-popup-form-group-field">
            <p>
              Condition:<span className="required">*</span>&nbsp;
            </p>
            <div className="item-form-popup-options">
              <input
                type="radio"
                name="condition"
                id="new"
                onChange={(e) => {
                  setItemAddForm((s) => ({
                    ...s,
                    condition: "new",
                  }));
                }}
                required
              />
              <label htmlFor="new">New</label>
              <input
                type="radio"
                name="condition"
                id="used"
                onChange={(e) => {
                  setItemAddForm((s) => ({
                    ...s,
                    condition: "used",
                  }));
                }}
                required
              />
              <label htmlFor="used">Used</label>
              <input
                type="radio"
                name="condition"
                id="refurbished"
                onChange={(e) => {
                  setItemAddForm((s) => ({
                    ...s,
                    condition: "refurbished",
                  }));
                }}
                required
              />
              <label htmlFor="refurbished">Refurbished</label>
            </div>
          </div>
          <div className="listed-item-popup-form-group-field">
            <p>Return Days:&nbsp;</p>
            <input
              type="number"
              name="returnDays"
              id="returnDays"
              placeholder="Return Days"
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  returnDays: e.target.value,
                }));
              }}
              min={0}
            />
          </div>
          <div className="listed-item-popup-form-group-field">
            <p>Location:&nbsp;</p>
            <select
              name="location"
              id="location"
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  [e.target.name]: e.target.value,
                }));
              }}
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
          <div className="listed-item-popup-form-group-field">
            <p>Delivery Option:&nbsp;</p>
            <div className="item-form-popup-options">
              <input
                type="radio"
                name="deliveryOption"
                id="local"
                value="local"
                onChange={(e) => {
                  setItemAddForm((s) => ({
                    ...s,
                    deliveryOption: "local",
                  }));
                }}
              />
              <label htmlFor="local">Local</label>
              <input
                type="radio"
                name="deliveryOption"
                id="domestic"
                value="domestic"
                onChange={(e) => {
                  setItemAddForm((s) => ({
                    ...s,
                    deliveryOption: "domestic",
                  }));
                }}
              />
              <label htmlFor="domestic">Domestic</label>
            </div>
          </div>
          <div className="listed-item-popup-form-group-field">
            <p>
              Delivery Charge:<span className="required">*</span>&nbsp;
            </p>
            <input
              type="number"
              name="deliveryCharge"
              id="deliveryCharge"
              placeholder="Delivery Charge"
              min={0}
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  [e.target.name]: e.target.value,
                }));
              }}
              required
            />
          </div>
        </div>
        <div className="listed-item-popup-form-group box">
          <div className="listed-item-popup-form-group-field">
            <p>
              Description:<span className="required">*</span>&nbsp;
            </p>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  [e.target.name]: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="listed-item-popup-form-group-field">
            <p>
              Tags:<span className="required">*</span>&nbsp;
            </p>
            <textarea
              name="tags"
              id="tags"
              placeholder="Tags"
              onChange={(e) => {
                setItemAddForm((s) => ({
                  ...s,
                  [e.target.name]: e.target.value,
                }));
              }}
              required
            />
          </div>
        </div>
        <div className="listed-item-popup-form-buttons box">
          <button type="submit" className="add-item">
            Add Item
          </button>
          <button
            type="reset"
            onClick={() => setShowAddItem(false)}
            className="delete"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
