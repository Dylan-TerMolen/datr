import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import UserPage from './components/UserPage'
import GeneratePage from './components/GeneratePage'
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
            <Route path="/user/saved">
              <UserPage/>
            </Route>
            <Route path="/user/new">
              <GeneratePage/>
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
