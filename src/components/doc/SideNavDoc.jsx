import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sideNav.css";

class SideNavDoc extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="sideNav">
          <Link to="/inventory-management">Dashboard</Link>
          
          <br />
          <Link to="/inventory-management/doc-management/list">DOC List</Link>
          <br />
          <Link to="/inventory-management/doc-management/add-doc">Add DOC Entry</Link>
          <br />
          <Link to="/inventory-management/doc-management/report">DOC report</Link>
          <br />
          <br />
          
        </div>
      </div>
    );
  }
}

export default SideNavDoc;
