import { TabNav, Text } from "@primer/react";
import { motion } from "framer-motion";
import {
  ICollectionData,
  ICollectionStats,
  ITrait,
} from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import TraitsList from "../Traits/TraitsList";

export const pane = (
  selectedInfo: string,
  setSelectedInfo: (s: string) => void,
  iframeRef: any,
  traits: ITrait[]
) => (
  <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
      <TabNav aria-label="Main" className="flex w-full">
        <TabNav.Link
          onClick={() => setSelectedInfo("description")}
          sx={{ cursor: "pointer" }}
          selected={selectedInfo === "description"}
        >
          Description
        </TabNav.Link>
        <TabNav.Link
          onClick={() => setSelectedInfo("traits")}
          sx={{ cursor: "pointer" }}
          selected={selectedInfo === "traits"}
        >
          Traits
        </TabNav.Link>
        <TabNav.Link
          onClick={() => setSelectedInfo("solanafm")}
          sx={{ cursor: "pointer" }}
          selected={selectedInfo === "solanafm"}
        >
          SolanaFM
        </TabNav.Link>
      </TabNav>

      {(selectedInfo === "description" || selectedInfo === "") && (
        <Text id="description" as="p" sx={{ p: 2 }}>
          text
        </Text>
      )}
      {selectedInfo === "traits" && <TraitsList traits={traits} />}
      {selectedInfo === "solanafm" && (
        <div id="solanafm" className="flex w-full">
          <iframe
            ref={iframeRef}
            height="600px"
            width="100%"
            src={`https://solana.fm/address/HUxWyo9a5uTxzLdSSY1LVsndnHfYkJhkRoP51ghLYEs7?cluster=devnet-solana`}
          />
        </div>
      )}
    </motion.div>
  </motion.div>
);
