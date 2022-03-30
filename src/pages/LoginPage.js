import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="register-parent">
      <div className="row">
        <div className="col-md-4">
          <div className="login-form">
            <h2>Login</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="my-3">LOGIN</button>
          </div>
        </div>
        <div className="col-md-5">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_oftwajlo.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
