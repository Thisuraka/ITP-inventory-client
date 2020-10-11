import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Dash from "./components/dash";
import Header from "./components/Header";
import Footer from "./components/Footer";


import DocDash from "./components/doc/DocDash";
import DocList from "./components/doc/DocList";
import EditDoc from "./components/doc/EditDoc";
import AddDoc from "./components/doc/AddDoc";

import FeedDash from "./components/feed/FeedDash";
import FeedList from "./components/feed/FeedList";
import EditFeed from "./components/feed/EditFeed";
import AddFeed from "./components/feed/AddFeed";

import MedDash from "./components/med/MedDash";
import MedList from "./components/med/MedList";
import EditMed from "./components/med/EditMed";
import AddMed from "./components/med/AddMed";

import SideNavFeed from "./components/feed/SideNavFeed";
import SideNavDoc from "./components/doc/SideNavDoc";
import SideNavMed from "./components/med/SideNavMed";

class App extends Component {
  render() {     
    return (
      <div className="bg">

        <Route path="/inventory-management/doc-management" component={SideNavDoc} />
        <Route path="/inventory-management/feed-management" component={SideNavFeed} />
        <Route path="/inventory-management/med-management" component={SideNavMed} />

        <Switch>
          <Route exact path="/inventory-management" component={Dash} />
          <Route exact path="/inventory-management/doc-management" component={DocDash} />
          <Route exact path="/inventory-management/feed-management" component={FeedDash} />
          <Route exact path="/inventory-management/med-management" component={MedDash} />
          <Route
            exact
            path="/inventory-management/doc-management/list"  //check
            component={DocList}
          />
          <Route
            exact
            path="/inventory-management/doc-management/add-doc"  //check
            component={AddDoc}
          />
          <Route
            exact
            path="/inventory-management/doc-management/:id"
            component={EditDoc}
          />
          <Route
            exact
            path="/inventory-management/feed-management/list"  //check
            component={FeedList}
          />
          <Route
            exact
            path="/inventory-management/feed-management/add-feed"  //check
            component={AddFeed}
          />
          <Route
            exact
            path="/inventory-management/feed-management/:id"
            component={EditFeed}
          />
          <Route
            exact
            path="/inventory-management/med-management/list"  //check
            component={MedList}
          />
          <Route
            exact
            path="/inventory-management/med-management/add-med"  //check
            component={AddMed}
          />
          <Route
            exact
            path="/inventory-management/med-management/:id"
            component={EditMed}
          />
        </Switch>

        <Route path="/inventory-management" component={Header} />
        <Route path="/inventory-management" component={Footer} />
      </div>
    );
  }
}

export default App;
