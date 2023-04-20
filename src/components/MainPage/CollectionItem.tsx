import { Box } from "@primer/react";
import React, { FC } from "react";
import { useNavigate } from "react-router";
import { ICollectionVolume } from "../../interface/collections.interface";

const CollectionItem: FC<{ collection: ICollectionVolume }> = ({
  collection,
}) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() =>
        navigate(`/collection?symbol=${collection.collection.symbol}`)
      }
      className="flex flex-col gap-5 hover:shadow-lg cursor-pointer 
    hover:shadow-main-blue border-[1px] items-center"
    >
      <img
        src={collection.collection.image}
        alt="collectionImage"
        className="w-20 rounded-none"
      />
      <p className="text-xl font-bold font-white">
        {collection.collection.name}
      </p>
      <Box className="w-full p-2 flex items-center jusitfy-between">
        <p className="text-lg font-bold">
          Floor price{" "}
          <span className="font-green-color">{collection.floorPrice} SOL</span>
        </p>
        <p className="text-lg font-bold">
          Market cap{" "}
          <span className="text-main-blue">{collection.marketCap}</span>
        </p>
      </Box>
    </Box>
  );
};

export default CollectionItem;
