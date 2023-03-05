import derugPfp from "../../assets/derugPfp.png";
import { Header } from "@primer/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "../../utilities/constants";

const settings = ["Twitter", "Discord"];

const HeaderNav: FC = () => {
  const [isSettingsOpen, toggleIsSettingsOpen] = useState(false);

  return (
    <Header
      sx={{ p: 0 }}
      className="bg-gradient-to-l from-white-100 from-gray-300 to-cyan-200 to-blue-200 to-gray-300 drop-shadow-lg"
      style={{
        boxShadow:
          "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Header.Item>
        <img src={derugPfp} style={{ width: "12em", paddingLeft: "1em" }} />
      </Header.Item>

      <Header.Item full sx={{ display: "flex", justifyContent: "flex-end" }}>
        <motion.button
          className="hover:bg-grey-100 flex rounded-full border border-black p-1.5 px-4  text-sm transition-all"
          {...FADE_IN_ANIMATION_SETTINGS}
        >
          <WalletMultiButton
            style={{
              backgroundColor: "transparent",
              fontSize: "0.875em",
              height: "1.75em",
              padding: "0 0.5em",
              display: "flex",
              color: "black",
            }}
            className="transition-all hover:text-gray-600"
          />
        </motion.button>
      </Header.Item>
    </Header>
  );
};

export default HeaderNav;
