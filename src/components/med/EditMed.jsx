import React, { Component } from "react";
import MedManagementDataService from "../../services/med.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class EditMed extends Component {
  constructor(props) {
    super(props);
    this.onChangeBrandName = this.onChangeBrandName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangetype = this.onChangetype.bind(this);
    this.getMed = this.getMed.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
    this.updateMed = this.updateMed.bind(this);
    this.deleteMed = this.deleteMed.bind(this);

    this.state = {
      currentMed: {
        id: null,
        brandName: "",
        date: "",
        cost: "",
        quantity: "",
        type: "",
        complete: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getMed(this.props.match.params.id);
  }

  onChangeBrandName(e) {
    const brandName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMed: {
          ...prevState.currentMed,
          brandName: brandName,
        },
      };
    });
  }

  onChangeDate(e) {
    const date = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMed: {
          ...prevState.currentMed,
          date: date,
        },
      };
    });
  }

  onChangeCost(e) {
    const cost = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMed: {
          ...prevState.currentMed,
          cost: cost,
        },
      };
    });
  }

  onChangeQuantity(e) {
    const quantity = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMed: {
          ...prevState.currentMed,
          quantity: quantity,
        },
      };
    });
  }

  onChangetype(e) {
    const type = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMed: {
          ...prevState.currentMed,
          type: type,
        },
      };
    });
  }

  getMed(id) {
    MedManagementDataService.get(id)
      .then((response) => {
        this.setState({
          currentMed: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateComplete(status) {
    var data = {
      id: this.state.currentMed.id,
      brandName: this.state.currentMed.brandName,
      date: this.state.currentMed.date,
      cost: this.state.currentMed.cost,
      quantity: this.state.currentMed.quantity,
      type: this.state.currentMed.type,
      complete: status,
    };

    MedManagementDataService.update(this.state.currentMed.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentMed: {
            ...prevState.currentMed,
            complete: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateMed() {
    MedManagementDataService.update(
      this.state.currentMed.id,
      this.state.currentMed
    )
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/inventory-management/med-management/list");
        this.setState({
          message: "The Med was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteMed() {
    MedManagementDataService.delete(this.state.currentMed.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/inventory-management/med-management/list");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentMed } = this.state;

    return (
      <div>
        {currentMed ? (
          //check
          <div className="formBg2">
            <h4>Med</h4>
            <form>
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
                <label htmlFor="contact">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={currentMed.date}
                  onChange={this.onChangeDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cost"> Cost </label>
                <input
                  type="number"
                  className="form-control"
                  id="cost"
                  min="1"
                  value={currentMed.cost}
                  onChange={this.onChangeCost}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity"> Quantity </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  min="1"
                  value={currentMed.quantity}
                  onChange={this.onChangeQuantity}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type"> Type </label> <br />
                <select className="dropDown" onChange={this.onChangetype}>
                  <option value="none" selected disabled hidden>
                    {" "}
                    Select Type{" "}
                  </option>
                  <option value="Penicillins">Penicillins</option>
                  <option value="Vinegars">Vinegars</option>
                  <option value="Chemical">Chemical</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMed.complete ? " Complete" : " Incomplete"}
              </div>
            </form>

            {currentMed.complete ? (
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
              onClick={this.deleteMed}
            >
              Remove
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMed}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Med...</p>
          </div>
        )}
      </div>
    );
  }
}
