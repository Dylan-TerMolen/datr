import HomePage from './HomePage';
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import UserPage from './UserPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage/>
            </Route>
            <Route path="/register">
              <RegisterPage/>
            </Route>
            <Route path="/user">
              <UserPage/>
            </Route>
            <Route path="/">
              <HomePage/>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
