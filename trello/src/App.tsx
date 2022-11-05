import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage/LoginPage";
import MainPage from "./page/MainPage/MainPage";

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>} />
        <Route path="/home" element={<MainPage></MainPage>} />
      </Routes>
    </div>
  );
}

export default App;
