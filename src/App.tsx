import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header/HeaderNav";
import { ICollectionData } from "./interface/collections.interface";
import Router from "./Router";
import { CollectionsContext } from "./stores/collectionsStore";
import { gqlClient } from "./utilities/utilities";
import WalletWrapper from "./WalletWrapper/WalletWrapper";

function App() {
  const [collections, setCollections] = useState<ICollectionData[]>();

  const setLoadedCollections = (collections: ICollectionData[]) => {
    setCollections(collections);
  };

  return (
    <div className="App">
      <ApolloProvider client={gqlClient}>
        <WalletWrapper>
          <CollectionsContext.Provider
            value={{ collections, setCollections: setLoadedCollections }}
          >
            <Header />
            <Router />
          </CollectionsContext.Provider>
        </WalletWrapper>
      </ApolloProvider>
    </div>
  );
}

export default App;
