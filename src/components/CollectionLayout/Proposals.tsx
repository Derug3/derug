import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  FormControl,
  ProgressBar,
  Textarea,
  TextInput,
  Token,
} from "@primer/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Balancer from "react-wrap-balancer";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

interface IRequest {
  title: string;
  description: string;
}

export const Proposals = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const returnFocusRef = useRef(null);
  const [request, setRequest] = useState<IRequest[]>();

  console.log(request, "request");

  const addUtility = () => {
    setRequest((prev) =>
      prev
        ? [...prev, { title, description: desc }]
        : [{ title, description: desc }]
    );
    setTitle("");
    setDesc("");
  };
  const submitRequest = () => {
    // setRequest((prev) =>
    //   prev
    //     ? [...prev, { title, description: desc }]
    //     : [{ title, description: desc }]
    // );
    setIsOpen(false);
  };

  return (
    <motion.div
      className="flex w-full flex-col"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <div className="w-full">
        {/* initial screen */}
        <div className="flex flex-col items-center justify-center w-full my-5 font-mono">
          There is no derug request yet.
          <Button
            className="mt-3"
            ref={returnFocusRef}
            onClick={() => setIsOpen(true)}
          >
            Create derug request{" "}
          </Button>
          <Dialog
            returnFocusRef={returnFocusRef}
            isOpen={isOpen}
            onDismiss={() => setIsOpen(false)}
            sx={{ width: "600px" }}
            aria-labelledby="header-id"
          >
            <Dialog.Header id="header-id">Derug request</Dialog.Header>
            <Box p={3} className="flex justify-center flex-col gap-3">
              <div className="flex gap-1">
                {request &&
                  request.map((el) => (
                    <Token
                      sx={{ width: "fit-content", cursor: "pointer" }}
                      text={el.title}
                      onRemove={() => {
                        console.log("remove me");
                      }}
                      onClick={() => {
                        setTitle(el.title);
                        setDesc(el.description);
                      }}
                    />
                  ))}
              </div>
              <FormControl sx={{ display: "flex", width: "100%" }}>
                <FormControl.Label>Utility name</FormControl.Label>
                <TextInput
                  sx={{ width: "100%" }}
                  placeholder="Utility"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Description</FormControl.Label>
                <Textarea
                  sx={{ width: "100%" }}
                  placeholder="Enter a description"
                  value={desc}
                  rows={3}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>
              <div className="flex justify-between">
                <Button
                  className="mt-3"
                  variant="outline"
                  ref={returnFocusRef}
                  onClick={() => addUtility()}
                >
                  Add utility
                </Button>
                <Button
                  className="mt-3"
                  ref={returnFocusRef}
                  onClick={() => submitRequest()}
                >
                  Submit request
                </Button>
              </div>
            </Box>
          </Dialog>
        </div>
        {/* <div className="flex flex-col place-content-evenly justify-center w-full pl-5 font-mono border border-slate-300">
      <div className="flex gap-3 items-center justify-center py-2">
        <Balancer className="text-lg">#1 Derug request </Balancer>
        <ProgressBar progress={50} inline sx={{ width: "200px" }} />
        <Button>Vote</Button>
      </div>
    </div>
    <div className="flex flex-col place-content-evenly justify-center w-full pl-5 font-mono border border-slate-300">
      <div className="flex gap-3 items-center justify-center py-2">
        <Balancer className="text-lg">#2 Derug request </Balancer>
        <ProgressBar progress={50} inline sx={{ width: "200px" }} />
        <Button>Vote</Button>
      </div>
    </div> */}
      </div>
    </motion.div>
  );
};
