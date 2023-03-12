import {
  Button,
  Box,
  Dialog,
  FormControl,
  ProgressBar,
  TextInput,
  Tooltip,
} from "@primer/react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { FC, useContext, useRef, useState } from "react";
import Balancer from "react-wrap-balancer";
import { DerugStatus } from "../../enums/collections.enums";
import {
  ICollectionDerugData,
  IRequest,
} from "../../interface/collections.interface";
import { CollectionContext } from "../../stores/collectionContext";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const DerugRequestItem: FC<{
  derugRequest: IRequest;
  index: number;
}> = ({ derugRequest, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IRequest>();
  const returnFocusRef = useRef(null);
  const { collection, collectionDerug } = useContext(CollectionContext);

  const showVoteButton = () => {
    return (
      collectionDerug?.status === DerugStatus.Initialized ||
      collectionDerug?.status === DerugStatus.Voting
    );
  };

  function showClaimButton() {
    return collectionDerug?.status === DerugStatus.Completed;
  }

  function showRemintButton() {
    return collectionDerug?.status === DerugStatus.Reminting;
  }

  return (
    <div
      className="flex w-full items-center py-2"
      style={{
        borderRadius: "4px",
        padding: "10px",
        background: "rgb(9, 194, 246,.15)",
      }}
    >
      <div className="flex gap-3 items-center justify-start w-1/2	ml-7">
        <Balancer
          className="text-lg cursor-pointer text-white font-mono"
          onClick={() => {
            setIsOpen(true);
            setCurrentRequest(derugRequest);
          }}
        >
          <span style={{ fontSize: "1em", opacity: 0.7 }}>#{index + 1}</span>{" "}
          {""}{" "}
        </Balancer>
        {derugRequest.utility &&
          derugRequest.utility.map((u, i) => (
            <Tooltip
              sx={{
                "::after": {
                  fontSize: "1em",
                  backgroundColor: "#282C34",
                },
              }}
              direction="e"
              aria-labderugRequest={u.description}
              noDelay={true}
            >
              <div
                className="text-sm font-mono cursor-hderugRequestp"
                style={{
                  borderRightWidth:
                    i !== derugRequest.utility.length - 1 ? "1px" : "0px",
                  paddingRight:
                    i !== derugRequest.utility.length - 1 ? "1em" : "0px",
                  color: "rgb(9, 194, 246)",
                  filter: "drop-shadow(white 0px 0px 3px)",
                }}
              >
                {" "}
                {u.title}
              </div>
            </Tooltip>
          ))}
      </div>
      <div className="flex items-center justify-end w-1/2">
        {showVoteButton() && (
          <Button variant="invisible" sx={{ color: "rgba(9,194,246)" }}>
            Vote
          </Button>
        )}

        {showClaimButton() && (
          <Button variant="invisible" sx={{ color: "rgba(9,194,246)" }}>
            Claim victory
          </Button>
        )}
        {showRemintButton() && (
          <Button variant="invisible" sx={{ color: "rgba(9,194,246)" }}>
            Remint
          </Button>
        )}

        <ProgressBar
          progress={derugRequest.voteCount / (collection?.numMints ?? 1)}
          bg="rgba(9,194,246)"
          sx={{
            width: "280px",
            filter: "drop-shadow(white 0px 0px 3px)",
            height: "16px",
            borderRadius: 0,
            color: "rgb(179, 255, 174)",
            marginLeft: "1em",
          }}
        />
        <Balancer
          className="text-lg cursor-pointer text-white font-mono px-5"
          style={{ fontSize: "1em", opacity: 0.2 }}
        >
          <span
            style={{
              padding: "10px",
              filter: "drop-shadow(#2dd4bf 0px 0px 10px)",
            }}
          >
            {dayjs
              .unix(derugRequest.createdAt)
              .toDate()
              .toString()
              .slice(0, 10)}
          </span>
        </Balancer>
      </div>
    </div>
  );
};
export default DerugRequestItem;
