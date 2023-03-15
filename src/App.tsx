import "./App.css";
import Header from "./components/Header/HeaderNav";
import Router from "./Router";
import { ApolloProvider } from "@apollo/client";
import WalletWrapper from "./WalletWrapper/WalletWrapper";
import { gqlClient } from "./utilities/utilities";
import { Toaster, toast } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={gqlClient}>
        <Toaster position="bottom-right" />
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
