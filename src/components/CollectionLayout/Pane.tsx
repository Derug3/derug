import { TabNav, Text } from "@primer/react";
import { motion } from "framer-motion";
import { ITrait } from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import TraitsList from "../Traits/TraitsList";

const getNavStyling = (tab: string, selected: string) => {
  return {
    backgroundColor: tab === selected ? "rgba(9, 194, 246,.35)" : "white",
    color: tab === selected ? "rgba(9, 194, 246)" : "#8696A7",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "monospace",
    border:
      tab !== selected ? "2px solid #BBC4CD" : "2px solid rgba(9, 194, 246)",
    cursor: "pointer",
    borderBottom: "none",
    "&:hover": {
      color: tab === selected ? "black" : "rgba(9, 194, 246)",
    },
  };
};

export const pane = (
  selectedInfo: string,
  setSelectedInfo: (s: string) => void,
  iframeRef: any,
  traits: ITrait[]
) => (
  <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
    <motion.div
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      className="pl-10 sticky"
    >
      <TabNav
        aria-label="Main"
        className="flex w-full "
        style={{
          borderBottom: "2px solid  rgba(9, 194, 246)",
          position: "sticky",
        }}
      >
        <TabNav.Link
          onClick={() => setSelectedInfo("traits")}
          sx={getNavStyling(selectedInfo, "traits")}
        >
          TRAITS
        </TabNav.Link>
        <TabNav.Link
          onClick={() => setSelectedInfo("description")}
          sx={getNavStyling(selectedInfo, "description")}
        >
          DESCRIPTION
        </TabNav.Link>
        <TabNav.Link
          onClick={() => setSelectedInfo("solanafm")}
          sx={getNavStyling(selectedInfo, "solanafm")}
        >
          SOLANAFM
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
