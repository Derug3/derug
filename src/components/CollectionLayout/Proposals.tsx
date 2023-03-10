import {
  Button,
  Box,
  Dialog,
  FormControl,
  ProgressBar,
  TextInput,
} from "@primer/react";
import { motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import Balancer from "react-wrap-balancer";
import { IRequest } from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const Proposals: FC<{
  requests?: IRequest[];
}> = ({ requests }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IRequest>();
  const returnFocusRef = useRef(null);

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
        {currentRequest?.title}
      </Dialog>
      <div className="w-full">
        <div className="flex flex-col place-content-evenly justify-center w-full pl-5 font-mono">
          {requests ? (
            requests.map((el, index) => (
              <div className="flex gap-3 items-center justify-center py-2">
                <Balancer
                  className="text-lg cursor-pointer font-mono"
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentRequest(el);
                  }}
                >
                  #{index} {el.title}{" "}
                </Balancer>
                <ProgressBar progress={50} inline sx={{ width: "200px" }} />
                <Button>Vote</Button>
              </div>
            ))
          ) : (
            <div
              className="text-base font-mono mt-3"
              style={{ filter: "drop-shadow(rgb(246, 242, 9) 0px 0px 15px)" }}
            >
              There is no derug request yet.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
