import React from "react";
import { Link } from "react-router-dom";
import "../../styles/leaveDash.css";

class FeedDash extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="topic">Feed Management</div>
        <div className="tab" id="tab1">
          <Link to={"/inventory-management/feed-management/list"}>
           Feed List
          </Link>
        </div>
        <div className="tab" id="tab2">
          <Link to={"/inventory-management/feed-management/add-feed"}>Add Feed Details</Link>
        </div>
      </div>
    );
  }
}

export default FeedDash;
