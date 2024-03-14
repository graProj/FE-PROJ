import { Routes } from "react-router-dom";
import Home from "./components/main";
import './index.css';
function App() {
  return (
    <div className="App">
      <Routes path="/" element={<Home />} />
      <Home/>
    </div>
  );
}

export default App;
