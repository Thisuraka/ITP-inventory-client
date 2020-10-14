import React, { Component } from "react";
import MedManagementDataService from "../../services/med.management.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../";

export default class AddMed extends Component {
  constructor(props) {
    super(props);
    this.onChangeBrandName = this.onChangeBrandName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.saveMed = this.saveMed.bind(this);
    this.newMed = this.newMed.bind(this);

    this.state = {
      id: null,
      brandName: "",
      date: "",
      cost: "",
      quantity: "",
      type: "",
      complete: false,
      submitted: false,
    };
  }

  onChangeBrandName(e) {
    this.setState({
      brandName: e.target.value,
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

  saveMed() {
    var data = {
      brandName: this.state.brandName,
      date: this.state.date,
      cost: this.state.cost,
      quantity: this.state.quantity,
      type: this.state.type,
    };

    MedManagementDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          brandName: response.data.brandName,
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

  newMed() {
    this.setState({
      id: null,
      brandName: "",
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
            <button className="btnSuc" onClick={this.newMed}>
              Add another
            </button>
            <div className="btnbtn2">
              <Link
                to={"/inventory-management/med-management/list"}
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
              <label htmlFor="brandName">Brand Name</label> <br />
              <select className="dropDown" onChange={this.onChangeBrandName}>
                <option value="none" selected disabled hidden>
                  {" "}
                  Select Brand{" "}
                </option>
                <option value="Benzathine ">Benzathine </option>
                <option value="Valbazen">Valbazen</option>
                <option value="Amoxi">Amoxi</option>
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
                type="text"
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
                type="text"
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
              <label htmlFor="type">Type</label>
              <br />
              <select className="dropDown" onChange={this.onChangeType}>
                <option value="none" selected disabled hidden>
                  {" "}
                  Select Type{" "}
                </option>
                <option value="Penicillins">Penicillins</option>
                <option value="Vinegars">Vinegars</option>
                <option value="Chemical">Chemical</option>
              </select>
            </div>

            <button onClick={this.saveMed} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
