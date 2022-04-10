import React from "react";
import "./App.css";
import { Main } from "./main/Main";
import { Loader } from "./components/loader/Loader";

function App() {
  return (
    <div className="App">
      {/*Use React Suspense to fall back to a certain loader when any component takes too much time loading*/}
      <React.Suspense fallback={<Loader />}>
        <Main />
      </React.Suspense>
    </div>
  );
}

export default App;
