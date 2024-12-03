import React from "react";
import DynamicForm from "./components/DynamicForm";
import "./index.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>React Form</h1>
      </header>
      <main>
        <DynamicForm />
      </main>
      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default App;
