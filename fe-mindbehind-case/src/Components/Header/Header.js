import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./header.css";
const Header = ({ history, isLogged }) => {
  const handleClick = () => {
    history.push("/");
    isLogged(false);

    localStorage.clear();
  };
  return (
    <nav>
      <div className="div-header">
        <div className="div-svg" onClick={() => history.push("/")}>
        logo
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <NavLink exact to="/" activeClassName="active">
          <div style={{marginRight:"10px"}} >Home</div>
           
          </NavLink>
          <NavLink exact to="/explore" activeClassName="active">
           <div style={{marginRight:"10px"}} >Explore</div>
          </NavLink>
          <button className="button-header" onClick={handleClick}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
