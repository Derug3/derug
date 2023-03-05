import CollectionsSlider from "../components/CollectionsSlider/CollectionsSlider";
import { DUMMY_COLLECTIONS } from "../components/dummy/collections.dummy";
import { Autocomplete, Box, Text } from "@primer/react";
import { useEffect, useState } from "react";
import { getRandomCollections } from "../api/collections.api";
import { collectionsStore } from "../stores/collectionsStore";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../utilities/constants";
import Balancer from "react-wrap-balancer";

const HomePage = () => {
  const { setCollections, collections } = collectionsStore.getState();
  const [loading, setLoading] = useState(false);

  console.log(collections, "collections");

  useEffect(() => {
    void getCollectionsData();
  }, []);

  const getCollectionsData = async () => {
    try {
      setLoading(true);
      setCollections(await getRandomCollections());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "4em",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <motion.h1
          className="py-5 align-center"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer className="w-full mt-4 bg-gradient-to-br from-black to-stone-200 bg-clip-text text-center font-display  font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-3xl align-center">
            Getting rugged collections back to life
          </Balancer>
          <Balancer className="text-3xl">☀️</Balancer>
        </motion.h1>
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
              transition: "all 0.3s ease",
            }}
          >
            <Autocomplete.Menu
              items={collections}
              selectedItemIds={collections.map((c) => c.id)}
            />
          </Box>
        </Autocomplete>
      </Box>
      {!loading && <CollectionsSlider />}
    </Box>
  );
};

export default HomePage;
