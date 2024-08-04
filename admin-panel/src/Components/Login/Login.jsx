import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function Login() {
  const { adminLogin, setLoginForm } = useContext(AppContext);
  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={(e) => adminLogin(e)}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => {
            setLoginForm((form) => ({ ...form, email: e.target.value }));
          }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setLoginForm((form) => ({ ...form, password: e.target.value }));
          }}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
