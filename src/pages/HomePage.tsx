import CollectionsSlider from "../components/CollectionsSlider/CollectionsSlider";
import { Box, Text } from "@primer/react";
import { useEffect, useMemo, useState } from "react";
import { getByNameOrSlug, getRandomCollections } from "../api/collections.api";
import useDebounce from "../hooks/useDebounce";
import { ICollectionData } from "../interface/collections.interface";
import Select from "react-select";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../utilities/constants";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { collectionsStore } from "../stores/collectionsStore";
import { useNavigate } from "react-router";
import { selectStyles } from "../utilities/styles";
const HomePage = () => {
  const { setCollections, collections } = collectionsStore.getState();
  const [searchValue, setSearchValue] = useState<string>();
  const [searchLoading, toggleSearchLoading] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState<
    ICollectionData[] | undefined
  >(collections);
  const [loading, setLoading] = useState(true);
  const { name } = useDebounce(searchValue);

  const navigate = useNavigate();

  useEffect(() => {
    void getCollectionsData();
  }, []);

  useEffect(() => {
    void searchByName();
  }, [name]);

  const handleSearch = (e: any) => {
    if (e && e !== "") {
      toggleSearchLoading(true);
      setSearchValue(e);
    } else {
      toggleSearchLoading(false);
      setFilteredCollections(collections);
    }
  };

  const searchByName = async () => {
    try {
      const collectionsByName = await getByNameOrSlug(name!);
      console.log(collectionsByName, "collectionsByName");

      setFilteredCollections(collectionsByName);
      toggleSearchLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionsData = async () => {
    try {
      setLoading(true);
      const randomCollections = await getRandomCollections();
      setFilteredCollections(randomCollections);
      setCollections(randomCollections);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSelect = useMemo(() => {
    return (
      <Select
        className="absolute top-0 left-0 w-full h-full z-10"
        placeholder="Search rugged collections"
        isLoading={searchLoading}
        onInputChange={handleSearch}
        styles={selectStyles}
        options={filteredCollections}
        onChange={(e) => navigate(`collection?symbol=${e.symbol}`)}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.symbol}
        formatOptionLabel={(e: any) => (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "0.5em",
              zIndex: 100,
              gap: "0.5em",
            }}
          >
            <img
              style={{ borderRadius: "50%", width: "2.5em", height: "2.5em" }}
              src={e.image}
            />
            <Text as={"h3"}>{e.name}</Text>
          </Box>
        )}
      />
    );
  }, [filteredCollections, searchLoading]);

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
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
          <Balancer className="w-full animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-5xl font-black bg-clip-text text-center font-display  tracking-[-0.02em] text-transparent drop-shadow-sm md:text-2xl align-center font-mono animate-[wiggle_1s_ease-in-out_infinite]">
            Getting rugged collections back to life
          </Balancer>
        </motion.h1>
      </Box>
      <Box
        sx={{
          width: "50%",
          margin: "auto",
          position: "relative",
          marginBottom: "120px",
        }}
      >
        {renderSelect}
      </Box>
      {!loading && <CollectionsSlider />}
    </Box>
  );
};

export default HomePage;
