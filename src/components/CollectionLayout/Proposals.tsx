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
        <div className="flex flex-col gap-1 items-center justify-center pl-1 pr-3 py-3">
          {requests ? (
            requests.map((el, index) => (
              <div
                className="flex  w-full items-center justify-around py-2"
                style={{
                  border: `2px solid rgb(9, 194, 246)`,
                  borderRadius: "4px",
                  padding: "10px",
                  background: "rgb(9, 194, 246,.15)",
                }}
              >
                <div className="flex gap-3 items-center">
                  <Balancer
                    className="text-lg cursor-pointer text-white font-mono"
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentRequest(el);
                    }}
                  >
                    <span style={{ fontSize: "1em", opacity: 0.7 }}>
                      #{index + 1}
                    </span>{" "}
                    {el.title}{" "}
                  </Balancer>
                  {el.utility &&
                    el.utility.map((u, i) => (
                      <div
                        className="text-sm font-mono"
                        style={{
                          borderRightWidth:
                            i !== el.utility.length - 1 ? "4px" : "0px",
                          paddingRight:
                            i !== el.utility.length - 1 ? "1em" : "0px",
                          color: "rgb(9, 194, 246)",
                          filter: "drop-shadow(white 0px 0px 3px)",
                        }}
                      >
                        {u.name}
                      </div>
                    ))}
                </div>
                <div className="flex items-center">
                  <Button variant="invisible" sx={{ color: "rgba(9,194,246)" }}>
                    Vote
                  </Button>
                  <ProgressBar
                    progress={50}
                    bg="rgba(9,194,246)"
                    sx={{
                      width: "280px",
                      filter: "drop-shadow(white 0px 0px 3px)",
                      height: "16px",
                      borderRadius: 0,
                      color: "rgb(179, 255, 174)",
                    }}
                  />
                  <Balancer
                    className="text-lg cursor-pointer text-white font-mono px-5"
                    style={{ fontSize: "1em", opacity: 0.2 }}
                  >
                    <span
                      style={{
                        borderRadius: "4px",
                        padding: "10px",
                        background: "rgb(9, 194, 246,.15)",
                        filter: "drop-shadow(#2dd4bf 0px 0px 10px)",
                      }}
                    >
                      Fri May 06
                    </span>
                  </Balancer>
                </div>
              </div>
            ))
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
