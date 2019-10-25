import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Pages/Home/home';
import Search from './Pages/Search/search'
import { connect } from 'react-redux';
import { setCollection } from './redux/reducers/action';

class App extends React.Component {


  componentDidMount(){
    const myCollection = JSON.parse(localStorage.getItem("myCollection"));
    if(myCollection !== null){
      this.props.setCollection(myCollection);
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
          <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setCollection: (collection) => {
      dispatch(setCollection(collection))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);

