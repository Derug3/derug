import CollectionsSlider from "../components/CollectionsSlider/CollectionsSlider";
import { Box, Text } from "@primer/react";
import { useEffect, useState } from "react";
import { getByNameOrSlug, getRandomCollections } from "../api/collections.api";
import { collectionsStore } from "../stores/collectionsStore";
import useDebounce from "../hooks/useDebounce";
import { ICollectionData } from "../interface/collections.interface";
import Select from "react-select";
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
    if (e && e !== "") {
      toggleLoading(true);
      setSearchValue(e);
    } else {
      setFilteredCollections(collections);
    }
  };

  const searchByName = async () => {
    try {
      if (name && name !== "") {
        const collectionsByName = await getByNameOrSlug(name);
        console.log(collectionsByName, "CBN");

        setFilteredCollections(collectionsByName);
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
      </Box>
      <Box sx={{ width: "50%", margin: "auto", zIndex: 1 }}>
        <Select
          placeholder="Search rugged collections"
          isLoading={loading}
          onInputChange={handleSearch}
          options={filteredCollections}
          styles={{
            menu: (base, props) => {
              return {
                zIndex: 1,
              };
            },
          }}
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
                style={{ borderRadius: "50%", width: "2.5em" }}
                src={e.image}
              />
              <Text as={"h3"}>{e.name}</Text>
            </Box>
          )}
        />
      </Box>
      <CollectionsSlider />
    </Box>
  );
};

export default HomePage;
