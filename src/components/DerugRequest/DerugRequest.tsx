import { Box, Dialog } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useContext, useMemo, useRef, useState } from "react";
import { IRequest } from "../../interface/collections.interface";
import { CollectionContext } from "../../stores/collectionContext";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import DerugRequestItem from "./DerugRequestItem";

export const DerugRequest: FC<{}> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const returnFocusRef = useRef(null);

  const { derugRequests } = useContext(CollectionContext);

  const renderDerugRequests = useMemo(() => {
    return derugRequests?.map((dr, index) => {
      return (
        <DerugRequestItem
          derugRequest={dr}
          index={index}
          key={dr.address.toString()}
        />
      );
    });
  }, [derugRequests]);

  return (
    <motion.div
      className="flex w-full flex-col"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      style={{ borderTop: "2px solid  rgba(9, 194, 246)" }}
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
        {/* {currentRequest?.derugger.toString()} */}
      </Dialog>
      <div className="w-full">
        <div className="flex flex-col gap-1 items-center justify-center pl-1 pr-3 py-3">
          {derugRequests ? (
            <>{renderDerugRequests}</>
          ) : (
            <div
              className="text-base font-mono mt-3 text-white"
              style={{ filter: "drop-shadow(#2dd4bf 0px 0px 10px)" }}
            >
              There is no derug request yet.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DerugRequest;
