import React from "react";
import "./feed.css";
const axios = require("axios").default;
const userL = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const deleteUrl = "http://localhost:3200/api/branch/";
const editUrl = "";
const deleteData = async (id) => {
  console.log(id);
  await axios.delete(deleteUrl + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const Feed = ({ branchId, fullAdress, latitude, longitude, name, phone }) => {
  return (
    <div className="div-feed">
      {userL.role}
      <div style={{ padding: "10px 5px", fontWeight: "bold" }}>{name}</div>
      <div style={{ padding: "10px 5px", fontWeight: "bold" }}>
        {fullAdress}
      </div>
      <div style={{ padding: "10px 5px", fontWeight: "bold" }}>{latitude}</div>
      <div style={{ padding: "10px 5px", fontWeight: "bold" }}>{longitude}</div>
      <div style={{ padding: "10px 5px", fontWeight: "bold" }}>{phone}</div>
      {userL.role === "owner" ? (
        <button style={{padding:"15px", background:"red",color:"white"}}
          onClick={() => {
            deleteData(branchId);
          }}
        >
          Delete
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Feed;
