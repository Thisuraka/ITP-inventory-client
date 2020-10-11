import React, { Component } from "react";
import MedManagementDataService from "../../services/med.management.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class MedList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchBrandName = this.onChangeSearchBrandName.bind(this);
    this.retrieveMeds = this.retrieveMeds.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMeds = this.setActiveMeds.bind(this);
    this.removeAllMeds = this.removeAllMeds.bind(this);
    this.searchBrandName = this.searchBrandName.bind(this);

    this.state = {
      med: [],
      currentMed: null,
      currentIndex: -1,
      searchBrandName: "",
    };
  }

  componentDidMount() {
    this.retrieveMeds();
  }

  onChangeSearchBrandName(e) {
    const searchBrandName = e.target.value;

    this.setState({
      searchBrandName: searchBrandName,
    });
  }

  retrieveMeds() {
    MedManagementDataService.getAll()
      .then((response) => {
        this.setState({
          med: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBrandName(); //======================================issue?
    this.setState({
      currentMed: null,
      currentIndex: -1,
    });
  }

  setActiveMeds(door, index) {
    this.setState({
      currentMed: door,
      currentIndex: index,
    });
  }

  removeAllMeds() {
    MedManagementDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchBrandName() {
    MedManagementDataService.findByBrandName(this.state.searchBrandName)
      .then((response) => {
        this.setState({
          med: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchBrandName,
      med,
      currentMed,
      currentIndex,
    } = this.state;

    return (
      
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Brand Name"
              value={searchBrandName}
              onChange={this.onChangeSearchBrandName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBrandName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h4>Meds List</h4>

          <ul className="list-group">
            {med &&

            //need to check
            med.map((door, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMeds(door, index)}
                  key={index}
                >
                  {door.brandName}
                  
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMeds}
          >
            Remove All Meds Details
          </button>
          <Link
          //check this
            to={"/inventory-management/med-management/add-med"}
            className="badge badge-warning"
          >
            Add Details
          </Link>

          
        </div>
        <div className="col-md-6">
          {currentMed ? (
            <div>
              <h4>Med Details</h4>

              <div>
                <label>
                  <strong>Brand Name:</strong>
                </label>{" "}
                {currentMed.brandName} 
              </div>

              <div>
                <label>
                  <strong>Date :</strong>
                </label>{" "}
                {currentMed.date} 
              </div>

              <div>
                <label>
                  <strong>Cost :</strong>
                </label>{" "}
                {currentMed.cost} 
              </div>

              <div>
                <label>
                  <strong>Quantity :</strong>
                </label>{" "}
                {currentMed.quantity} 
              </div>

              <div>
                <label>
                  <strong>Type :</strong>
                </label>{" "}
                {currentMed.type} 
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentMed.complete ? "Complete" : "Incomplete"}
              </div>

              <Link
                to={"/inventory-management/med-management/" + currentMed.id}
                className="badge badge-warning"
              >
                Edit Details
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Med to View the Id...</p>
            </div>
          )}
        </div>
      </div>
      
    );
  }
}
