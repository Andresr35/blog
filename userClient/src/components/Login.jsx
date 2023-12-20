import { useRef, useState } from "react";
import PropTypes from "prop-types";

const Login = ({ authenticated, setAuthenticated, url }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState("");
  const logIn = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      const result = await res.json();
      if (result.message == "Auth Passed") {
        localStorage.setItem("token", result.token);
        setLoginError(result.message);
        setAuthenticated(true);
      } else {
        setLoginError(result.message);
        setAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
    }
  };

  return (
    <div>
      {loginError && <p>{loginError}</p>}
      {!authenticated && (
        <form onSubmit={logIn}>
          <label>
            Username{" "}
            <input
              ref={usernameRef}
              type="text"
              name="username"
              placeholder="Username"
            />
          </label>
          <label>
            Password
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Enter Password"
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      )}
    </div>
  );
};

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Login;
