import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Search from "./Components/Search";
import SearchForm from "./Components/SearchForm";
import Nav from "./Components/Nav";
import PhotoContainer from "./Components/PhotoContainer";
import Error from "./Components/Error";
import axios from "axios";
// import apiKey from "./config.js";
import Photos from "./Components/Photos";

// Base URL: config.apiBaseUrl
import config from "./config";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Data format: [[{photo1}, {photo2 etc}], [{photo1}, {photo2 etc}], [{photo1}, {photo2 etc}]]
      topics: [[], [], []],

      // Data format: [{photo1}, {photo2 etc}]
      results: [],

      // States: searching, notFound, found
      searchStatus: "searching",

      query: ""
    };
    this.handleQuery = this.handleQuery.bind(this);
  }

  componentDidMount() {
    this.handleTopics();
  }

  handleTopics() {
    this.handleAPI("islands", 0);
    this.handleAPI("sunset", 1);
    this.handleAPI("waterfall", 2);
  }

  handleQuery(query) {
    this.setState({
      searchStatus: "searching",
      query
    });
    this.handleAPI(query, "search");
  }

  // requestType: search, topic #
  handleAPI = (query, requestType) => {
    const referenceToThis = this;

    // Per project requirments, get no more than 24 images.

    // Unsplash limits developer API requests to 50 per hour.

    setTimeout(() => {
      // console.log("API Request will run.");

      // OLD VERSION
      // axios
      //   .get("https://api.unsplash.com/search/photos/", {
      //     params: {
      //       client_id: apiKey,
      //       query: query,
      //       per_page: 24
      //     }
      //   })

      axios
        .get(`${config.apiBaseUrl}/${query}`)

        .then(function(response) {
          // SEARCH
          if (requestType === "search") {
            if (response.data.results.length !== 0) {
              // Store result in state.
              referenceToThis.setState({
                results: response.data.results,
                // Update search status.
                searchStatus: "found"
              });
            } else {
              referenceToThis.setState({
                results: [],
                // Update search status.
                searchStatus: "notFound"
              });
            }
            // TOPICS
          } else {
            referenceToThis.setState(prevState => {
              // Gets copy of topics array from state.
              let updatedTopics = prevState.topics;
              // At index, adds current API response.
              updatedTopics[requestType] = response.data.results;
              // Updates state.
              return { topics: updatedTopics };
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      // Set API request delay here (to test 'searching' and 'loading' messages):
    }, 0);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route component={SearchForm} />

          <Nav />

          <Switch>
            {/* TOPICS */}
            {/* Redirects '/', and displays new url.*/}
            <Route exact path="/" render={() => <Redirect to="/island" />} />
            <Route
              path="/island"
              render={() => (
                <PhotoContainer title={"island pictures"}>
                  <Photos data={this.state.topics[0]} />
                </PhotoContainer>
              )}
            />
            <Route
              path="/sunset"
              render={() => (
                <PhotoContainer title={"sunset pictures"}>
                  <Photos data={this.state.topics[1]} />
                </PhotoContainer>
              )}
            />
            <Route
              path="/waterfall"
              render={() => (
                <PhotoContainer title={"waterfall pictures"}>
                  <Photos data={this.state.topics[2]} />
                </PhotoContainer>
              )}
            />

            {/* SEARCH */}
            <Route
              path="/search/:query"
              render={props => {
                return (
                  <Search
                    data={this.state.results}
                    query={props.match.params.query}
                    lastQuery={this.state.query}
                    handleQuery={this.handleQuery}
                    searchStatus={this.state.searchStatus}
                  />
                );
              }}
            />

            {/* No matching url found, so creates a 404. */}
            <Route
              path="/"
              render={() => (
                <PhotoContainer title={"Whoops!"}>
                  <Error error={"404"} description={"Page not found."} />
                </PhotoContainer>
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
