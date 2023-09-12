import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3005/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.status === true) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/login");
      toast.success("account Created sucessfully")
    } else {
      toast.error("User already exists..")
    }
  };
  return (
    <div className="container my-3 mt-4">
      <h2 className="my-4">Create an account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <h4>Name</h4>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credential.name}
            name="name"
            onChange={onChange}
            required
            style={{ border: "2px solid #a8ada9", maxWidth: "25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <h4>Email address</h4>
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credential.email}
            name="email"
            onChange={onChange}
            required
            style={{ border: "2px solid #a8ada9", maxWidth: "25rem" }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <h4>Password</h4>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credential.password}
            name="password"
            onChange={onChange}
            required
            minLength={6}
            style={{ border: "2px solid #a8ada9", maxWidth: "25rem" }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
