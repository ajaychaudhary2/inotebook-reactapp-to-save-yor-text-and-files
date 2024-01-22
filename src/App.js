import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import About from "./Components/About";
import NoteState from "./Components/Context/notes/NoteState";
import Login from "./Components/Login1";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";


function App() {
  
  return (
    <>
      {" "}
      <NoteState>
        <Router>
        <Nav />
        
          <div className="container">
            <Alert alert={alert}/>
           
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
