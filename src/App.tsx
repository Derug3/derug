import "./App.css";
import Header from "./components/Header/HeaderNav";
import Router from "./Router";
import { ApolloProvider } from "@apollo/client";
import WalletWrapper from "./WalletWrapper/WalletWrapper";
import { gqlClient } from "./utilities/utilities";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <div className="App flex h-full flex-col justify-between">
      <ApolloProvider client={gqlClient}>
        <Toaster position="bottom-right" toastOptions={{
          className: '',
          style: {
            border: '1px solid rgb(9, 194, 246',
            padding: '16px',
            background: '#0d1117',
            color: 'white'
          },
        }} />
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
