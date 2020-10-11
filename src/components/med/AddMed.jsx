import React, { Component } from "react";
import MedManagementDataService from "../../services/med.management.service";
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
      date: "" ,
      cost: "" ,
      quantity: "" ,
      type: "" ,
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
      date:"",
      cost:"",
      quantity:"",
      type:"",
      complete: false,
      submitted: false,
    });
  }

  render() {
    return (
        // for css
      <div className="toVetTaskForm">  
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMed}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="brandName">Brand Name</label>
              <input
                type="text"
                className="form-control"
                id="brandName"
                required
                value={this.state.brandName}
                onChange={this.onChangeBrandName}
                name="brandName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="text"
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
                id="quantity"
                required
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                name="quantity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                required
                value={this.state.type}
                onChange={this.onChangeType}
                name="type"
              />
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
