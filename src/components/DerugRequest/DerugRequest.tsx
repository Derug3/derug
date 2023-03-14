import { Button, Dialog } from "@primer/react";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { FC, useContext, useMemo, useRef, useState } from "react";
import { IRequest } from "../../interface/collections.interface";
import { CollectionContext } from "../../stores/collectionContext";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import DerugRequestItem from "./DerugRequestItem";

export const DerugRequest: FC<{
  openDerugModal: (value: boolean) => void;
}> = ({ openDerugModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IRequest>();
  const returnFocusRef = useRef(null);

  const { derugRequests, collectionDerug } = useContext(CollectionContext);

  const wallet = useWallet();
  const renderDerugRequests = useMemo(() => {
    return derugRequests?.map((dr, index) => {
      return (
        <>
          <DerugRequestItem
            derugRequest={dr}
            index={index}
            key={dr.address.toString()}
          />
        </>
      );
    });
  }, [derugRequests]);

  const getPercentage = () => {
    if (collectionDerug?.addedRequests.length == 1) {
      return 2;
    }
    if (collectionDerug && collectionDerug?.addedRequests.length < 5) {
      return collectionDerug.addedRequests.length;
    }
    return 5;
  };

  const getWinningRequest = useMemo(() => {
    if (
      wallet &&
      wallet.publicKey &&
      dayjs(collectionDerug?.periodEnd).isBefore(dayjs())
    ) {
      const percentage = getPercentage();
      const majorWinner = collectionDerug?.addedRequests.find(
        (ac) => ac.voteCount > collectionDerug.totalSupply / percentage
      );
      if (majorWinner) {
        const request = derugRequests?.find(
          (dr) => dr.address.toString() === majorWinner.request.toString()
        );
        if (request?.derugger.toString() === wallet.publicKey.toString()) {
          return request;
        }
      }
    }
  }, [wallet]);

  return (
    <motion.div
      className="flex w-full flex-col mt-5"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)" }}
    >
      <Dialog
        returnFocusRef={returnFocusRef}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        sx={{
          width: "600px",
          filter: "drop-shadow(rgb(246, 242, 9) 0px 0px 10px)",
        }}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id">Derug request</Dialog.Header>
        {currentRequest?.derugger.toString()}
      </Dialog>
      <div className="w-full">
        <div className="flex w-full flex-col gap-1 items-center justify-around p-3">
          {derugRequests ? (
            <>{getWinningRequest ?? renderDerugRequests}</>
          ) : (
            <div className="text-base font-mono mt-3 text-white">
              There is no derug request yet.
              {wallet && (
                <Button
                  className="bg-transparent w-full font-mono font-bold text-lg mt-5"
                  style={{
                    filter: "drop-shadow(#2dd4bf 0px 0px 3px)",
                    backgroundColor: "rgba(0,183,234,15px)",
                    fontFamily: "monospace",
                    borderColor: "rgba(9,194,246)",
                  }}
                  onClick={() => openDerugModal(true)}
                >
                  Add derug request
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DerugRequest;
