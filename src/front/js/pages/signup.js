import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const sendData = () => {
    createUser(user);
  };

  const passwordOk = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setUser({ ...user, password: password });
      sendData();
    } else {
      alert("Passwords don't match");
    }
  };

  const createUser = (info) => {
    fetch(process.env.BACKEND_URL + "/api/signup", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("User already exist");
        return resp.json();
      })
      .then((data) => {
        alert("User created");
        navigate("/login");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container text-center my-5">
      <h2>Create a new user</h2>
      <form
        onSubmit={(e) => {
          passwordOk(e);
        }}
      >
        <div className="mb-3 row justify-content-center">
          <label className="form-label">Email address</label>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              } //capturamos los valores introducidos
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <label className="form-label">Create password</label>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <label className="form-label">Repeat password</label>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(event) => setRepeatPassword(event.target.value)}
            ></input>
          </div>
        </div>
        <button className="btn btn-outline-danger text-dark">
          Create user
        </button>
      </form>
    </div>
  );
};
