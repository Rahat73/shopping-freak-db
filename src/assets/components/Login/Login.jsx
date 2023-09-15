// import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [show, setshow] = useState(false);
  const [error, setError] = useState("");
  const { signIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  console.log(from);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    setUser("");

    signIn(email, password)
      .then((result) => {
        // Signed in
        const loggedUser = result.user;
        form.reset();
        setUser(loggedUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type={show ? "text" : "password"} name="password" required />
          <p onClick={() => setshow(!show)}>
            {show ? <span>Hide</span> : <span>Show</span>}
          </p>
        </div>
        <p className="error-msg">{error}</p>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <div className="divider">
        <hr className="line" />
        <span>or</span>
        <hr className="line" />
      </div>
      <p>
        New to Shopping Freak?
        <Link to="/signup" className="new-account">
          Create new account.
        </Link>
      </p>
      <button className="google-btn">
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default Login;
