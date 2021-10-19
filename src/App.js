import "./normalize.css";
import { Route, Switch } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import HomePage from "./pages/Home";
import Signin from "./components/layouts/Signin";
import MilestoneEditor from "./pages/MileStone/MilestoneEditor";
import Miles from "./pages/MileStone/Miles";
// import { useState, useEffect } from "react";

function App() {
  // const [showLogin, setShowLogin] = useState(false);
  return (
    <Layouts>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/milestone/post" exact>
          <MilestoneEditor />
        </Route>
        <Route path="/miles" exact>
          <Miles />
        </Route>
      </Switch>
    </Layouts>
  );
}

export default App;
