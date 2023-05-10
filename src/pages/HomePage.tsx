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
import { mapFilterTypeToValue } from "../common/helpers";

const HomePage = () => {
  const { setCollections, collections } = collectionsStore.getState();
  const [searchValue, setSearchValue] = useState<string>();
  const [activeCollections, setActiveCollections] =
    useState<ICollectionData[]>();
  const [searchLoading, toggleSearchLoading] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState<
    ICollectionData[] | undefined
  >(collections);
  const [topVolumeCollections, setTopVolumeCollections] =
    useState<ICollectionVolume[]>();
  const [hotCollections, setHotCollections] = useState<ICollectionVolume[]>();
  const [filter, setFilter] = useState(CollectionVolumeFilter.MarketCap);
  const [loading, setLoading] = useState(true);
  const [allCollections, setAllCollections] = useState<ICollectionData[]>();
  const { name } = useDebounce(searchValue);

  const navigate = useNavigate();

  useEffect(() => {
    void getCollectionsData();
    void getActiveCollections();
    void getTopVolumeCollections();
    void getCollections();
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

  const getCollections = async () => {
    try {
      if (collections.length === 0) setCollections(await getAllCollections());
    } catch (error) {}
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
        className="absolute top-0 left-0 w-full h-full z-10"
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

  const getFilterOptions = useMemo(() => {
    return Object.values(CollectionVolumeFilter).map((c: any) => {
      return {
        label: mapFilterTypeToValue(c as CollectionVolumeFilter),
        value: c,
      };
    });
  }, []);

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
        <Text
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
        </Text>
      </Box>
      <Box
        className="grid grid-cols-6 gap-5 overflow-scroll"
        sx={{ maxHeight: "25%", overflow: "scroll" }}
      >
        {collections?.map((c) => {
          return <CollectionItemTemp collection={c} key={c.name} />;
        })}
      </Box>
      {activeCollections && activeCollections.length ? (
        <div className="flex w-full">
          <ActiveListings activeListings={activeCollections} />
          {/* here as well */}
          {topVolumeCollections && topVolumeCollections.length > 0 && (
            <Box className="flex flex-wrap box-content cursor-pointer overflow-hidden w-1/2">
              <Box className="flex flex-row w-full justify-between items-center">
                <Text className="text-xl font-mono text-main-blue flex justify-center">
                  <span
                    className="px-4"
                    style={{
                      border: "1px solid rgb(9, 194, 246)",
                      borderBottom: "none",
                    }}
                  >
                    HOT 🔥
                  </span>
                </Text>
              </Box>

              <Box
                className="grid grid-cols-4 w-full"
                style={{
                  overflowY: "auto",
                  border: "1px solid rgb(9, 194, 246)",
                  borderBottom: "none",
                  maxHeight: "500px",
                }}
              >
                {renderHotCollections}
              </Box>
            </Box>
          )}
        </div>
      ) : loading ? (
        <></>
      ) : (
        <Skeleton
          height={150}
          borderRadius={0}
          baseColor="rgb(22,27,34)"
          highlightColor="rgb(29,35,44)"
        />
      )}

      {/* todo refactor this into component */}
      {topVolumeCollections && topVolumeCollections.length > 0 && (
        <Box
          className="flex flex-wrap
           cursor-pointer overflow-hidden w-full pt-10"
        >
          <Box className="flex flex-row w-full justify-center items-center">
            <Text className="text-xl font-mono text-main-blue flex justify-center">
              <span
                className="px-4"
                style={{
                  border: "1px solid rgb(9, 194, 246)",
                  borderBottom: "none",
                }}
              >
                sort collections by
              </span>
            </Text>
            <Select
              styles={{ ...selectStylesSecondary }}
              options={getFilterOptions}
              onChange={(e) => setFilter(e?.value as CollectionVolumeFilter)}
              defaultValue={getFilterOptions[0]}
              formatOptionLabel={(val) => {
                return (
                  <div className="w-full font-bold text-white font-md px-5">
                    {val.label}
                  </div>
                );
              }}
            />
          </Box>

          <Box
            className="grid grid-cols-4 w-full"
            style={{
              overflowY: "hidden",
              border: "1px solid rgb(9, 194, 246)",
              borderBottom: "none",
            }}
          >
            {renderTopCollections}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;

const CollectionItemTemp: FC<{ collection: ICollectionData }> = ({
  collection,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`collection?symbol=${collection.symbol}`)}
      className="flex flex-col items-center gap-5 cursor-pointer	  hover:shadow-lg hover:shadow-main-blue"
    >
      <img src={collection.image} alt="collImg" className="cursor-pointer	" />
      <p className="font-bold text-main-blue font-xl">{collection.name}</p>
    </div>
  );
};
