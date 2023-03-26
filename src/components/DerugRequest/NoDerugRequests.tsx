import { Button, Dialog } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { FC, useContext, useMemo, useRef, useState } from "react";
import { DerugStatus } from "../../enums/collections.enums";
import { IRequest } from "../../interface/collections.interface";
import { CollectionContext } from "../../stores/collectionContext";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const NoDerugRequests: FC<{
  openDerugModal: (value: boolean) => void;
}> = ({ openDerugModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IRequest>();
  const returnFocusRef = useRef(null);

  const { derugRequests, collectionDerug } = useContext(CollectionContext);
  const wallet = useWallet();
  const showAddDerugButton = useMemo(() => {
    return (
      wallet &&
      wallet.publicKey &&
      (!collectionDerug ||
        (collectionDerug &&
          dayjs(collectionDerug?.periodEnd).isAfter(dayjs()))) &&
      !derugRequests?.find(
        (dr) => dr.derugger.toString() === wallet.publicKey?.toString()
      )
    );
  }, [derugRequests, collectionDerug]);

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
        <div className="text-base w-full flex items-center flex-col py-10 font-mono mt-3 text-white">
          There is no derug request yet.
          {showAddDerugButton && (
            <Button
              className="bg-transparent font-mono font-bold text-lg mt-5"
              onClick={() => openDerugModal(true)}
              sx={{ borderRadius: 0, padding: "0.5em 5em" }}
            >
              Add derug request
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NoDerugRequests;
