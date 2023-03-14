import derugPfp from "../../assets/derugPfp.png";
import { Button, Header } from "@primer/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS, HOME } from "../../utilities/constants";
import { useNavigate } from "react-router";

const settings = ["Twitter", "Discord"];

const HeaderNav: FC = () => {
  const navigate = useNavigate();

  return (
    <Header
      className="flex items-center w-full justify-between"
      sx={{ p: 0, padding: "0.5em 1.5em", height: "120px" }}
    >
      <Header.Item onClick={() => navigate(HOME)}>
        <img
          src={derugPfp}
          style={{
            width: "12em",
            paddingLeft: "1em",
            cursor: "pointer",
            filter: "drop-shadow(rgb(9, 194, 246) 0px 0px 1px)",
          }}
        />
      </Header.Item>
      <div className="flex">
        {/* <Header.Item full>
          <motion.button className="font-mono" {...FADE_IN_ANIMATION_SETTINGS}>
            
          </motion.button>
        </Header.Item> */}
        <Header.Item full>
          <motion.button className="font-mono" {...FADE_IN_ANIMATION_SETTINGS}>
            <WalletMultiButton
              style={{
                // backgroundColor: "rgba(0,183,234,15px)",
                fontSize: "1em",
                fontFamily: "monospace",
                filter: "drop-shadow(rgb(9, 194, 246) 0px 0px 15px)",
              }}
            />
          </motion.button>
        </Header.Item>
      </div>
    </Header>
  );
};

export default HeaderNav;
