import { Box, Button, Dialog, FormControl, TextInput } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { FC, useContext, useRef, useState } from "react";
import { IRequest, IUtility } from "../../interface/collections.interface";
import { UtilityAction } from "../../interface/derug.interface";
import { getCollectionDerugData } from "../../solana/methods/derug";
import {
  createOrUpdateDerugRequest,
  getSingleDerugRequest,
} from "../../solana/methods/derug-request";
import { CollectionContext } from "../../stores/collectionContext";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const AddDerugRequst: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  derugRequests: IRequest[] | undefined;
  setDerugRequest: (derugRequest: IRequest[] | undefined) => void;
}> = ({ isOpen, setIsOpen }) => {
  const returnFocusRef = useRef(null);
  const [utility, setUtility] = useState<IUtility[]>();

  const {
    chainCollectionData,
    activeListings,
    setCollectionDerug,
    collectionStats,
    derugRequests,
  } = useContext(CollectionContext);

  const wallet = useWallet();

  const addUtility = () => {
    const newElement = {
      title: "",
      description: "",
      isActive: true,
    };
    const oldValue = utility || [];
    setUtility([...oldValue, newElement]);
  };

  const handleUtilityNameChange = (value: string, index: number) => {
    if (!utility) return;
    const updatedTodo = { ...utility[index], title: value };
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

  const submitRequest = async () => {
    try {
      if (wallet && chainCollectionData && utility && collectionStats) {
        const requestAddress = await createOrUpdateDerugRequest(
          wallet,
          utility.map((ut) => {
            return {
              action: UtilityAction.Add,
              description: ut.description,
              title: ut.title,
            };
          }),
          chainCollectionData,
          collectionStats,
          activeListings ? activeListings[0] : undefined
        );
        const addedRequests = [...(derugRequests ?? [])];
        addedRequests.push(await getSingleDerugRequest(requestAddress));
      }
      if (chainCollectionData && !chainCollectionData?.hasActiveDerugData) {
        const derugData = await getCollectionDerugData(
          chainCollectionData?.derugDataAddress
        );
        setCollectionDerug(derugData);
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
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
        }}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id">Derug request</Dialog.Header>
        <Box p={3} className="flex justify-center flex-col gap-3">
          <FormControl sx={{ display: "flex" }}>
            <FormControl.Label>Wallet</FormControl.Label>
            <div className="flex w-full">
              <TextInput
                placeholder="title"
                value={wallet.publicKey?.toString()}
                sx={{ width: "100%", marginRight: "10px" }}
                disabled
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
                    value={u.title}
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
