import { useRef, useState } from "react";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState("");
  const logIn = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("http://localhost:3000/api/user/login", {
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
      } else {
        setLoginError(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={logIn}>
        {loginError && <p>{loginError}</p>}
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
    </div>
  );
};

export default Login;
