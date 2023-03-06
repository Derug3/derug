import { Heading } from "@primer/react";
import { ICollectionStats } from "../../interface/collections.interface";

export const header = (collection?: ICollectionStats) => (
  <div className="flex w-full self-start bg-gradient-to-r from-cyan-100 from-cyan-300 to-blue-100 to-blue-300 gap-4 font-mono text-gray-700 leading-6">
    {/* <Heading
      sx={{
        fontSize: 1,
        mb: 2,
        px: 2,
        textAlign: "center",
        alignSelf: "center",
      }}
    >
      {collection.json?.name}
    </Heading> */}
    <Heading
      sx={{
        fontSize: 1,
        mb: 2,
        px: 2,
        textAlign: "center",
        alignSelf: "center",
      }}
    >
      Floor price<br></br> {collection?.fp} SOL
    </Heading>
    <Heading
      sx={{
        fontSize: 1,
        mb: 2,
        px: 2,
        textAlign: "center",
        alignSelf: "center",
      }}
    >
      Market cap<br></br> {collection?.marketCap} sol
    </Heading>
    <Heading
      sx={{
        fontSize: 1,
        mb: 2,
        px: 2,
        textAlign: "center",
        alignSelf: "center",
      }}
    >
      Listed <br></br> {collection?.numListed}
    </Heading>
    <Heading
      sx={{
        fontSize: 1,
        mb: 2,
        px: 2,
        textAlign: "center",
        alignSelf: "center",
      }}
    >
      Total supply <br></br> {collection?.numMints}
    </Heading>
    <Heading
      sx={{
        fontSize: 1,
        mb: 2,
        px: 2,
        textAlign: "center",
        alignSelf: "center",
      }}
    >
      First list date <br></br> {collection?.firstListed.toDateString()}
    </Heading>
  </div>
);
