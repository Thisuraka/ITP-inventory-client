import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Dash.css";

class DocDash extends React.Component {
  // state = {  }
  render() {
    return (
      <div>
        <div className="topic">DOC Management</div>
        <div className="tab" id="tab1">
          <Link to={"doc-management/list"}>
           DOC List
          </Link>
        </div>
        <div className="tab" id="tab2">
          <Link to={"doc-management/add-doc"}>Add DOC Details</Link>
        </div>
      </div>
    );
  }
}

export default DocDash;
