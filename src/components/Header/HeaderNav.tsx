import derugPfp from "../../assets/derugPfp.png";
import { Header } from "@primer/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";

const settings = ["Twitter", "Discord"];

const HeaderNav = () => {
  const [isSettingsOpen, toggleIsSettingsOpen] = useState(false);

  return (
    <Header sx={{ background: "#f8f8f8" }}>
      <Header.Item>
        <img src={derugPfp} style={{ width: "12em" }} />
      </Header.Item>

      <Header.Item full sx={{ display: "flex", justifyContent: "flex-end" }}>
        <WalletMultiButton
          style={{
            backgroundColor: "rgb(9,190,230)",
            color: "black",
            maxWidth: "10em",
          }}
        />
      </Header.Item>
    </Header>
  );
};

export default HeaderNav;
