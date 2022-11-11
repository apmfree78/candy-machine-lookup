import React, { useState } from "react";
import "bulmaswatch/slate/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import MintInfo from "./components/MintInfo";
import useUser, { User } from "./hooks/useUser";

function App() {
  const [page, setPage] = useState(1);
  const users: User[] = useUser(page, 9);
  return (
    <div role="container" className="App">
      <MintInfo />
    </div>
  );
}

export default App;
