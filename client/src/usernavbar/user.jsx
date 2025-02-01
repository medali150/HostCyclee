import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

const User = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const toggleMenu = () => {
    const menu = document.querySelector(".action_menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  };

  const showSection = (section) => {
    setActiveSection(section);
    document.querySelector(".action_menu").style.display = "none";
  };

  return (
    <div>
      {/* Navbar */}
      <ul className="nav justify-content-center fixed-top">
        <li
          className="nav-item col-10"
          style={{
            boxShadow: "0px 0px 20px black",
            borderBottomRightRadius: "50px",
            borderBottomLeftRadius: "50px",
            fontSize: "25px",
            textAlign: "center",
            fontWeight: "bolder",
            backgroundColor: "rgba(20, 20, 58, 0.562)",
          }}
        >
          MY-Chat
        </li>
        <span id="action_menu_btn" onClick={toggleMenu}>
          <i id="menu" className="fas fa-bars"></i>
        </span>
        <div className="action_menu">
          <ul>
            <li onClick={() => showSection("profile")}>Profile</li>
            <li onClick={() => showSection("allUsers")}>All Users</li>
            <li onClick={() => showSection("friends")}>My Friends</li>
            <li onClick={() => showSection("friendRequests")}>
              Friend Requests
            </li>
            <li onClick={() => showSection("pendingRequests")}>
              Pending Requests
            </li>
            <li>
                <a href="/Chat">
              Messenger</a>
            </li>
            <li onClick={() => alert("Logged out!")}>LogOut</li>
          </ul>
        </div>
      </ul>

      {/* Content */}
      <div style={{ marginTop: "70px" }}>
        {activeSection === "profile" && <Profile />}
        {activeSection === "allUsers" && <Placeholder title="All Users" />}
        {activeSection === "friends" && <Placeholder title="My Friends" />}
        {activeSection === "friendRequests" && (
          <Placeholder title="Friend Requests" />
        )}
        {activeSection === "pendingRequests" && (
          <Placeholder title="Pending Requests" />
        )}
      </div>
    </div>
  );
};

// Profile Component
const Profile = () => {
  return (
    <div className="col-12 col-lg-10 offset-lg-1">
      <div style={{ textAlign: "center" }}>
        <img
          style={{
            backgroundColor: "white",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "5px solid white",
            boxShadow: "0px 0px 10px 5px gray",
          }}
          alt="profile"
        />
      </div>
      <br />
      <h2
        style={{
          textShadow: "0px 0px 5px white",
          fontWeight: "bolder",
          borderBottom: "1px dashed rgba(119, 119, 119, 0.726)",
          textAlign: "center",
          paddingBottom: "3px",
        }}
      >
        Demo
      </h2>
      <div>
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            boxShadow: "0px 0px 10px gray",
            borderRadius: "10px",
          }}
        >
          <h3 style={{ textAlign: "center", textShadow: "0px 0px 5px white" }}>
            Info
          </h3>
          <ul className="list-group">
            <li className="list-group-item list-group-item-info text-center">
              Email: demo@example.com
            </li>
            <br />
            <li className="list-group-item list-group-item-info text-center">
              Phone: 123-456-7890
            </li>
            <br />
            <li className="list-group-item list-group-item-info text-center">
              DOB: Jan 1, 2000
            </li>
            <br />
            <li className="list-group-item list-group-item-info text-center">
              Address: 123 Demo Street
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Placeholder Component for Other Sections
const Placeholder = ({ title }) => {
  return (
    <div className="col-12 col-lg-10 offset-lg-1">
      <h2 style={{ textAlign: "center" }}>{title} Section</h2>
    </div>
  );
};

export default User;
