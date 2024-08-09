import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../../../Context/AppContext";
import AddItem from "./AddItem";
import ItemEdit from "./ItemEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import "./ListedItems.css";

function ListedItems() {
  const {
    filteredListedItems,
    itemImageAccessUrl,
    handleItemDelete,
    itemEditForm,
    setItemEditForm,
    timestampToDate,
    calculate_Rating,
    calculate_Discount,
  } = useContext(AppContext);
  const [filters, setFilters] = useState({
    price: "",
    discount: "",
    condition: "",
    location: "",
    returnDays: "",
    rating: "",
    category: "",
  });
  const [showAddItem, setShowAddItem] = useState(false);

  const filterAndSortListedItems = useMemo(() => {
    let dataToFilter = [...filteredListedItems];

    if (filters.price) {
      dataToFilter = dataToFilter.sort((a, b) =>
        filters.price === "low" ? a.price - b.price : b.price - a.price
      );
    }

    if (filters.discount) {
      let discount = parseInt(filters.discount);

      dataToFilter = dataToFilter.filter(
        (item) =>
          item.discount >= discount &&
          (filters.discount === "50" || item.discount <= discount + 10)
      );
    }

    if (filters.condition) {
      dataToFilter = dataToFilter.filter(
        (item) => item.condition === filters.condition
      );
    }

    if (filters.location) {
      dataToFilter = dataToFilter.filter(
        (item) => item.location === filters.location
      );
    }

    if (filters.returnDays) {
      const returnDaysMap = {
        0: [0, 0],
        7: [1, 7],
        14: [7, 14],
        30: [14, 30],
        100: [30, Infinity],
      };

      const [minDays, maxDays] = returnDaysMap[filters.returnDays] || [
        0,
        Infinity,
      ];
      dataToFilter = dataToFilter.filter(
        (item) => item.returnDays >= minDays && item.returnDays <= maxDays
      );
    }

    if (filters.rating) {
      dataToFilter = dataToFilter.filter((item) => {
        const totalRating = item.rating.reduce(
          (acc, eachRating) => acc + eachRating.rating,
          0
        );
        const avgRating = totalRating / item.rating.length;
        return (
          avgRating < parseInt(filters.rating) + 1 &&
          (filters.rating === "5"
            ? avgRating === 5
            : avgRating >= parseInt(filters.rating))
        );
      });
    }

    if (filters.category) {
      dataToFilter = dataToFilter.filter(
        (item) => item.category === filters.category
      );
    }

    return dataToFilter;
  }, [filters, filteredListedItems]);

  if (filteredListedItems.length === 0) {
    return (
      <div
        style={{ position: "relative" }}
        className={itemEditForm || showAddItem ? "flex-center" : ""}
      >
        <div
          className={`empty-page box ${
            itemEditForm || showAddItem ? "blurred" : ""
          }`}
        >
          <h1>🍃No Items Listed</h1>
          <button className="add-item" onClick={() => setShowAddItem(true)}>
            Add Item
          </button>
        </div>
        {showAddItem && <AddItem setShowAddItem={setShowAddItem} />}
      </div>
    );
  }

  return (
    <div className="listed-items-page">
      <div
        className={`listed-items-filters box ${
          itemEditForm || showAddItem ? "blurred" : ""
        }`}
      >
        <div className="listed-items-filters-group">
          <p>Price:&nbsp;</p>
          <select
            name="pricefilter"
            id="pricefilter"
            value={filters.price}
            onChange={(e) => {
              setFilters((f) => ({ ...f, price: e.target.value }));
            }}
          >
            <option value="">All</option>
            <option value="low">Lowest to Highest Price</option>
            <option value="high">Highest to Lowest Price</option>
          </select>
        </div>
        <div className="listed-items-filters-group">
          <p>Discount:&nbsp;</p>
          <select
            name="discountfilter"
            id="discountfilter"
            value={filters.discount}
            onChange={(e) => {
              setFilters((f) => ({ ...f, discount: e.target.value }));
            }}
          >
            <option value="">All</option>
            <option value="10">10% - 20% OFF</option>
            <option value="20">20% - 30% OFF</option>
            <option value="30">30% - 40% OFF</option>
            <option value="40">40% - 50% OFF</option>
            <option value="50">50% or more OFF</option>
          </select>
        </div>
        <div className="listed-items-filters-group">
          <p>Condition:&nbsp;</p>
          <select
            name="conditonfilter"
            id="conditonfilter"
            value={filters.condition}
            onChange={(e) => {
              setFilters((f) => ({ ...f, condition: e.target.value }));
            }}
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </div>
        <div className="listed-items-filters-group">
          <p>Location:&nbsp;</p>
          <select
            name="locationfilter"
            id="locationfilter"
            value={filters.location}
            onChange={(e) => {
              setFilters((f) => ({
                ...f,
                location: e.target.value,
              }));
            }}
          >
            <option value="">All</option>
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
        <div className="listed-items-filters-group">
          <p>Return&nbsp;Days:&nbsp;</p>
          <select
            name="returnDaysfilter"
            id="returnDaysfilter"
            value={filters.returnDays}
            onChange={(e) => {
              setFilters((f) => ({ ...f, returnDays: e.target.value }));
            }}
          >
            <option value="">All</option>
            <option value="0">No Returns</option>
            <option value="7">1-7 Days</option>
            <option value="14">7-14 Days</option>
            <option value="30">14-30 Days</option>
            <option value="100">More than 30 Days</option>
          </select>
        </div>
        <div className="listed-items-filters-group">
          <p>Rating:&nbsp;</p>
          <select
            name="ratingfilter"
            id="ratingfilter"
            value={filters.rating}
            onChange={(e) => {
              setFilters((f) => ({ ...f, rating: e.target.value }));
            }}
          >
            <option value="">All</option>
            <option value="5">5 Star</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <div className="listed-items-filters-group">
          <p>Category:&nbsp;</p>
          <select
            name="categoryfilter"
            id="categoryfilter"
            value={filters.category}
            onChange={(e) => {
              setFilters((f) => ({ ...f, category: e.target.value }));
            }}
          >
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home_And_Garden">Home&nbsp;&&nbsp;Garden</option>
            <option value="Sports_And_Outdoors">
              Sports&nbsp;&&nbsp;Outdoors
            </option>
            <option value="Toys_And_Hobbies">Toys&nbsp;&&nbsp;Hobbies</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>
        <div className="listed-items-filters-group reset-filters-button">
          <button
            className="add-item"
            onClick={() => setShowAddItem((prev) => !prev)}
          >
            Add Item
          </button>
          <button
            onClick={() =>
              setFilters({
                price: "",
                discount: "",
                condition: "",
                location: "",
                returnDays: "",
                rating: "",
                category: "",
              })
            }
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div
        className={`listed-items-container ${
          itemEditForm || showAddItem ? "blurred" : ""
        }`}
      >
        {filterAndSortListedItems?.map((item, index) => {
          return (
            <div key={index} className="listed-item-content box box-hover">
              <div className="listed-item-content-group remove-padding box box-hover">
                <img src={itemImageAccessUrl + item.itemImage} alt="item" />
              </div>
              <div className="listed-item-content-group box-2">
                <div className="listed-item-content-title-holder">
                  <div className="listed-item-content-title">
                    <h1>{item.itemName}</h1>&nbsp;
                    <p>
                      ⭐{calculate_Rating(item.rating)}
                      <span className="side-small-text">
                        ({item.rating.length})
                      </span>
                    </p>
                  </div>
                  <p className="accent-1">
                    <FontAwesomeIcon icon={faFontAwesome} />
                    {item.category.replace(/_/g," ")}
                  </p>
                </div>
                <p>
                  Price:&nbsp;&#8377;
                  {calculate_Discount(item.price, item.discount)}
                  {item.discount > 0 ? (
                    <span className="org-price">&#8377;{item.price}</span>
                  ) : (
                    <></>
                  )}
                </p>
                <p>Discount:&nbsp;{item.discount}%</p>
                <p>Quantity:&nbsp;{item.quantity}</p>
                <p>Total Purchase Count:&nbsp;{item.bought}</p>
              </div>
              <div className="listed-item-content-group box-2">
                <p>Condition:&nbsp;{item.condition}</p>
                <p>Return Days:&nbsp;{item.returnDays}</p>
                <p>Location:&nbsp;{item.location}</p>
                <p>Delivery Option:&nbsp;{item.deliveryOption}</p>
                <p>Delivery Charge:&nbsp;{item.deliveryCharge}</p>
              </div>
              <div className="listed-item-content-group box-2">
                <p>Description:&nbsp;{item.description}</p>
                <p>Tags:&nbsp;{item.tags}</p>
                <p>
                  Listed on&nbsp;
                  <span className="accent-1">
                    {timestampToDate(item.created_at)}
                  </span>
                </p>
              </div>
              <div className="listed-item-content-group listed-item-group-buttons col-span-2 box-2">
                <button
                  onClick={() =>
                    setItemEditForm({
                      ...item,
                      oldItemImage: item.itemImage,
                    })
                  }
                  className="edit"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleItemDelete(
                      item.item_id,
                      item.category,
                      item.itemImage
                    )
                  }
                  className="delete"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {itemEditForm && <ItemEdit />}
      {showAddItem && <AddItem setShowAddItem={setShowAddItem} />}
    </div>
  );
}

export default ListedItems;
