import { styled } from "@material-ui/core";
import CollectionsSlider from "../components/CollectionsSlider/CollectionsSlider";
import { DUMMY_COLLECTIONS } from "../components/dummy/collections.dummy";
import { Autocomplete, Box, Text } from "@primer/react";
import { useEffect, useState } from "react";
import { getRandomCollections } from "../api/collections.api";
import { collectionsStore } from "../stores/collectionsStore";

const HomePage = () => {
  const { setCollections, collections } = collectionsStore.getState();

  useEffect(() => {
    void getCollectionsData();
  }, []);

  const getCollectionsData = async () => {
    try {
      setCollections(await getRandomCollections());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "6em",
      }}
    >
      <Box>
        <Text as={"h1"}>Getting rugged collections back to life! 🔥🔥🔥</Text>
        <Autocomplete>
          <Autocomplete.Input
            placeholder="Search rugged collection"
            sx={{
              width: "50%",
              margin: "auto",
              padding: "0.5em",
            }}
          />
          <Box
            sx={{
              width: "50%",
              margin: "auto",
              padding: "0.5em",
              borderRadius: "0px 0px 4px 4px",
            }}
          >
            <Autocomplete.Menu
              items={collections}
              selectedItemIds={collections.map((c) => c.id)}
            />
          </Box>
        </Autocomplete>
      </Box>

      <CollectionsSlider />
    </Box>
  );
};

export default HomePage;
