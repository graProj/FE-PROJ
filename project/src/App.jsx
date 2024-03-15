import { Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/main";
import './index.css';
function App() {
  return (
    <div className="App">
      <Routes path="/" element={<Home />} />
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
