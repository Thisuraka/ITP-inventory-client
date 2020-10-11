import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dash.css";

class Dash extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="topic">Inventory</div>
        <div className="tab" id="tab1">
          <Link to={"/inventory-management/doc-management"}>
           DOC 
          </Link>
        </div>
        <div className="tab" id="tab2">
          <Link to={"/inventory-management/feed-management"}>Feed</Link>
        </div>
        <div className="tab" id="tab3">
          <Link to={"/inventory-management/med-management"}>Med</Link>
        </div>
      </div>
    );
  }
}

export default Dash;
