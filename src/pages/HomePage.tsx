import CollectionsSlider from "../components/CollectionsSlider/CollectionsSlider";
import { Autocomplete, Box, Text } from "@primer/react";
import { useEffect, useState } from "react";
import { getByNameOrSlug, getRandomCollections } from "../api/collections.api";
import { collectionsStore } from "../stores/collectionsStore";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../utilities/constants";
import Balancer from "react-wrap-balancer";
import useDebounce from "../hooks/useDebounce";
import { ICollectionData } from "../interface/collections.interface";

const HomePage = () => {
  const { setCollections, collections } = collectionsStore.getState();
  const [searchValue, setSearchValue] = useState<string>();
  const [loading, toggleLoading] = useState(false);
  const [filteredCollections, setFilteredCollections] =
    useState<ICollectionData[]>(collections);
  const { name } = useDebounce(searchValue);

  useEffect(() => {
    void getCollectionsData();
  }, []);

  useEffect(() => {
    void searchByName();
  }, [name]);

  const handleSearch = (e: any) => {
    if (e.target.value && e.target.value !== "") toggleLoading(true);
    setSearchValue(e.target.value);
  };

  const searchByName = async () => {
    try {
      if (name && name !== "") {
        const collections = await getByNameOrSlug(name);

        setFilteredCollections(collections);
        toggleLoading(false);
      } else {
        setFilteredCollections(collections);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionsData = async () => {
    try {
      toggleLoading(true);
      setCollections(await getRandomCollections());
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading(false);
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
            loading={loading}
            onChange={handleSearch}
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
              maxHeight: "20em",
              overflow: "scroll",
              zIndex: "100",
            }}
          >
            <Autocomplete.Menu
              loading={loading}
              items={[
                { text: "main", id: 0, image: "asadssd" },
                { text: "autocomplete-tests", id: 1 },
                { text: "a11y-improvements", id: 2 },
                { text: "button-bug-fixes", id: 3 },
                { text: "radio-input-component", id: 4 },
                { text: "release-1.0.0", id: 5 },
                { text: "text-input-implementation", id: 6 },
                { text: "visual-design-tweaks", id: 7 },
              ]}
              selectionVariant={"single"}
              selectedItemIds={collections.map((c) => c.id)}
              emptyStateText="No rugged collections"
            />
          </Box>
        </Autocomplete>
      </Box>
      {!loading && <CollectionsSlider />}
    </Box>
  );
};

export default HomePage;
