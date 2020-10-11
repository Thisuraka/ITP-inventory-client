import React, { Component } from "react";
import DocManagementDataService from "../../services/doc.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class EditDoc extends Component {
  constructor(props) {
    super(props);
    this.onChangeSupplierName = this.onChangeSupplierName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.getDoc = this.getDoc.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);

    this.state = {
      currentDoc: {
        id: null,
        supplierName: "",
        date: "" ,
        cost: "" ,
        quantity: "" ,
        breed: "" ,
        complete: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getDoc(this.props.match.params.id);
  }

  onChangeSupplierName(e) {
    const supplierName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentDoc: {
          ...prevState.currentDoc,
          supplierName: supplierName,
        },
      };
    });
  }
 
  onChangeDate(e) {
    const date = e.target.value;

    this.setState(function (prevState) {
      return {
        currentDoc: {
          ...prevState.currentDoc,
          date: date,
        },
      };
    });
  }

  onChangeCost(e) {
    const cost = e.target.value;

    this.setState(function (prevState) {
      return {
        currentDoc: {
          ...prevState.currentDoc,
          cost: cost,
        },
      };
    });
  }

  onChangeQuantity(e) {
    const quantity = e.target.value;

    this.setState(function (prevState) {
      return {
        currentDoc: {
          ...prevState.currentDoc,
          quantity: quantity,
        },
      };
    });
  }

  onChangeBreed(e) {
    const breed = e.target.value;

    this.setState(function (prevState) {
      return {
        currentDoc: {
          ...prevState.currentDoc,
          breed: breed,
        },
      };
    });
  }


  getDoc(id) {
    DocManagementDataService.get(id)
      .then((response) => {
        this.setState({
          currentDoc: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateComplete(status) {
    var data = {
      id: this.state.currentDoc.id,
      supplierName: this.state.currentDoc.supplierName,
      date: this.state.currentDoc.date,
      cost: this.state.currentDoc.cost,
      quantity: this.state.currentDoc.quantity,
      breed: this.state.currentDoc.breed,
      complete: status,
    };

    DocManagementDataService.update(this.state.currentDoc.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentDoc: {
            ...prevState.currentDoc,
            complete: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateDoc() {
    DocManagementDataService.update(
      this.state.currentDoc.id,
      this.state.currentDoc
    )
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/inventory-management/doc-management/list");
        this.setState({
          message: "The Doc was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteDoc() {
    DocManagementDataService.delete(this.state.currentDoc.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/inventory-management/doc-management/list");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentDoc } = this.state;

    return (
      <div>
        {currentDoc ? (
          //check
          <div className="formBg2"> 
            <h4>Feed</h4>
            <form>
              <div className="form-group">
                <label htmlFor="supplierName">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="supplierName"
                  value={currentDoc.supplierName}
                  onChange={this.onChangeSupplierName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={currentDoc.date}
                  onChange={this.onChangeDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cost"> Cost </label>
                <input
                  type="text"
                  className="form-control"
                  id="cost"
                  value={currentDoc.cost}
                  onChange={this.onChangeCost}
                />
              </div> 

              <div className="form-group">
                <label htmlFor="quantity"> Quantity </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  value={currentDoc.quantity}
                  onChange={this.onChangeQuantity}
                />
              </div> 

              <div className="form-group">
                <label htmlFor="breed"> Breed </label>
                <input
                  type="text"
                  className="form-control"
                  id="breed"
                  value={currentDoc.breed}
                  onChange={this.onChangeBreed}
                />
              </div> 

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentDoc.complete ? "Valid" : "Invalid"}
              </div>
            </form>

            {currentDoc.complete ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateComplete(false)}
              >
                Invalid
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateComplete(true)}
              >
                Valid
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDoc}
            >
              Remove
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDoc}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Doc...</p>
          </div>
        )}
      </div>
    );
  }
}
