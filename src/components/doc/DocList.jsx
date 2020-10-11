import React, { Component } from "react";
import DocManagementDataService from "../../services/doc.management.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class DocList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSupplierName = this.onChangeSearchSupplierName.bind(this);
    this.retrieveDocs = this.retrieveDocs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDocs = this.setActiveDocs.bind(this);
    this.removeAllDocs = this.removeAllDocs.bind(this);
    this.searchSupplierName = this.searchSupplierName.bind(this);

    this.state = {
      doc: [],
      currentDoc: null,
      currentIndex: -1,
      searchSupplierName: "",
    };
  }

  componentDidMount() {
    this.retrieveDocs();
  }

  onChangeSearchSupplierName(e) {
    const searchSupplierName = e.target.value;

    this.setState({
      searchSupplierName: searchSupplierName,
    });
  }

  retrieveDocs() {
    DocManagementDataService.getAll()
      .then((response) => {
        this.setState({
          doc: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSupplierName(); //======================================issue?
    this.setState({
      currentDoc: null,
      currentIndex: -1,
    });
  }

  setActiveDocs(door, index) {
    this.setState({
      currentDoc: door,
      currentIndex: index,
    });
  }

  removeAllDocs() {
    DocManagementDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchSupplierName() {
    DocManagementDataService.findBySupplierName(this.state.searchSupplierName)
      .then((response) => {
        this.setState({
          doc: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchSupplierName,
      doc,
      currentDoc,
      currentIndex,
    } = this.state;

    return (
      
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Supplier Name"
              value={searchSupplierName}
              onChange={this.onChangeSearchSupplierName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchSupplierName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h4>DOCs List</h4>

          <ul className="list-group">
            {doc &&

            //need to check
            doc.map((door, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDocs(door, index)}
                  key={index}
                >
                  {door.supplierName}
                  
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDocs}
          >
            Remove All Docs Details
          </button>
          <Link
          //check this
            to={"/inventory-management/doc-management/add-doc"}
            className="badge badge-warning"
          >
            Add Details
          </Link>

        </div>
        <div className="col-md-6">
          {currentDoc ? (
            <div>
              <h4>Doc Details</h4>

              <div>
                <label>
                  <strong>Supplier Name:</strong>
                </label>{" "}
                {currentDoc.supplierName} 
              </div>

              <div>
                <label>
                  <strong>Date :</strong>
                </label>{" "}
                {currentDoc.date} 
              </div>

              <div>
                <label>
                  <strong>Cost :</strong>
                </label>{" "}
                {currentDoc.cost} 
              </div>

              <div>
                <label>
                  <strong>Quantity :</strong>
                </label>{" "}
                {currentDoc.quantity} 
              </div>

              <div>
                <label>
                  <strong>Breed :</strong>
                </label>{" "}
                {currentDoc.breed} 
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentDoc.complete ? "Complete" : "Incomplete"}
              </div>

              <Link
                to={"/inventory-management/doc-management/" + currentDoc.id}
                className="badge badge-warning"
              >
                Edit Details
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Doc to View the Id...</p>
            </div>
          )}
        </div>
      </div>
      
    );
  }
}
