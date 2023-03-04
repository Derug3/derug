import "./App.css";
import Header from "./components/Header/HeaderNav";
import Router from "./Router";
import WalletWrapper from "./WalletWrapper/WalletWrapper";

function App() {
  return (
    <div className="App">
      <WalletWrapper>
        <>
          <Header />
          <Router />
        </>
      </WalletWrapper>
    </div>
  );
}

export default App;
