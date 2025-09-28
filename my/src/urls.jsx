import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";  // Import Router components
import Movie from "./movie";
import Si from "./context";
import Main from "./main";
import Tickets from "./ticket";
import Np from "./create";
import Lo from "./login";
import Npas from './movie2'
import Jk from "./moive1info";
import App3 from './reco.jsx'
function App1() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Main />} /> 
    <Route path='/get' element={<Si/>}/>
    <Route path='/book' element={<Tickets/>}/>
    <Route path="/create"element={<Np/>}/>
    <Route path="/login"element={<Lo/>}/>
    <Route path="/movie2"element={<Npas/>}/>
    <Route path="/movie3"element={<Jk/>}/>
    <Route path="/reco"element={<App3/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App1;
