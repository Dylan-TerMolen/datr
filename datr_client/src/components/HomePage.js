import HomeNavbar from './HomeNavbar'

export default function HomePage() {
    return (
        <div className="App">
            <div className="datr-background">
                <HomeNavbar/>
              <div className="datr-slogan">
                <i>Uniquely Random Dating Ideas</i>
              </div>
                <hr/>
                <div className="d-flex justify-content-center">
                  <h1>What is Datr?</h1>
                  <div className="datr-text">Datr is a... </div>
                </div>
                <hr/>
                <div className="d-flex justify-content-center">
                  <h1>Why Datr?</h1>
                  <div className="datr-text">Use Datr because... </div>  
                </div>
          </div>
        </div>
      );
}