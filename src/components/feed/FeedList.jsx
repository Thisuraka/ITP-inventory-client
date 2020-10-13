import React, { Component } from "react";
import FeedManagementDataService from "../../services/feed.management.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default class FeedList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSupplierName = this.onChangeSearchSupplierName.bind(
      this
    );
    this.retrieveFeeds = this.retrieveFeeds.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFeeds = this.setActiveFeeds.bind(this);
    this.removeAllFeeds = this.removeAllFeeds.bind(this);
    this.searchSupplierName = this.searchSupplierName.bind(this);

    this.state = {
      feed: [],
      currentFeed: null,
      currentIndex: -1,
      searchSupplierName: "",
    };
  }

  componentDidMount() {
    this.retrieveFeeds();
  }

  onChangeSearchSupplierName(e) {
    const searchSupplierName = e.target.value;

    this.setState({
      searchSupplierName: searchSupplierName,
    });
  }

  retrieveFeeds() {
    FeedManagementDataService.getAll()
      .then((response) => {
        this.setState({
          feed: response.data,
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
      currentFeed: null,
      currentIndex: -1,
    });
  }

  setActiveFeeds(door, index) {
    this.setState({
      currentFeed: door,
      currentIndex: index,
    });
  }

  removeAllFeeds() {
    FeedManagementDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchSupplierName() {
    FeedManagementDataService.findBySupplierName(this.state.searchSupplierName)
      .then((response) => {
        this.setState({
          feed: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchSupplierName, feed, currentFeed, currentIndex } = this.state;

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
        <div className="btnsArrange">
          <button className="listBtn1" onClick={this.removeAllFeeds}>
            Remove All Feed Details
          </button>
          <Link
            to={"/inventory-management/feed-management/add-feed"}
            className="badge badge-warning"
          >
            Add Details
          </Link>
        </div>
        <div className="col-md-6">
          <h4>Feeds List</h4>

          <ul className="list-group">
            {feed &&
              //need to check
              feed.map((door, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFeeds(door, index)}
                  key={index}
                >
                  {door.supplierName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentFeed ? (
            <div>
              <h4>Feed Details</h4>

              <div>
                <label>
                  <strong>Supplier Name:</strong>
                </label>{" "}
                {currentFeed.supplierName}
              </div>

              <div>
                <label>
                  <strong>Date :</strong>
                </label>{" "}
                {currentFeed.date}
              </div>

              <div>
                <label>
                  <strong>Cost :</strong>
                </label>{" "}
                {currentFeed.cost}
              </div>

              <div>
                <label>
                  <strong>Quantity :</strong>
                </label>{" "}
                {currentFeed.quantity}
              </div>

              <div>
                <label>
                  <strong>Type :</strong>
                </label>{" "}
                {currentFeed.type}
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFeed.complete ? "Complete" : "Incomplete"}
              </div>

              <Link
                to={"/inventory-management/feed-management/" + currentFeed.id}
                className="badge badge-warning"
              >
                Edit Details
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Feed to View the Id...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
