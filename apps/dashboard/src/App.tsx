import Sidebar from "./components/Sidebar";
import { container } from "./styles/global.css";
import Router from "./Router";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Sidebar />
      <div className={container}>
        <Header />
        <Router />
      </div>
    </>
  );
}

export default App;
