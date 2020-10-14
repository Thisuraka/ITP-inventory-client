import React, { Component } from "react";
import FeedManagementDataService from "../../services/feed.management.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../";

export default class AddFeed extends Component {
  constructor(props) {
    super(props);
    this.onChangeSupplierName = this.onChangeSupplierName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.saveFeed = this.saveFeed.bind(this);
    this.newFeed = this.newFeed.bind(this);

    this.state = {
      id: null,
      supplierName: "",
      date: "",
      cost: "",
      quantity: "",
      type: "",
      complete: false,
      submitted: false,
    };
  }

  onChangeSupplierName(e) {
    this.setState({
      supplierName: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onChangeCost(e) {
    this.setState({
      cost: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  saveFeed() {
    var data = {
      supplierName: this.state.supplierName,
      date: this.state.date,
      cost: this.state.cost,
      quantity: this.state.quantity,
      type: this.state.type,
    };

    FeedManagementDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          supplierName: response.data.supplierName,
          date: response.data.date,
          cost: response.data.cost,
          quantity: response.data.quantity,
          type: response.data.type,
          complete: response.data.complete,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newFeed() {
    this.setState({
      id: null,
      supplierName: "",
      date: "",
      cost: "",
      quantity: "",
      type: "",
      complete: false,
      submitted: false,
    });
  }

  render() {
    return (
      // for css
      <div className="formBg">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btnSuc" onClick={this.newFeed}>
              Add another
            </button>
            <div className="btnbtn2">
              <Link
                to={"/inventory-management/feed-management/list"}
                className="white"
              >
                {" "}
                View All{" "}
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="supplierName">Supplier Name</label> <br />
              {/* <input
                type="text"
                className="form-control"
                id="supplierName"
                required
                value={this.state.supplierName}
                onChange={this.onChangeSupplierName}
                name="supplierName"
              /> */}
              <select className="dropDown" onChange={this.onChangeSupplierName}>
                <option value="none" selected disabled hidden>
                  {" "}
                  Select Supplier{" "}
                </option>
                <option value="Prima">Prima</option>
                <option value="CIC">CIC</option>
                <option value="Gold Coin">Gold Coin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                value={this.state.date}
                onChange={this.onChangeDate}
                name="date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cost">Cost</label>
              <input
                type="number"
                className="form-control"
                min="1"
                id="cost"
                required
                value={this.state.cost}
                onChange={this.onChangeCost}
                name="cost"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                min="1"
                id="quantity"
                required
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                name="quantity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type</label> <br />
              {/* <input
                type="text"
                className="form-control"
                id="type"
                required
                value={this.state.type}
                onChange={this.onChangeType}
                name="type"
              /> */}
              <select className="dropDown" onChange={this.onChangeType}>
                <option value="none" selected disabled hidden>
                  {" "}
                  Select Type{" "}
                </option>
                <option value="Prima Booster">Prima Booster</option>
                <option value="Company Starter">Company Starter</option>
                <option value="Company Finisher">Company Finisher</option>
              </select>
            </div>

            <button onClick={this.saveFeed} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
