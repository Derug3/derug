import { FC, useContext, useMemo } from "react";
import Marqee from "react-fast-marquee";
import "react-alice-carousel/lib/alice-carousel.css";
import { Box } from "@primer/react";
import { CollectionsContext } from "../../stores/collectionsStore";
const CollectionsSlider: FC = () => {
  const { collections } = useContext(CollectionsContext);

  const renderCollections = useMemo(() => {
    return collections?.map((c) => {
      return (
        <Box sx={{ width: "10em", padding: "0.5em" }} key={c.id}>
          <img src={c.image} alt="collectionImg" />
          {c.name}
        </Box>
      );
    });
  }, [collections]);
  return (
    <Box sx={{ zIndex: -1 }}>
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
