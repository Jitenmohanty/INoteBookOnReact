import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
    const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
        setLoader(true);

    const response = await fetch("https://inotebookreact-7egp.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
          setLoader(false);

      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      toast.success("you Sucessfully LogIn to your account...");
    } else {
          setLoader(false);

      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="container my-3">
      <h2>Login to continue to iNoteBook</h2>
  {
    loader ? <div className="container mt-5 text-center">
        <h2>Loading...</h2>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>:<form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <h4>Email address</h4>
          </label>
          <input
            style={{ border: "2px solid #a8ada9", maxWidth: "25rem" }}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credential.email}
            name="email"
            onChange={onChange}
            required
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
            style={{ border: "2px solid #a8ada9", maxWidth: "25rem" }}
            type="password"
            className="form-control"
            id="password"
            value={credential.password}
            name="password"
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
  }
      
    </div>
  );
};

export default Login;
