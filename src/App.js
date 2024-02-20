import logo from "./images/n64.jpg";
import "./App.css";

function App() {
  return (
    <div>
      <h1 className="title text-3xl bg-blue-100 text-primary p-6 text-center">
        weatherApp&reg;
      </h1>
      <p className="p-6"> hello, maybe we put a field here for city name?</p>
      <div className="p-6 flex justify-around font-semibold border rounded-xl shadow">
        <div>The weather today</div>
        <div>60 degrees</div>
      </div>
    </div>
  );
}

export default App;
