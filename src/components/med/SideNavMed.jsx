import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sideNav.css";

class SideNavMed extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="sideNav">
          <Link to="/inventory-management">Dashboard</Link>
          
          <br />
          <Link to="/inventory-management/med-management/list">Med List</Link>
          <br />
          <Link to="/inventory-management/med-management/add-med">Add Med Entry</Link>
          <br />
          <br />
          
          
        </div>
      </div>
    );
  }
}

export default SideNavMed;
