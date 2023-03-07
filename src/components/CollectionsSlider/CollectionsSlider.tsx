import React, { FC, useMemo, useState } from "react";
import Marqee from "react-fast-marquee";
import "react-alice-carousel/lib/alice-carousel.css";
import { Box } from "@primer/react";
import { collectionsStore } from "../../stores/collectionsStore";
import Balancer from "react-wrap-balancer";
import { useNavigate } from "react-router";
import { COLLECTION } from "../../utilities/constants";
const CollectionsSlider: FC = () => {
  const { collections } = collectionsStore.getState();
  const [hoveredCollection, setHoveredCollection] = useState<
    number | undefined
  >();

  const navigate = useNavigate();

  const renderCollections = useMemo(() => {
    return collections.map((c, index) => {
      return (
        <Box
          className="box-content cursor-pointer h-48 w-48 overflow-hidden border-r-4 border-t-4 p-4"
          key={index}
          onMouseEnter={() => setHoveredCollection(index)}
          onMouseLeave={() => setHoveredCollection(undefined)}
          onClick={() => navigate(`${COLLECTION}?symbol=${c.name}`)}
        >
          {hoveredCollection === index ? (
            <div className="relative flex justify-center">
              <img
                src={c.image}
                alt="collectionImg"
                className="drop-shadow-2xl"
                style={{
                  opacity: "0.6",
                  filter: "drop-shadow(rgb(9, 194, 246) 0px 0px 15px)",
                }}
              />
              <Balancer className="absolute text-xl font-bold inset-y-1/3 font-bold tracking-[-0.02em] font-mono">
                {c.name}
              </Balancer>
            </div>
          ) : (
            <img src={c.image} alt="collectionImg" />
          )}
        </Box>
      );
    });
  }, [collections, hoveredCollection]);
  return (
    <Box>
      <Marqee pauseOnHover loop={0} speed={90} direction={"right"}>
        {renderCollections}
      </Marqee>
      <Marqee pauseOnHover loop={0} speed={90} direction={"left"}>
        {renderCollections}
      </Marqee>
    </Box>
  );
};

export default CollectionsSlider;
