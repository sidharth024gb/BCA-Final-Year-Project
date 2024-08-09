import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useLocation, Link } from "react-router-dom";
import "./Products.css";

function Products() {
  const location = useLocation();
  const category = location.state;
  const {
    getProducts,
    products,
    itemImageAccessUrl,
    addToCart,
    authToken,
    calculate_Rating,
    user,
    calculate_Discount,
    searchTerm,
  } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    price: "",
    discount: "",
    condition: "",
    freeDelivery: false,
    returnDays: "",
    rating: "",
  });
  const stopwords = [
    "and",
    "with",
    "the",
    "a",
    "an",
    "of",
    "to",
    "in",
    "for",
    "on",
    "at",
  ];

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  useEffect(() => {
    if (category === "Search" && products) {
      const searchTermsArray = searchTerm
        .split(" ")
        .map((term) => term.trim().toLowerCase())
        .filter((term) => !stopwords.includes(term));

      let filtered = Object.keys(products).reduce((filteredData, category) => {
        const filteredCategory = products[category].filter((item) => {
          const itemNameArrays = item.itemName
            .split(" ")
            .map((name) => name.trim().toLowerCase());
          const itemTagsArray = item.tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

          return searchTermsArray.some(
            (term) =>
              itemNameArrays.some((name) => name.includes(term)) ||
              itemTagsArray.some((tag) => tag.includes(term))
          );
        });

        return filteredData.concat(filteredCategory);
      }, []);

      if (authToken && user) {
        filtered = filtered.filter(
          (product) =>
            product.location === user.location ||
            product.deliveryOption === "domestic"
        );
      }

      if (searchTermsArray.length > 1) {
        for (const term of searchTermsArray) {
          filtered = filtered.filter((item) => {
            const itemNameArrays = item.itemName
              .split(" ")
              .map((name) => name.trim().toLowerCase());
            const itemTagsArray = item.tags
              .split(",")
              .map((tag) => tag.trim().toLowerCase());

            return (
              itemNameArrays.some((name) => name.includes(term)) ||
              itemTagsArray.some((tag) => tag.includes(term))
            );
          });
        }
      }

      if (searchTerm) {
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    } else if (products && products[category]) {
      let filtered = products[category];
      if (authToken && user) {
        filtered = filtered.filter(
          (product) =>
            product.location === user.location ||
            product.deliveryOption === "domestic"
        );
      }
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }

    return setFilters({
      price: "",
      discount: "",
      condition: "",
      freeDelivery: false,
      returnDays: "",
      rating: "",
    });
  }, [category, products, authToken, user, searchTerm]);

  const filterAndSortProducts = useMemo(() => {
    let dataToFilter = [...filteredProducts];

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

    if (filters.freeDelivery) {
      dataToFilter = dataToFilter.filter((item) => item.deliveryCharge === 0);
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
        return totalRating / item.rating.length >= filters.rating;
      });
    }

    return dataToFilter;
  }, [filters, filteredProducts]);

  return (
    <div className="products-page">
      <div className="products-filters-container box-4">
        <div className="products-filters gap-10">
          <div className="products-title flex-center">
            <h2>{category.replace(/_/g, " ")}</h2>
          </div>
          <div className="products-filters-group flex-between">
            <h3>Filters</h3>
            <button
              className="btn-accent-2"
              onClick={() =>
                setFilters({
                  price: "",
                  discount: "",
                  condition: "",
                  freeDelivery: false,
                  returnDays: "",
                  rating: "",
                })
              }
            >
              Reset Filters
            </button>
          </div>
          <div className="products-filters-group flex-end">
            <div className="free-delivery-checkbox flex-center">
              <input
                type="checkbox"
                name="freedelivery-filter"
                id="freedelivery-filter"
                checked={filters.freeDelivery}
                onChange={(e) => {
                  setFilters((f) => ({ ...f, freeDelivery: !f.freeDelivery }));
                }}
              />
              <label htmlFor="freedelivery-filter">Free Delivery</label>
            </div>
          </div>
          <div className="products-filters-group flex-between">
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
          <div className="products-filters-group flex-between">
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
          <div className="products-filters-group flex-between">
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
          <div className="products-filters-group flex-between">
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
              <option value="4">4 Stars and above</option>
              <option value="3">3 Stars and above</option>
              <option value="2">2 Stars and above</option>
              <option value="1">1 Star and above</option>
            </select>
          </div>
          <div className="products-filters-group flex-between">
            <p>Return days:&nbsp;</p>
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
        </div>
      </div>
      {filterAndSortProducts.length === 0 && (
        <div className="pad-10 flex-1">
          <div className="empty-page box ">
            <h1>🍃No Products Found</h1>
          </div>
        </div>
      )}
      {filterAndSortProducts.length > 0 && (
        <div className="products-container box-1">
          {filterAndSortProducts.map((product, index) => (
            <Link
              to="/card"
              state={product}
              key={product.item_id}
              className="product-card-holder box-4 remove-padding box-hover-2"
            >
              <div className="product-card">
                <div className="product-card-image box remove-padding box-radius-0">
                  <img
                    src={itemImageAccessUrl + product.itemImage}
                    alt={product.name}
                  />
                </div>{
                  product.discount>0&&
                <span className="discount">{product.discount}% OFF</span>
                }
                <div className="product-card-content box-1">
                  <div className="product-card-title flex-start">
                    <h3>{product.itemName}</h3>
                    <p>
                      ⭐{calculate_Rating(product.rating)}
                      <span className="side-small-text">
                        ({product.rating.length})
                      </span>
                    </p>
                  </div>
                  <div className="product-card-description flex-end flex-col">
                    <p>
                      Price:&nbsp;&#8377;
                      {calculate_Discount(product.price, product.discount)}
                      {product.discount > 0 ? (
                        <span className="org-price">
                          &#8377;{product.price}
                        </span>
                      ) : (
                        <></>
                      )}
                    </p>
                    <p>
                      {product.deliveryCharge === 0 ? (
                        <span className="second">Free Delivery</span>
                      ) : (
                        <span>
                          Delivery Charge:&nbsp;&#8377;{product.deliveryCharge}
                        </span>
                      )}
                    </p>
                    <p>
                      Condition:&nbsp;
                      <span className="accent-1">{product.condition}</span>
                    </p>
                    <p>Return Days:&nbsp;{product.returnDays}</p>
                    <button
                      className="btn-third"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(
                          product.item_id,
                          product.category,
                          product.seller
                        );
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
