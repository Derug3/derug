import { styled } from "@material-ui/core";
import CollectionsSlider from "../components/CollectionsSlider/CollectionsSlider";
import { DUMMY_COLLECTIONS } from "../components/dummy/collections.dummy";
import { Autocomplete, Box, Text } from "@primer/react";
import { useEffect, useState } from "react";
import { getByNameOrSlug, getRandomCollections } from "../api/collections.api";
import { collectionsStore } from "../stores/collectionsStore";
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

      <CollectionsSlider />
    </Box>
  );
};

export default HomePage;
