import React from "react";
import Feed from "../Feed/Feed";
const axios = require("axios").default;

const baseURL = "http://localhost:3200/api/branch/all-branch";
const userL=localStorage.getItem('user')
class Feeds extends React.Component {
  state = {
    feeds: null,
    user:userL
  };
  async componentDidMount() {
    this.createGet();
  }
  createGet = async () => {
    const token = localStorage.getItem("token");

    await axios
      .get(baseURL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const feeds = response.data;
          this.setState({ feeds });
        }
      })
      .catch((err) => {
        alert("Kullanici adi veya sifre hatali.");
      });
  };
  render() {
    const { feeds,user } = this.state;
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "0 10px",
        }}
      >
        {feeds && feeds.map(({ ...f }) => <Feed key={f.branchId} {...f} {...user} >  </Feed>)}
      </div>
    );
  }
}

export default Feeds;
