import React, { FC, useMemo, useState } from "react";
import Marqee from "react-fast-marquee";
import "react-alice-carousel/lib/alice-carousel.css";
import { collectionsStore } from "../../stores/collectionsStore";
import Balancer from "react-wrap-balancer";
import { useNavigate } from "react-router";
import { COLLECTION } from "../../utilities/constants";
import { Box, Text } from "@primer/react";

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
          className="box-content cursor-pointer h-36 w-36 overflow-hidden border-r-4 border-t-4 p-4 border-slate-700"
          key={index}
          onMouseEnter={() => setHoveredCollection(index)}
          onMouseLeave={() => setHoveredCollection(undefined)}
          onClick={() => navigate(`${COLLECTION}?symbol=${c.symbol}`)}
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
              <Balancer className="absolute text-xl text-white font-bold inset-y-1/3 font-bold tracking-[-0.02em] font-mono">
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
    <Box className="relative">
      <Text
        className="text-xl font-mono text-main-blue flex justify-center w-full absolute"
        style={{ transform: "translateY(-100%)" }}
      >
        <span
          className="border-r-4 border-t-4 border-l-4 border-slate-700 px-4"
          style={{ backgroundColor: "#0d1117" }}
        >
          browse derugs
        </span>
      </Text>
      <Box className="w-full">
        <Marqee
          pauseOnHover
          loop={0}
          speed={90}
          direction={"left"}
          gradient={false}
        >
          {renderCollections}
        </Marqee>
        <Marqee
          pauseOnHover
          loop={0}
          speed={90}
          direction={"right"}
          gradient={false}
        >
          {renderCollections}
        </Marqee>
      </Box>
    </Box>
  );
};

export default CollectionsSlider;
