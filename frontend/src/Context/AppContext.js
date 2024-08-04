import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children, navigate }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [registrationForm, setRegistrationForm] = useState({
    profileImage: "",
    userName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    bio: "",
    location: "",
    address: "",
    deliverOption: "",
    returnDays: "",
    paymentDetails: {
      upi: "",
      bank: {
        accountNumber: "",
        bankName: "",
        ifscCode: "",
      },
    },
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState();
  const profileImageAccessUrl = "http://localhost:8000/profileImages/";
  const itemImageAccessUrl = "http://localhost:8000/itemImages/";
  const [itemAddForm, setItemAddForm] = useState({
    itemImage: "",
    itemName: "",
    price: "",
    discount: "",
    quantity: "",
    description: "",
    tags: "",
    location: "",
    category: "",
    condition: "",
    returnDays: "",
    deliveryOption: "",
    deliveryCharge: "",
  });
  const [itemEditForm, setItemEditForm] = useState(null);
  const [profileEditForm, setProfileEditForm] = useState(null);
  const [products, setProducts] = useState();
  const [filteredListedItems, setfilteredListedItems] = useState();
  const [filteredCartItems, setFilteredCartItems] = useState();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [isCancel, setIsCancel] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [returnOrder, setReturnOrder] = useState(null);
  const [orders, setOrders] = useState({
    items: [],
    paymentOption: "",
    deliveryAddress: "",
  });
  const [orderStatusFilter, setOrderStatusFilter] = useState(null);
  const [bestDeals, setBestDeals] = useState({});
  const [bestSellers, setBestSellers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [features, setFeatures] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    getProducts();
    getHomePageContent();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (authToken) {
      getUser();
      filterListedItems();
      filterCart();
    }
  }, [authToken]);

  function changeSearchVisiblity() {
    setSearchVisible(!searchVisible);
  }

  function Logout() {
    navigate("/");
    localStorage.removeItem("authToken");
    setAuthToken("");
    setUser(null);
  }

  function filterListedItems() {
    setfilteredListedItems(
      (f) =>
        (f =
          products && user
            ? user.listedItems
                .map((listedItem) => {
                  const categoryItems = products[listedItem.category] || [];
                  return categoryItems.find(
                    (product) => product.item_id === listedItem.item_id
                  );
                })
                .filter((item) => item)
            : [])
    );
  }

  function filterCart() {
    setFilteredCartItems(
      (c) =>
        (c =
          products && user
            ? user.cart
                .map((cartItem) => {
                  const itemCategory = products[cartItem.category] || [];
                  return itemCategory.find(
                    (item) => item.item_id === cartItem.item_id
                  );
                })
                .filter((item) => item)
            : [])
    );
  }

  function timestampToDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-GB", options);
  }

  function handleOrderStatusFilter(orders) {
    if (!orders) {
      return orders;
    }

    let ordersToFilter = [...orders];

    if (orderStatusFilter) {
      ordersToFilter = ordersToFilter.filter(
        (order) =>
          order.status === orderStatusFilter ||
          order.returnStatus === orderStatusFilter
      );
    }

    return ordersToFilter;
  }

  async function getProducts() {
    await axios
      .get("http://localhost:8000/get/products")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
          console.log("products", res.data.products);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getHomePageContent() {
    try {
      console.log("function pikachu");
      const response = await axios.get(
        "http://localhost:8000/homepage/content"
      );
      setBestSellers(response.data.bestSellers);
      setBestDeals(response.data.bestDeals);
      setFeatures(response.data.features);
      // console.log("sellers", response.data);

      if (authToken) {
        const response2 = await axios.post(
          "http://localhost:8000/homepage/recommendations",
          {},
          {
            headers: {
              authToken: authToken,
            },
          }
        );

        if (response2.data.success) {
          setRecommendations(response2.data.products);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getUser() {
    console.log("function called");
    await axios
      .post(
        "http://localhost:8000/get/user",
        {},
        {
          headers: {
            authToken: authToken,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleRating(id, rateItem, category, rating) {
    if (!authToken) {
      return alert("Please login or signup to give Rating");
    }

    axios
      .put(
        "http://localhost:8000/rating",
        { id, rateItem, category, rating },
        {
          headers: {
            authToken: authToken,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          if (rateItem === "user") {
            getUser();
          }
          if (rateItem === "product") {
            getProducts();
          }
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function userPreview(trader_id) {
    let traderData;
    await axios
      .post("http://localhost:8000/trader/get", { trader_id })
      .then((res) => {
        if (res.data.success) {
          traderData = res.data.traderData;
        } else if (res.status === 404) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return traderData;
  }

  async function updateProfile(e) {
    e.preventDefault();

    const profileToUpdate = new FormData();
    for (const key in profileEditForm) {
      if (key === "paymentDetails") {
        profileToUpdate.append(key, JSON.stringify(profileEditForm[key]));
      } else {
        profileToUpdate.append(key, profileEditForm[key]);
      }
    }

    if (
      profileEditForm.userName &&
      profileEditForm.phone &&
      profileEditForm.age &&
      profileEditForm.gender &&
      profileEditForm.location &&
      profileEditForm.address &&
      profileEditForm.paymentDetails.upi &&
      profileEditForm.paymentDetails.bank.accountNumber &&
      profileEditForm.paymentDetails.bank.bankName &&
      profileEditForm.paymentDetails.bank.ifscCode
    ) {
      await axios
        .put("http://localhost:8000/profile/update", profileToUpdate, {
          headers: {
            authToken: authToken,
          },
        })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            getUser();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill all the fields");
    }
  }

  async function deleteAccount() {
    await axios
      .delete("http://localhost:8000/account/delete", {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          localStorage.removeItem("authToken");
          setAuthToken(null);
          setUser(null);
          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function placeOrders(e) {
    e.preventDefault();
    if (
      orders.items.length > 0 &&
      orders.deliveryAddress &&
      orders.paymentOption
    ) {
      if (orders.paymentOption === "online") {
        await axios
          .post("http://localhost:8000/placeOrders/online/create", orders, {
            headers: {
              authToken: authToken,
            },
          })
          .then((res) => {
            const { orderDetails } = res.data;
            if (res.data.success) {
              const options = {
                // key: "",
                amount: orderDetails.amount,
                currency: orderDetails.currency,
                name: "Orgin Trade",
                description: "Testing Transactions",
                image:
                  "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
                order_id: orderDetails.id,
                handler: async (response) => {
                  try {
                    await axios
                      .post(
                        "http://localhost:8000/placeOrders/online/verify",
                        { response, orders },
                        {
                          headers: {
                            authToken: authToken,
                          },
                        }
                      )
                      .then(async (res) => {
                        if (res.data.success) {
                          alert(res.data.message);
                          await getUser();
                        } else {
                          alert(res.data.message);
                        }
                      });
                  } catch (err) {
                    console.log(err);
                  }
                },
                prefill: {
                  name: user.userName,
                  email: user.email,
                  contact: user.phone,
                },
                theme: {
                  color: "#1B3A57",
                },
              };

              const rzp1 = new window.Razorpay(options);
              rzp1.open();
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (orders.paymentOption === "cash") {
        await axios
          .post("http://localhost:8000/placeOrders/cash", orders, {
            headers: {
              authToken: authToken,
            },
          })
          .then(async (res) => {
            if (res.data.success) {
              alert(res.data.message);
              await getUser();
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      getUser();
    } else {
      alert("Please fill all the fields");
    }
  }

  function cancelOrder(e, cancelDetails) {
    e.preventDefault();

    if (!cancelDetails.cancelReason) {
      return alert("Please provide Reason");
    }
    axios
      .put("http://localhost:8000/order/cancel", cancelDetails, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          getUser();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateOrderStatus(e) {
    if (e) {
      e.preventDefault();
    }
    axios
      .put("http://localhost:8000/order/orderStatus", orderStatus, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          getUser();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deliveryConfirmation(order_id, trader_id) {
    axios
      .put(
        "http://localhost:8000/order/delivered",
        { order_id, trader_id },
        {
          headers: {
            authToken: authToken,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          getUser();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function returnRequest(e) {
    e.preventDefault();

    if (!returnOrder.returnReason) {
      return alert("Please provide a reason");
    }
    axios
      .put("http://localhost:8000/order/return/request", returnOrder, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          getUser();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateReturnStatus(dataToSend) {
    if (!dataToSend.rejectionReason) {
      return alert("Please provide a reason");
    }

    axios
      .put("http://localhost:8000/order/return/status", dataToSend, {
        headers: {
          authToken: authToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          getUser();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addToCart(item_id, category, seller) {
    if (authToken) {
      axios
        .put(
          "http://localhost:8000/Cart/add",
          { item_id, category, seller },
          {
            headers: {
              authToken: authToken,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            getUser();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please Login or Sign up to purchase a product");
    }
  }

  function removeFromCart(item_id) {
    axios
      .put(
        "http://localhost:8000/Cart/remove",
        { item_id },
        {
          headers: {
            authToken: authToken,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          getUser();
          filterCart();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleItemQuantityChange(item_id, quantityLimit, operation) {
    axios
      .put(
        "http://localhost:8000/Cart/quantity/change",
        {
          item_id,
          quantityLimit,
          operation,
        },
        {
          headers: {
            authToken: authToken,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          getUser();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addItem(e) {
    e.preventDefault();

    const itemToAdd = new FormData();
    for (const key in itemAddForm) {
      if (itemAddForm.hasOwnProperty(key)) {
        itemToAdd.append(key, itemAddForm[key]);
      }
    }

    if (
      itemAddForm.itemImage &&
      itemAddForm.itemName &&
      itemAddForm.price >= 0 &&
      itemAddForm.quantity >= 1 &&
      itemAddForm.description &&
      itemAddForm.deliveryCharge >= 0 &&
      itemAddForm.tags &&
      itemAddForm.category &&
      itemAddForm.condition
    ) {
      axios
        .put("http://localhost:8000/item/add", itemToAdd, {
          headers: {
            authToken: authToken,
          },
        })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            getProducts();
            getUser();
            filterListedItems();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill out all required fields");
    }
  }

  async function updateItem(e) {
    e.preventDefault();

    const itemToUpdate = new FormData();
    for (const key in itemEditForm) {
      if (itemEditForm.hasOwnProperty(key)) {
        itemToUpdate.append(key, itemEditForm[key]);
      }
    }

    if (
      itemEditForm.itemName &&
      itemEditForm.price >= 0 &&
      itemEditForm.quantity >= 1 &&
      itemEditForm.description &&
      itemEditForm.tags &&
      itemEditForm.location &&
      itemEditForm.category &&
      itemEditForm.condition &&
      itemEditForm.returnDays >= 0 &&
      itemEditForm.deliveryOption &&
      itemEditForm.deliveryCharge >= 0
    ) {
      await axios
        .put("http://localhost:8000/item/update", itemToUpdate, {
          headers: {
            authToken: authToken,
          },
        })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            getProducts();
            getUser();
            filterListedItems();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill out all fields");
    }
  }

  async function handleItemDelete(item_id, category, image) {
    await axios
      .delete("http://localhost:8000/item/delete", {
        headers: {
          authToken: authToken,
        },
        data: { item_id: item_id, category: category, image: image },
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          getProducts();
          getUser();
          filterListedItems();
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFormSubmit(e, form) {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in registrationForm) {
      if (key === "paymentDetails") {
        formDataToSend.append(key, JSON.stringify(registrationForm[key]));
      } else {
        formDataToSend.append(key, registrationForm[key]);
      }
    }

    if (form === "Signup") {
      if (
        registrationForm.userName &&
        registrationForm.email &&
        registrationForm.phone &&
        registrationForm.age &&
        registrationForm.gender &&
        registrationForm.location &&
        registrationForm.address &&
        registrationForm.password &&
        registrationForm.paymentDetails.upi &&
        registrationForm.paymentDetails.bank.accountNumber &&
        registrationForm.paymentDetails.bank.bankName &&
        registrationForm.paymentDetails.bank.ifscCode
      ) {
        if (registrationForm.password === registrationForm.confirmPassword) {
          axios
            .post("http://localhost:8000/Signup", formDataToSend, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.success) {
                localStorage.setItem("authToken", res.data.token);
                setAuthToken(res.data.token);
                alert(res.data.message);
                navigate("/");
              } else {
                alert(res.data.message);
              }
            })
            .catch((err) => {
              console.error(err);
              if (err.response) {
                console.error(err.response.data);
                console.error(err.response.status);
                console.error(err.response.headers);
              } else {
                console.error(err.message);
              }
            });
        } else {
          alert("Password and Confirm Password do not match");
        }
      } else {
        alert("Please fill all the required fields");
      }
    }

    if (form === "Login") {
      if (registrationForm.email && registrationForm.password) {
        axios
          .post("http://localhost:8000/Login", registrationForm)
          .then((res) => {
            if (res.data.success) {
              localStorage.setItem("authToken", res.data.token);
              setAuthToken(res.data.token);
              alert(res.data.message);
              navigate("/");
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.error(err);
            if (err.response) {
              console.error(err.response.data);
              console.error(err.response.status);
              console.error(err.response.headers);
            } else {
              console.error(err.message);
            }
          });
      } else {
        alert("Please fill all the required fields");
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        handleItemQuantityChange,
        setOrders,
        registrationForm,
        setRegistrationForm,
        handleFormSubmit,
        getUser,
        getProducts,
        addItem,
        authToken,
        changeSearchVisiblity,
        searchVisible,
        itemAddForm,
        setItemAddForm,
        handleItemDelete,
        user,
        profileImageAccessUrl,
        filterListedItems,
        filteredCartItems,
        filterCart,
        timestampToDate,
        filteredListedItems,
        itemImageAccessUrl,
        updateItem,
        itemEditForm,
        setSearchTerm,
        searchTerm,
        setItemEditForm,
        updateProfile,
        profileEditForm,
        setProfileEditForm,
        deleteAccount,
        navigate,
        Logout,
        placeOrders,
        isCheckingOut,
        setIsCheckingOut,
        cancelOrder,
        isCancel,
        setIsCancel,
        orderStatus,
        setOrderStatus,
        updateOrderStatus,
        deliveryConfirmation,
        returnOrder,
        setReturnOrder,
        returnRequest,
        updateReturnStatus,
        userPreview,
        handleRating,
        isRating,
        setIsRating,
        orderStatusFilter,
        setOrderStatusFilter,
        handleOrderStatusFilter,
        bestDeals,
        bestSellers,
        getHomePageContent,
        recommendations,
        features,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
