import React, { Component } from "react";
import { Link } from "react-router-dom";
import DocManagementDataService from "../../services/doc.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../";

export default class AddDoc extends Component {
  constructor(props) {
    super(props);
    this.onChangeSupplierName = this.onChangeSupplierName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.saveDoc = this.saveDoc.bind(this);
    this.newDoc = this.newDoc.bind(this);
    this.docDemo = this.docDemo.bind(this);

    this.state = {
      id: null,
      supplierName: "",
      date: "",
      cost: "",
      quantity: "",
      breed: "",
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

  onChangeBreed(e) {
    this.setState({
      breed: e.target.value,
    });
  }

  saveDoc() {
    var data = {
      supplierName: this.state.supplierName,
      date: this.state.date,
      cost: this.state.cost,
      quantity: this.state.quantity,
      breed: this.state.breed,
    };

    DocManagementDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          supplierName: response.data.supplierName,
          date: response.data.date,
          cost: response.data.cost,
          quantity: response.data.quantity,
          breed: response.data.breed,
          complete: response.data.complete,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newDoc() {
    this.setState({
      id: null,
      supplierName: "",
      date: "",
      cost: "",
      quantity: "",
      breed: "",
      complete: false,
      submitted: false,
    });
  }

  docDemo() {
    this.setState({
      id: null,
      supplierName: "Crisbo",
      date: "",
      cost: 450,
      quantity: 243,
      breed: "Type B",
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
            <button className="btnSuc" onClick={this.newDoc}>
              Add another
            </button>
            <div className="btnbtn2">
              <Link
                to={"/inventory-management/doc-management/list"}
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
                <option value="St. Annes">St. Annes</option>
                <option value="Bairaha">Bairaha</option>
                <option value="Crisbo">Crisbo</option>
                <option value="Prima">Prima</option>
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
                id="cost"
                required
                min="1"
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
                id="quantity"
                min="1"
                required
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                name="quantity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="breed">Breed</label> <br />
              {/* <input
                type="text"
                className="form-control"
                id="breed"
                required
                value={this.state.breed}
                onChange={this.onChangeBreed}
                name="breed"
              /> */}
              <select className="dropDown" onChange={this.onChangeBreed}>
                <option value="none" selected disabled hidden>
                  {" "}
                  Select Breed{" "}
                </option>
                <option value="Type A">Type A</option>
                <option value="Type B">Type B</option>
                <option value="Type C">Type C</option>
              </select>
            </div>

            <button onClick={this.saveDoc} className="btn btn-success">
              Submit
            </button>
            <br />
            <br />
            <button onClick={this.docDemo} className="btn btn-success">
              Demo
            </button>
          </div>
        )}
      </div>
    );
  }
}
