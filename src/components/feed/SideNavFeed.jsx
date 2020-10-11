import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sideNavLeaves.css";

class SideNavFeed extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="sideNav">
          <Link to="/inventory-management">Dashboard</Link>
          
          <br />
          <Link to="/inventory-management/feed-management/list">Feed List</Link>
          <br />
          <Link to="/inventory-management/feed-management/add-feed">Add Feed Entry</Link>
          <br />
          <br />
          
          
        </div>
      </div>
    );
  }
}

export default SideNavFeed;
