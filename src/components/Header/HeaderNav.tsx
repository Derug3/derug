import derugPfp from "../../assets/derugPfp.png";
import { Header } from "@primer/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS, HOME } from "../../utilities/constants";
import { useNavigate } from "react-router";

const settings = ["Twitter", "Discord"];

const HeaderNav: FC = () => {
  const [isSettingsOpen, toggleIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Header
      sx={{ p: 0 }}
      className="bg-gradient-to-l from-white-100 from-gray-300 to-cyan-200 to-blue-200 to-gray-300 drop-shadow-lg"
    >
      <Header.Item onClick={() => navigate(HOME)}>
        <img
          src={derugPfp}
          style={{ width: "12em", paddingLeft: "1em", cursor: "pointer" }}
        />
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
