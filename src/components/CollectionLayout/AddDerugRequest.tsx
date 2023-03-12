import { Box, Button, Dialog, FormControl, TextInput } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import { IRequest, IUtility } from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const AddDerugRequst: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  derugRequests: IRequest[] | undefined;
  setDerugRequest: (derugRequest: IRequest[] | undefined) => void;
}> = ({ isOpen, setIsOpen, derugRequests, setDerugRequest }) => {
  const [title, setTitle] = useState("");
  const returnFocusRef = useRef(null);
  const [utility, setUtility] = useState<IUtility[]>();

  const addUtility = () => {
    const newElement = {
      name: "",
      description: "",
    };
    const oldValue = utility || [];
    setUtility([...oldValue, newElement]);
  };

  const handleUtilityNameChange = (value: string, index: number) => {
    if (!utility) return;
    const updatedTodo = { ...utility[index], name: value };
    const newUtility = [
      ...utility.slice(0, index),
      updatedTodo,
      ...utility.slice(index + 1),
    ];
    setUtility(newUtility);
  };

  const handleUtilityDescChange = (value: string, index: number) => {
    if (!utility) return;
    const updatedTodo = { ...utility[index], description: value };
    const newUtility = [
      ...utility.slice(0, index),
      updatedTodo,
      ...utility.slice(index + 1),
    ];
    setUtility(newUtility);
  };

  const removeUtility = (index: number) => {
    if (!utility) return;
    const temp = [...utility];
    temp.splice(index, 1);

    setUtility(temp);
  };

  const submitRequest = () => {
    const newElement: IRequest = {
      title: title,
      utility: utility!,
    };
    const oldValue = derugRequests || [];
    setDerugRequest([...oldValue, newElement]);
    setIsOpen(false);
  };

  return (
    <motion.div
      className="flex w-full flex-col"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
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
        <Box p={3} className="flex justify-center flex-col gap-3">
          <FormControl sx={{ display: "flex" }}>
            <FormControl.Label>Request name</FormControl.Label>
            <div className="flex w-full">
              <TextInput
                placeholder="title"
                value={title}
                sx={{ width: "100%", marginRight: "10px" }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button
                size="large"
                variant="outline"
                ref={returnFocusRef}
                onClick={() => addUtility()}
              >
                Add utility
              </Button>
            </div>
          </FormControl>
          {utility &&
            utility.map((u, i) => (
              <div className="flex w-full justify-between items-end gap-3">
                <div className="flex w-full">
                  <TextInput
                    placeholder="Utility"
                    value={u.name}
                    sx={{ width: "100%" }}
                    onChange={(e) => handleUtilityNameChange(e.target.value, i)}
                  />
                </div>
                <div className="flex w-full">
                  <TextInput
                    placeholder="Enter a description"
                    value={u.description}
                    sx={{ width: "100%" }}
                    onChange={(e) => handleUtilityDescChange(e.target.value, i)}
                  />
                </div>
                <Button
                  variant="danger"
                  ref={returnFocusRef}
                  onClick={() => removeUtility(i)}
                >
                  remove
                </Button>
              </div>
            ))}
          <div className="flex justify-end">
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
    </motion.div>
  );
};
