import React, { FC, useMemo } from "react";
import Marqee from "react-fast-marquee";
import "react-alice-carousel/lib/alice-carousel.css";
import { Box } from "@primer/react";
import { collectionsStore } from "../../stores/collectionsStore";
const CollectionsSlider: FC = () => {
  const { collections } = collectionsStore.getState();
  const renderCollections = useMemo(() => {
    return collections.map((c) => {
      return (
        <Box sx={{ width: "10em", padding: "0.5em" }} key={c.id}>
          <img
            src={c.image}
            alt="collectionImg"
            style={{ maxWidth: "150px", maxHeight: "260px" }}
          />
          <span>{c.name}</span>
        </Box>
      );
    });
  }, [collections]);
  return (
    <Box>
      <Marqee loop={0} speed={90} direction={"right"}>
        <Box style={{ display: "flex" }}>{renderCollections}</Box>
      </Marqee>
      <Marqee loop={0} speed={90} direction={"left"}>
        <Box style={{ display: "flex" }}>{renderCollections}</Box>
      </Marqee>
    </Box>
  );
};

export default CollectionsSlider;
