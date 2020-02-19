import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import FAQContainer from "../components/FAQContainer";
import LauncherList from "../components/LauncherList";
import LauncherShow from "../components/LauncherShow";

const App = props => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/launchers">Launchers</Link>
          </li>
          <li>
            <Link to="/">FAQ</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={FAQContainer} />
        <Route exact path="/launchers" component={LauncherList} />
        <Route exact path="/launchers/:id" component={LauncherShow} />
      </Switch>
    </Router>
  );
};

export default App;
