import CollectionsSlider from "../components/CollectionsSlider/CollectionsSlider";
import { Box, Text } from "@primer/react";
import { FC, useEffect, useMemo, useState } from "react";
import {
  getAllCollections,
  getByNameOrSlug,
  getCollectionsWithTopVolume,
  getOrderedCollectionsByVolume,
  getRandomCollections,
} from "../api/collections.api";
import useDebounce from "../hooks/useDebounce";
import {
  ICollectionData,
  ICollectionDerugData,
  ICollectionStats,
  ICollectionVolume,
} from "../interface/collections.interface";
import Select from "react-select";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../utilities/constants";
import { motion } from "framer-motion";
import { collectionsStore } from "../stores/collectionsStore";
import { useNavigate } from "react-router";
import {
  selectStylesPrimary,
  selectStylesSecondary,
} from "../utilities/styles";
import { ActiveListings } from "../components/ActiveListings/ActiveListings";
import { getAllActiveCollections } from "../solana/methods/derug-request";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import CollectionItem from "../components/MainPage/CollectionItem";
import { CollectionVolumeFilter } from "../enums/collections.enums";
import HotCollections from "../components/HotCollections/HotCollections";

const HomePage = () => {
  const { setCollections, collections } = collectionsStore.getState();
  const [searchValue, setSearchValue] = useState<string>();
  const [activeCollections, setActiveCollections] =
    useState<{ derug: ICollectionDerugData; collection: ICollectionData }[]>();
  const [searchLoading, toggleSearchLoading] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState<
    ICollectionData[] | undefined
  >(collections);
  const [topVolumeCollections, setTopVolumeCollections] =
    useState<ICollectionVolume[]>();
  const [hotCollections, setHotCollections] = useState<ICollectionVolume[]>();
  const [filter, setFilter] = useState(CollectionVolumeFilter.NumMints);
  const [loading, setLoading] = useState(true);
  const { name } = useDebounce(searchValue);

  const navigate = useNavigate();

  useEffect(() => {
    void getCollectionsData();
    void getActiveCollections();
    void getTopVolumeCollections();
  }, []);

  useEffect(() => {
    void getTopCollectionsWithFilter();
  }, [filter]);

  useEffect(() => {
    void searchByName();
  }, [name, activeCollections]);

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

  const getActiveCollections = async () => {
    try {
      const activeCollections = await getAllActiveCollections();
      setActiveCollections(activeCollections);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopVolumeCollections = async () => {
    try {
      setTopVolumeCollections(await getCollectionsWithTopVolume());
      setHotCollections(await getCollectionsWithTopVolume());
    } catch (error) {
      toast.error("Failed to load collections with colume");
    }
  };

  const getTopCollectionsWithFilter = async () => {
    try {
      setTopVolumeCollections(await getOrderedCollectionsByVolume(filter));
    } catch (error) {
      toast.error("Failed to load collections with colume");
    }
  };

  const renderSelect = useMemo(() => {
    return (
      <Select
        className="absolute top-0 left-0 w-full h-full z-10 p-2 border border-gray-200 rounded-lg shadow"
        placeholder="Search rugged collections"
        isLoading={searchLoading}
        onInputChange={handleSearch}
        styles={selectStylesPrimary}
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
            <img style={{ width: "2.5em", height: "2.5em" }} src={e.image} />
            <Text as={"h3"}>{e.name}</Text>
          </Box>
        )}
      />
    );
  }, [filteredCollections, searchLoading]);

  const renderTopCollections = useMemo(() => {
    return topVolumeCollections?.map((c) => {
      return <CollectionItem collection={c} key={c.symbol} bigImage={true} />;
    });
  }, [topVolumeCollections]);

  const renderHotCollections = useMemo(() => {
    return hotCollections?.map((c) => {
      return <CollectionItem collection={c} key={c.symbol} bigImage={false} />;
    });
  }, [hotCollections]);

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        zoom: "80%",
        padding: "3em",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      ></Box>

      <Box
        sx={{
          width: "50%",
          margin: "auto",
          position: "relative",
          marginBottom: "80px",
        }}
      >
        <motion.h1
          className="py-5 align-center"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Text
            className="w-full animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-5xl font-black bg-clip-text text-center font-display  tracking-[-0.02em] text-transparent drop-shadow-sm md:text-2xl align-center font-mono animate-[wiggle_1s_ease-in-out_infinite]"
            sx={{
              "@media (max-width: 768px)": {
                fontSize: "1em",
              },
            }}
          >
            Getting rugged collections back to life
          </Text>
        </motion.h1>
        {renderSelect}
        {/* <Text
          onClick={() =>
            window.open(`https://derug-us.gitbook.io/derug_us/`, "_blank")
          }
          className="text-xl font-mono text-yellow-500 cursor-pointer flex justify-center w-full"
        >
          <span
            className="px-4"
            style={{
              border: "1px solid rgb(9, 194, 246)",
              borderTop: "none",
              paddingTop: "5px",
            }}
          >
            how it works?
          </span>
        </Text> */}
      </Box>

      {activeCollections && activeCollections.length ? (
        <div className="flex w-full">
          <ActiveListings activeListings={activeCollections} />
          {/* here as well */}
        </div>
      ) :
        // loading ? (
        (<></>)}

      {/* todo refactor this into component */}
      {topVolumeCollections && topVolumeCollections.length > 0 && (
        <Box className="w-full">
          <HotCollections collections={topVolumeCollections} filter={filter} setFilter={setFilter} />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
