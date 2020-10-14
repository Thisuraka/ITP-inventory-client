import React, { Component } from "react";
import DocManagementDataService from "../../services/doc.management.service";
import GeneratePDF from "../../services/docReports";
import ReportTable from "./reportTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

class Report extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchDate = this.onChangeSearchDate.bind(this);
    this.onChangeSearchBreed = this.onChangeSearchBreed.bind(this);
    this.retrieveRecords = this.retrieveRecords.bind(this);
    this.searchRecord = this.searchRecord.bind(this);

    this.state = {
      doc: [],
      record: [],
      // searchDate: "",
      searchBreed: "",
    };
  }

  componentDidMount() {
    this.retrieveRecords();
  }

  // onChangeSearchDate(e) {
  //   const searchDate = e.target.value;

  //   this.setState({
  //     searchDate: searchDate,
  //   });
  // }

  onChangeSearchBreed(e) {
    const searchBreed = e.target.value;

    this.setState({
      searchBreed: searchBreed,
    });
  }

  retrieveRecords() {
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

  searchRecord() {
    this.retrieveRecords();

    const filtered = this.state.doc
      // .filter((record) => record.date === this.state.searchDate)
      .filter((record) => record.breed === this.state.searchBreed);

    this.setState({
      record: filtered,
    });
  }

  render() {
    const {record } = this.state; //searchDate
    return (
      <div className="test">
        <div className="col-md-5">
          <div className="input-group mb-3">
            {/* <input
              type="date"
              className="form-control"
              id="date"
              required
              value={searchDate}
              onChange={this.onChangeSearchDate}
            /> */}
            <select onChange={this.onChangeSearchBreed}>
              <option value="none" selected disabled hidden>
                {" "}
                Select Breed{" "}
              </option>
              <option value="Type A">Type A</option>
              <option value="Type B">Type B</option>
              <option value="Type C">Type C</option>
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchRecord}
              >
                Search
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => GeneratePDF(record)}
          >
            Generate DOC Report
          </button>
        </div>
        <ReportTable record={record} />
      </div>
    );
  }
}

export default Report;
