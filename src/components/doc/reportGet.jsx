import React, { Component } from "react";
import DocManagementDataService from "../../services/doc.management.service";
import GeneratePDF from "../../services/docReports";
import RecordTable from "./reportTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

class Report extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.retrieveRecords = this.retrieveRecords.bind(this);
    this.searchRecord = this.searchRecord.bind(this);

    this.state = {
      doc: [],
      record: [],
      searchDate: "",
      searchBreed: "",
    };
  }

  componentDidMount() {
    this.retrieveRecords();
  }

  onChangeSearchDate(e) {
    const searchDate = e.target.value;

    this.setState({
        searchDate: searchDate,
    });
  }

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

    const filtered = this.state.records
      .filter((record) => record.date === this.state.searchDate)
      .filter((record) => record.breed === this.state.searchBreed);

    this.setState({
      finalRecord: filtered,
    });
  }

  render() {
    const { searchDate, finalRecord } = this.state;
    return (
      <div>
        <div className="col-md-5">
          <div className="input-group mb-3">
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={searchDate}
              onChange={this.onChangeSearchDate}
            />
            <select onChange={this.onChangeSearchBreed}>
              <option value="week">Select Breed</option>
              <option value="week1">Breed 1</option>
              <option value="week2">Breed 2</option>
              <option value="week3">Breed 3</option>
              <option value="week4">Breed 4</option>
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
            onClick={() => GeneratePDF(finalRecord)}
          >
            Generate DOC Report
          </button>
        </div>
        <RecordTable record={finalRecord} />
      </div>
    );
  }
}

export default Report;