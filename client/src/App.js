import React from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
//Redux
import {Provider} from 'react-redux';
import store from './store';


const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </div>
    </Router>
  </Provider>
);

export default App;
