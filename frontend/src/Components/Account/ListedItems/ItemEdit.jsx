import React, { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";

function ItemEdit() {
  const { updateItem, itemEditForm, setItemEditForm, itemImageAccessUrl } =
    useContext(AppContext);
  return (
    <div>
      <h1>Edit Item</h1>
      <form onSubmit={(e) => updateItem(e)}>
        <div>
          <label htmlFor="itemImage">
            <img
              src={
                itemEditForm.itemImage &&
                typeof itemEditForm.itemImage === "string"
                  ? itemImageAccessUrl + itemEditForm.itemImage
                  : URL.createObjectURL(itemEditForm.itemImage)
              }
              alt=""
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          </label>
          <input
            type="file"
            name="itemImage"
            placeholder="itemImage"
            onChange={(e) =>
              setItemEditForm((s) => ({
                ...s,
                [e.target.name]: e.target.files[0],
              }))
            }
            hidden
          />
        </div>
        <input
          type="text"
          name="itemName"
          value={itemEditForm.itemName}
          placeholder="itemName"
          onChange={(e) =>
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }))
          }
          required
        />
        <input
          type="number"
          name="price"
          value={itemEditForm.price}
          placeholder="price"
          min={0}
          onChange={(e) =>
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }))
          }
          required
        />
        <input
          type="number"
          name="discount"
          value={itemEditForm.discount}
          placeholder="discount"
          min={0}
          onChange={(e) =>
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="quantity"
          value={itemEditForm.quantity}
          min={1}
          max={100}
          onChange={(e) => {
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }));
          }}
          required
        />
        <textarea
          name="description"
          value={itemEditForm.description}
          placeholder="description"
          onChange={(e) =>
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }))
          }
          required
        />
        <textarea
          name="tags"
          id="tags"
          placeholder="Tags"
          value={itemEditForm.tags}
          onChange={(e) => {
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }));
          }}
          required
        />
        <input
          type="number"
          name="deliveryCharge"
          id="deliveryCharge"
          placeholder="deliveryCharge"
          value={itemEditForm.deliveryCharge}
          min={0}
          onChange={(e) => {
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }));
          }}
          required
        />
        <div>
          <h3>Delivery Option</h3>
          <input
            type="radio"
            name="deliveryOption"
            id="local"
            value="local"
            checked={itemEditForm.deliveryOption === "local"}
            onChange={(e) => {
              setItemEditForm((s) => ({
                ...s,
                deliveryOption: "local",
              }));
            }}
            required
          />
          <label htmlFor="local">Local</label>
          <input
            type="radio"
            name="deliveryOption"
            id="domestic"
            value="domestic"
            checked={itemEditForm.deliveryOption === "domestic"}
            onChange={(e) => {
              setItemEditForm((s) => ({
                ...s,
                deliveryOption: "domestic",
              }));
            }}
            required
          />
          <label htmlFor="domestic">Domestic</label>
        </div>
        <div>
          <h3>Item Condition:</h3>
          <input
            type="radio"
            name="condition"
            id="new"
            checked={itemEditForm.condition === "new"}
            onChange={(e) => {
              setItemEditForm((s) => ({
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
            checked={itemEditForm.condition === "used"}
            onChange={(e) => {
              setItemEditForm((s) => ({
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
            checked={itemEditForm.condition === "refurbished"}
            onChange={(e) => {
              setItemEditForm((s) => ({
                ...s,
                condition: "refurbished",
              }));
            }}
            required
          />
          <label htmlFor="refurbished">Refurbished</label>
        </div>
        <select
          name="category"
          value={itemEditForm.category}
          onChange={(e) =>
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }))
          }
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
        <select
          name="location"
          value={itemEditForm.location}
          onChange={(e) =>
            setItemEditForm((s) => ({
              ...s,
              [e.target.name]: e.target.value,
            }))
          }
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
          <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
          <option value="Daman and Diu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
          <option value="Ladakh">Ladakh</option>
        </select>
        <input
          type="number"
          name="returnDays"
          id="returnDays"
          placeholder="Return Days"
          value={itemEditForm.returnDays}
          onChange={(e) => {
            setItemEditForm((s) => ({
              ...s,
              returnDays: e.target.value,
            }));
          }}
          min={0}
        />
        <input type="submit" value="Update Item" />
        <button type="reset" onClick={() => setItemEditForm(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ItemEdit;
