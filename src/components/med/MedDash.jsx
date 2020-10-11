import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Dash.css";

class MedDash extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="topic">Med Management</div>
        <div className="tab" id="tab1">
          <Link to={"/inventory-management/med-management/list"}>
           Meds List
          </Link>
        </div>
        <div className="tab" id="tab2">
          <Link to={"/inventory-management/med-management/add-med"}>Add Med Details</Link>
        </div>
      </div>
    );
  }
}

export default MedDash;
