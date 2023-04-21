import { Box, Text } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import {
  IChainCollectionData,
  ICollectionData,
} from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import { ActiveListingItem } from "./ActiveListingItem";

const dummy: ICollectionData[] = [{
  id: '1',
  symbol: "bonkbank",
  image: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/bonkbank_pfp_1672702226532.png",
  name: "The Bonk Bank",
  description: "The Bonk Bank is Multi-Sig Governed Dao for Bonk. Our goal is to bring mass adoption to the memecoin of Solana. Features will include Staking for Bonk, Raid 4 Bonk, Bonk Bank and much more!Staking: https://staking.etakit.in/thebonkbox 100+ Game Bonksino: https://bonkbank.crashout.io/",
  twitter: "https://www.twitter.com/TheBonkBank",
  discord: "https://www.discord.gg/6UHaNVE99b",
  website: "https://bonkbank.crashout.io/",
  categories: [
    "pfps",
    "art"
  ],
  isFlagged: true,
},
{
  id: '1',
  symbol: "bonkbank",
  image: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/bonkbank_pfp_1672702226532.png",
  name: "The Bonk Bank",
  description: "The Bonk Bank is Multi-Sig Governed Dao for Bonk. Our goal is to bring mass adoption to the memecoin of Solana. Features will include Staking for Bonk, Raid 4 Bonk, Bonk Bank and much more!Staking: https://staking.etakit.in/thebonkbox 100+ Game Bonksino: https://bonkbank.crashout.io/",
  twitter: "https://www.twitter.com/TheBonkBank",
  discord: "https://www.discord.gg/6UHaNVE99b",
  website: "https://bonkbank.crashout.io/",
  categories: [
    "pfps",
    "art"
  ],
  isFlagged: true,
},
{
  id: '1',
  symbol: "bonkbank",
  image: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/bonkbank_pfp_1672702226532.png",
  name: "The Bonk Bank",
  description: "The Bonk Bank is Multi-Sig Governed Dao for Bonk. Our goal is to bring mass adoption to the memecoin of Solana. Features will include Staking for Bonk, Raid 4 Bonk, Bonk Bank and much more!Staking: https://staking.etakit.in/thebonkbox 100+ Game Bonksino: https://bonkbank.crashout.io/",
  twitter: "https://www.twitter.com/TheBonkBank",
  discord: "https://www.discord.gg/6UHaNVE99b",
  website: "https://bonkbank.crashout.io/",
  categories: [
    "pfps",
    "art"
  ],
  isFlagged: true,
},
{
  id: '1',
  symbol: "bonkbank",
  image: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/bonkbank_pfp_1672702226532.png",
  name: "The Bonk Bank",
  description: "The Bonk Bank is Multi-Sig Governed Dao for Bonk. Our goal is to bring mass adoption to the memecoin of Solana. Features will include Staking for Bonk, Raid 4 Bonk, Bonk Bank and much more!Staking: https://staking.etakit.in/thebonkbox 100+ Game Bonksino: https://bonkbank.crashout.io/",
  twitter: "https://www.twitter.com/TheBonkBank",
  discord: "https://www.discord.gg/6UHaNVE99b",
  website: "https://bonkbank.crashout.io/",
  categories: [
    "pfps",
    "art"
  ],
  isFlagged: true,
},
{
  id: '1',
  symbol: "bonkbank",
  image: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/bonkbank_pfp_1672702226532.png",
  name: "The Bonk Bank",
  description: "The Bonk Bank is Multi-Sig Governed Dao for Bonk. Our goal is to bring mass adoption to the memecoin of Solana. Features will include Staking for Bonk, Raid 4 Bonk, Bonk Bank and much more!Staking: https://staking.etakit.in/thebonkbox 100+ Game Bonksino: https://bonkbank.crashout.io/",
  twitter: "https://www.twitter.com/TheBonkBank",
  discord: "https://www.discord.gg/6UHaNVE99b",
  website: "https://bonkbank.crashout.io/",
  categories: [
    "pfps",
    "art"
  ],
  isFlagged: true,
},
{
  id: '1',
  symbol: "bonkbank",
  image: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/bonkbank_pfp_1672702226532.png",
  name: "The Bonk Bank",
  description: "The Bonk Bank is Multi-Sig Governed Dao for Bonk. Our goal is to bring mass adoption to the memecoin of Solana. Features will include Staking for Bonk, Raid 4 Bonk, Bonk Bank and much more!Staking: https://staking.etakit.in/thebonkbox 100+ Game Bonksino: https://bonkbank.crashout.io/",
  twitter: "https://www.twitter.com/TheBonkBank",
  discord: "https://www.discord.gg/6UHaNVE99b",
  website: "https://bonkbank.crashout.io/",
  categories: [
    "pfps",
    "art"
  ],
  isFlagged: true,
},
]
export const ActiveListings: FC<{
  activeListings?: ICollectionData[];
}> = ({ activeListings }) => (
  <>
    {activeListings && (
      <Box className="flex flex-col w-1/2">
        <Box className="flex flex-col justify-between items-center">
          <Text className="text-xl font-mono text-main-blue flex justify-start w-full">
            <span
              className="px-4"
              style={{
                border: "1px solid rgb(9, 194, 246)",
                borderBottom: "none",
              }}
            >
              active derugs 🛠
            </span>
          </Text>
        </Box>
        <Box
          className="flex flex-wrap box-content cursor-pointer overflow-hidden w-full"
          style={{ border: "1px solid rgb(9, 194, 246)", borderRight: 'none', borderBottom: 'none', height: '400px', overflowY: "scroll" }}
        >
          {activeListings.map((cd) => {
            console.log(cd, 'cd');

            return <ActiveListingItem collectionData={cd} />;
          })}
        </Box>
      </Box>
    )}
  </>
);
