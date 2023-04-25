import derugPfp from "../../assets/derugPfp.png";
import { ActionList, Button, Header } from "@primer/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS, HOME } from "../../utilities/constants";
import { useNavigate } from "react-router";
import { userStore } from "../../stores/userStore";
import { ActionMenu } from "@primer/react";
import {
  authorizeTwitter,
  deleteTwitterData,
  getUserTwitterData,
} from "../../api/twitter.api";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { FaUserCircle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
const settings = ["Twitter", "Discord"];

const HeaderNav: FC = () => {
  const navigate = useNavigate();

  const { setUserData, userData } = userStore();

  const slug = useSearchParams()[0].get("symbol");

  const wallet = useAnchorWallet();

  useEffect(() => {
    if (wallet) void storeUserData();
  }, [wallet]);

  const storeUserData = async () => {
    try {
      setUserData(await getUserTwitterData(wallet?.publicKey.toString()!));
    } catch (error) {
      setUserData(undefined);
    }
  };

  const linkTwitter = async () => {
    try {
      if (wallet)
        await authorizeTwitter(slug ?? "", wallet?.publicKey.toString()!);
    } catch (error) {
      toast.error("Failed to link twitter");
    }
  };

  const unlinkTwitter = async () => {
    if (wallet && userData) {
      try {
        await deleteTwitterData(wallet.publicKey.toString());
        setUserData(undefined);
        toast.success("Twitter succesfully unlinked");
      } catch (error) {
        toast.error("Failed to unlink twitter");
      }
    }
  };

  return (
    <Header
      className="flex items-center w-full justify-between -z-10"
      sx={{
        p: 0,
        padding: "0.5em 1.5em",
        background: "transparent",
        borderBottom: "1px solid  rgb(9, 194, 246)",
      }}
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
        <Header.Item full className="flex gap-10">
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
          {wallet && wallet.publicKey && (
            <div className="flex flex-row gap-3 cursor-pointer" onClick={userData ? unlinkTwitter : linkTwitter}>
              <div
                onClick={userData ? unlinkTwitter : linkTwitter}
                className="w-full"
              >
                {userData && (
                  <img
                    src={userData.image}
                    className="w-10"
                  />
                )}
                <p className="flex gap-3 text-md">
                  {userData ? userData.twitterHandle : <>
                    <FaTwitter
                      style={{
                        fontSize: "1.25em",
                        color: "rgb(9, 194, 246) ",
                      }} />
                    <span>link twitter </span>
                  </>}
                </p>

              </div>
            </div>




            // <ActionMenu>
            //   <ActionMenu.Button
            //     sx={{
            //       background: "transparent",
            //       border: "none",
            //       "&:hover": {
            //         background: "transparen",
            //       },
            //     }}
            //   >
            //     {/* <FaUserCircle
            //       style={{
            //         fontSize: "2em",
            //         cursor: "pointer",
            //         color: "rgb(9, 194, 246) ",
            //       }}
            //     /> */}

            //   </ActionMenu.Button>
            //   <ActionMenu.Overlay
            //     className="z-20"
            //     onClick={(e) => e.preventDefault()}
            //     sx={{
            //       background: "black",
            //       padding: 0,
            //       borderRadius: 0,
            //     }}
            //   >
            //     <ActionList className="z-10">
            //       <ActionList.Item className="bg-red-200">
            //         <div
            //           onClick={userData ? unlinkTwitter : linkTwitter}
            //           className="w-full border-b-[1px] border-main-blue p-0 
            //           flex justify-between items-center pb-2 z-20"
            //         >
            //           {userData && (
            //             <img
            //               src={userData.image}
            //               className="rounded-[50px] w-10"
            //             />
            //           )}
            //           <p className="text-main-blue font-bold text-md">
            //             {userData ? userData.twitterHandle : "Link twitter"}
            //           </p>
            //           {userData ? (
            //             <BsLink45Deg
            //               style={{
            //                 fontSize: "1.25em",
            //                 color: "red",
            //               }}
            //             />
            //           ) : (
            //             <FaTwitter
            //               style={{
            //                 fontSize: "1.25em",
            //                 color: "rgb(9, 194, 246) ",
            //               }}
            //             />
            //           )}
            //         </div>
            //       </ActionList.Item>
            //     </ActionList>
            //   </ActionMenu.Overlay>
            // </ActionMenu>
          )}
        </Header.Item>
      </div>
    </Header>
  );
};

export default HeaderNav;
