// import React from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import CerealsIndexPage from "./components/CerealsIndexPage";
// import MilksIndexPage from "./components/MilksIndexPage";

// const App = props => {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/" component={CerealsIndexPage} />
//         <Route path="/milks" component={MilksIndexPage} />
//       </Switch>
//     </BrowserRouter>
//   )
// }

// export default App;


import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import NavBar from "./components/NavBar"

const App = props => {
  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
    </BrowserRouter>
  )
}

export default App