import {
  Box,
  Button,
  Dialog,
  FormControl,
  TextInput,
  Text,
  ToggleSwitch,
} from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { ChangeEvent, FC, useContext, useRef, useState } from "react";
import { IRequest, IUtility } from "../../interface/collections.interface";
import { UtilityAction } from "../../interface/derug.interface";
import { getCollectionDerugData } from "../../solana/methods/derug";
import {
  createOrUpdateDerugRequest,
  getSingleDerugRequest,
} from "../../solana/methods/derug-request";
import { CollectionContext } from "../../stores/collectionContext";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const AddDerugRequst: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  derugRequests: IRequest[] | undefined;
  setDerugRequest: (derugRequest: IRequest[] | undefined) => void;
}> = ({ isOpen, setIsOpen }) => {
  const returnFocusRef = useRef(null);
  const [utility, setUtility] = useState<IUtility[]>();
  const [sellerFee, setSellerFee] = useState<number>();

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

  const handleSellerFeeChange = (points: number) => {
    setSellerFee(points);
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
          //TODO:Put here real params after ui is done
          500,
          "",
          "",
          [],
          undefined,
          undefined,
          undefined,
          activeListings ? activeListings[0] : undefined
        );
        const addedRequests = [...(derugRequests ?? [])];
        addedRequests.push(await getSingleDerugRequest(requestAddress));
      }
      if (chainCollectionData) {
        const derugData = await getCollectionDerugData(
          chainCollectionData?.derugDataAddress
        );
        setCollectionDerug(derugData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
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
          width: "30%",
          borderRadius: 0,
        }}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id" sx={{ borderRadius: 0 }}>
          Derug request
        </Dialog.Header>
        <Box p={3} className="flex justify-center flex-col gap-3">
          <FormControl sx={{ display: "flex" }}>
            <FormControl.Label>Wallet</FormControl.Label>
            <div className="flex w-full">
              <TextInput
                placeholder="title"
                value={wallet.publicKey?.toString()}
                sx={{ width: "100%", marginRight: "10px", borderRadius: 0 }}
                disabled
              />
              <Button
                size="large"
                variant="outline"
                sx={{ borderRadius: 0 }}
                ref={returnFocusRef}
                onClick={() => addUtility()}
              >
                Add utility
              </Button>
            </div>
          </FormControl>
          <div className="flex w-full items-center gap-5">
            <Text className="text-white font-mono flex whitespace-nowrap">
              Seller basic fee
            </Text>
            <Slider
              value={Number(sellerFee)}
              onChange={(e) =>
                typeof e === "number" && handleSellerFeeChange(e)
              }
            />
            <TextInput
              placeholder="Seller fee"
              value={sellerFee}
              sx={{ borderRadius: 0 }}
              onChange={(e) => handleSellerFeeChange(Number(e.target.value))}
            />
          </div>
          <Box className="flex w-full justify-start items-center">
            <Box flexGrow={1}>
              <Text fontSize={2} color="white">
                Public mint
              </Text>
              <Text
                color="fg.subtle"
                fontSize={1}
                id="switchCaption"
                display="block"
              >
                Notifications will be delivered via email and the GitHub
                notification center
              </Text>
            </Box>
            <ToggleSwitch
              aria-labelledby="switchLabel"
              aria-describedby="switchCaption"
            />
          </Box>
          {utility &&
            utility.map((u, i) => (
              <div className="flex w-full justify-between items-end gap-3">
                <div className="flex w-full">
                  <TextInput
                    placeholder="Utility"
                    value={u.title}
                    sx={{ width: "100%", borderRadius: 0 }}
                    onChange={(e) => handleUtilityNameChange(e.target.value, i)}
                  />
                  <TextInput
                    placeholder="Enter a description"
                    value={u.description}
                    sx={{ width: "100%", borderRadius: 0 }}
                    onChange={(e) => handleUtilityDescChange(e.target.value, i)}
                  />
                </div>
                <Button
                  variant="danger"
                  sx={{ borderRadius: 0 }}
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
