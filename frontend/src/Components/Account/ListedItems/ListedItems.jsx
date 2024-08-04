import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../../../Context/AppContext";
import AddItem from "./AddItem";
import ItemEdit from "./ItemEdit";

function ListedItems() {
  const {
    filteredListedItems,
    itemImageAccessUrl,
    handleItemDelete,
    itemEditForm,
    setItemEditForm,
    timestampToDate,
  } = useContext(AppContext);
  const [filters, setFilters] = useState({
    price: "",
    discount: "",
    condition: "",
    location: "",
    returnDays: "",
    rating: "",
  });

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
          (filters.rating === "5" ? avgRating === 5 : avgRating >= parseInt(filters.rating))
        );
      });
    }

    return dataToFilter;
  }, [filters, filteredListedItems]);

  return (
    <div>
      <h1>Listed Items</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
          <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
          <option value="Daman and Diu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
          <option value="Ladakh">Ladakh</option>
        </select>
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
        <button
          onClick={() =>
            setFilters({
              price: "",
              discount: "",
              condition: "",
              location: "",
              returnDays: "",
              rating: "",
            })
          }
        >
          Reset Filters
        </button>
      </div>
      {filterAndSortListedItems.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.itemName}</h1>
            <p>{item.item_id}</p>
            <p>{item.category}</p>
            <p>{item.condition}</p>
            <p>{item.description}</p>
            <p>{item.tags}</p>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
            <p>{item.location}</p>
            <p>{item.returnDays}</p>
            <p>{timestampToDate(item.created_at)}</p>
            <p>{item.deliveryOption}</p>
            <p>{item.bought}</p>
            <img
              src={itemImageAccessUrl + item.itemImage}
              alt=""
              style={{
                width: "100px",
                height: "100px",
                display: "block",
              }}
            />
            <button
              onClick={() =>
                setItemEditForm({ ...item, oldItemImage: item.itemImage })
              }
            >
              Edit
            </button>
            <button
              onClick={() =>
                handleItemDelete(item.item_id, item.category, item.itemImage)
              }
            >
              Delete
            </button>
          </div>
        );
      })}
      {itemEditForm && <ItemEdit />}
      <AddItem />
    </div>
  );
}

export default ListedItems;
