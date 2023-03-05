import { Heading } from "@primer/react";

export const header = () => (
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
      Floor price<br></br> 0.01 SOL
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
      Total volume<br></br> 323 sol
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
      Listed <br></br> 123
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
      Total supply <br></br> 10k
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
      Owners <br></br> 5.123
    </Heading>
  </div>
);
