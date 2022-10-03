import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    if (password != "" && email != "") {
      actions.login(email, password);
      navigate("/private");
    }
    // actions.login(email, password);
  };

  return (
    <div className="container text-center my-5">
      <h2>Start session</h2>
      <form onSubmit={loginSubmit}>
        <div className="mb-3 row justify-content-center">
          <label className="form-label">Email address</label>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(event) => setEmail(event.target.value)} //capturamos los valores introducidos
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <label className="form-label">Enter your password</label>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
        </div>
        <button className="btn btn-outline-danger text-dark">Login</button>
      </form>
    </div>
  );
};
