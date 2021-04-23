import React, { useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage/index';
import ProductListPage from './containers/ProductListPage';
import { useSelector, useDispatch } from 'react-redux';
import { isUserLoggedIn } from './actions';
function App() {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      {(auth && auth.error === 503) ? <h1>SERVER DOWN</h1> :
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/:slug" component={ProductListPage}></Route>
          </Switch>
        </Router>
      }
    </div>
  );
}

export default App;
