import "./App.css";
import Header from "./components/Header/HeaderNav";
import Router from "./Router";
import { ApolloProvider } from "@apollo/client";
import WalletWrapper from "./WalletWrapper/WalletWrapper";
import { gqlClient } from "./utilities/utilities";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={gqlClient}>
        <WalletWrapper>
          <>
            <Header />
            <Router />
          </>
        </WalletWrapper>
      </ApolloProvider>
    </div>
  );
}

export default App;
