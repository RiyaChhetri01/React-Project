import { useState } from "react";
import SearchBar from "./Searchbar";
import "./App.css";
// import { SearchBar } from "./components/SearchBar"; 


function App() {


  return (
    <div className="App">
      <div className="search-bar-container">
        <h1 color="blue">Search Here</h1>
        <SearchBar />
      </div>
    </div>
  );
}

export default App;