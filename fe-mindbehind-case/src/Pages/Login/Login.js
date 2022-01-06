import React from "react";
import jwtDecode from "jwt-decode";

import "./login.css";

const axios = require("axios").default;
const baseURL = "http://localhost:3200/api/authentication/login";
class Login extends React.Component {
  state = {
    email: "",
    pwd: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.createPost();
  };
  createPost = async () => {
    await axios
      .post(baseURL, {
        username: this.state.email,
        password: this.state.pwd,
      })
      .then(async (response) => {
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(jwtDecode(response.data.token)));
          this.props.isLogin(true);
        } else if (response.status === 401)
          alert("Kullanici adi veya sifre yanlis");
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        alert("Kullanici adi veya sifre hatali.");
      });
  };
  render() {
    return (
      <div className="div-login">
        <div className="div-login-logo">
          Logo
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="email..."
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="pwd"
              placeholder="password..."
              onChange={this.handleChange}
            />
            <button onSubmit={this.handleSubmit}>Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
