import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import "./Login.css";
import logo from "../../Assets/trading.png";

function Login() {
  const { adminLogin, setLoginForm } = useContext(AppContext);
  return (
    <div className="login-page flex-center ">
      <div className="login-form-container box flex-center flex-col gap-20">
        <img
          src={logo}
          alt="logo"
          className="website-logo box remove-padding "
        />
        <h1>
          <span className="accent-1">Trade</span>Connect
        </h1>
        <form className="flex-col gap-20"
          onSubmit={(e) => adminLogin(e)}>
          <div className="login-form-group flex-center">
            <p> E-mail:&nbsp;</p>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="flex-1 pad-5"
              onChange={(e) => {
                setLoginForm((form) => ({ ...form, email: e.target.value }));
              }}
              required
            />
          </div>
          <div className="login-form-group flex-center">
            <p>Password:&nbsp;</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="flex-1 pad-5"
              onChange={(e) => {
                setLoginForm((form) => ({ ...form, password: e.target.value }));
              }}
              required
            />
          </div>

          <button type="submit" className="btn-accent-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
