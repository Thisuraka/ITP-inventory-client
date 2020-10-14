import React, { Component } from "react";
import FeedManagementDataService from "../../services/feed.management.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class EditFeed extends Component {
  constructor(props) {
    super(props);
    this.onChangeSupplierName = this.onChangeSupplierName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangetype = this.onChangetype.bind(this);
    this.getFeed = this.getFeed.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
    this.updateFeed = this.updateFeed.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);

    this.state = {
      currentFeed: {
        id: null,
        supplierName: "",
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
    this.getFeed(this.props.match.params.id);
  }

  onChangeSupplierName(e) {
    const supplierName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFeed: {
          ...prevState.currentFeed,
          supplierName: supplierName,
        },
      };
    });
  }

  onChangeDate(e) {
    const date = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFeed: {
          ...prevState.currentFeed,
          date: date,
        },
      };
    });
  }

  onChangeCost(e) {
    const cost = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFeed: {
          ...prevState.currentFeed,
          cost: cost,
        },
      };
    });
  }

  onChangeQuantity(e) {
    const quantity = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFeed: {
          ...prevState.currentFeed,
          quantity: quantity,
        },
      };
    });
  }

  onChangetype(e) {
    const type = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFeed: {
          ...prevState.currentFeed,
          type: type,
        },
      };
    });
  }

  getFeed(id) {
    FeedManagementDataService.get(id)
      .then((response) => {
        this.setState({
          currentFeed: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateComplete(status) {
    var data = {
      id: this.state.currentFeed.id,
      supplierName: this.state.currentFeed.supplierName,
      date: this.state.currentFeed.date,
      cost: this.state.currentFeed.cost,
      quantity: this.state.currentFeed.quantity,
      type: this.state.currentFeed.type,
      complete: status,
    };

    FeedManagementDataService.update(this.state.currentFeed.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentFeed: {
            ...prevState.currentFeed,
            complete: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateFeed() {
    FeedManagementDataService.update(
      this.state.currentFeed.id,
      this.state.currentFeed
    )
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/inventory-management/feed-management/list");
        this.setState({
          message: "The Feed was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteFeed() {
    FeedManagementDataService.delete(this.state.currentFeed.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push(
          "/inventory-management/feed-management/feeds/list"
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentFeed } = this.state;

    return (
      <div>
        {currentFeed ? (
          //check
          <div className="formBg2">
            <h4>Feed</h4>
            <form>
              <div className="form-group">
                <label htmlFor="supplierName">Supplier Name</label> <br />
                {/* <input
                  type="text"
                  className="form-control"
                  id="supplierName"
                  value={currentFeed.supplierName}
                  onChange={this.onChangeSupplierName}
                /> */}
                <select
                  className="dropDown"
                  onChange={this.onChangeSupplierName}
                >
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
                <label htmlFor="contact">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={currentFeed.date}
                  onChange={this.onChangeDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cost"> Cost </label>
                <input
                  type="text"
                  className="form-control"
                  min="1"
                  id="cost"
                  value={currentFeed.cost}
                  onChange={this.onChangeCost}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity"> Quantity </label>
                <input
                  type="text"
                  className="form-control"
                  min="1"
                  id="quantity"
                  value={currentFeed.quantity}
                  onChange={this.onChangeQuantity}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type"> Type </label> <br />
                {/* <input
                  type="text"
                  className="form-control"
                  id="type"
                  value={currentFeed.type}
                  onChange={this.onChangetype}
                /> */}
                <select className="dropDown" onChange={this.onChangetype}>
                  <option value="none" selected disabled hidden>
                    {" "}
                    Select Type{" "}
                  </option>
                  <option value="Prima Booster">Prima Booster</option>
                  <option value="Company Starter">Company Starter</option>
                  <option value="Company Finisher">Company Finisher</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFeed.complete ? " Complete" : " Incomplete"}
              </div>
            </form>

            {currentFeed.complete ? (
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
              onClick={this.deleteFeed}
            >
              Remove
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFeed}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Feed...</p>
          </div>
        )}
      </div>
    );
  }
}
