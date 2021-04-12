import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="App">
            <div className="datr-background">
                <img src="datrlogo.png" alt="Datr Logo"></img>
                <Link className="datr-button" to="/login">Login!</Link>
                <Link className="datr-button" to="/register">Register!</Link>
              <div className="datr-slogan">
                <i>Uniquely Random Dating Ideas</i>
              </div>
            </div>
        </div>
      );
}