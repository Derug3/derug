import { Box, Button, Dialog, TextInput, Label } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { FC, useContext, useEffect, useRef, useState } from "react";
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
import UtilityArray from "./UtilityArray";
import useDebounce from "../../hooks/useDebounce";
import CreatorsArray from "./CreatorsArray";
import PublicMint from "./PublicMint";

interface ICreator {
  address: string | undefined;
  percentage: number;
}

export const AddDerugRequst: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  derugRequests: IRequest[] | undefined;
  setDerugRequest: (derugRequest: IRequest[] | undefined) => void;
}> = ({ isOpen, setIsOpen }) => {
  const wallet = useWallet();
  const returnFocusRef = useRef(null);
  const [utility, setUtility] = useState<IUtility[]>([
    {
      title: "",
      description: "",
      isActive: true,
    },
  ]);
  const [creators, setCreator] = useState<ICreator[]>([]);

  const [selectedUtility, setSelectedUtility] = useState<number>(0);
  const [sellerFee, setSellerFee] = useState<number>(0);
  const [symbol, setSymbol] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();

  const { name } = useDebounce(searchValue);

  const {
    chainCollectionData,
    activeListings,
    setCollectionDerug,
    collectionStats,
    derugRequests,
  } = useContext(CollectionContext);

  const addUtility = () => {
    const newElement = {
      title: "",
      description: "",
      isActive: true,
    };
    const oldValue = utility || [];
    setSelectedUtility(oldValue.length);
    setUtility([...oldValue, newElement]);
  };

  const addCreator = () => {
    const newElement = {
      address: "",
      percentage: 0,
    };
    const oldValue = creators || [];
    setCreator([...oldValue, newElement]);
  };

  const handleSellerFeeChange = (points: number) => {
    setSellerFee(points);
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

  useEffect(() => {
    const newElement = {
      address: wallet.publicKey?.toString(),
      percentage: 100,
    };
    setCreator([newElement]);
  }, [wallet]);

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
          width: "80%",
          height: "90%",
          overflow: "auto",
          borderRadius: 0,
        }}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id" sx={{ borderRadius: 0 }}>
          Derug request
        </Dialog.Header>
        <Box className="grid grid-cols-2 gap-4 m-5">
          <Box
            className="flex justify-between flex-row text-gray-400 p-3 font-mono"
            style={{
              border: "1px solid rgb(9, 194, 246)",
            }}
          >
            <div className="flex flex-col justify-between w-full gap-5">
              <div className="flex justify-between w-full">
                <span className="pr-2 text-white">Wallet:</span>
                <span className="font-mono">
                  {wallet.publicKey?.toString()}
                </span>
              </div>
              <div className="flex justify-between w-full ">
                <span className="pr-2 text-white">New name:</span>
                <TextInput
                  placeholder="new collection name"
                  className="text-gray-400"
                  value={name}
                  sx={{
                    borderRadius: 0,
                    width: "50%",
                  }}
                />
              </div>
              <div className="flex justify-between w-full ">
                <span className="pr-2 text-white">New symbol:</span>
                <TextInput
                  placeholder="new collection symbol"
                  value={symbol}
                  sx={{
                    borderRadius: 0,
                    width: "50%",
                  }}
                />
              </div>
              <div className="flex justify-between w-full gap-3 items-center">
                <span className="pr-2 text-white"> Seller basic fee</span>
                <div className="flex w-1/2 items-center gap-5">
                  <TextInput
                    placeholder="Fee"
                    value={sellerFee}
                    sx={{ borderRadius: 0, width: "30%" }}
                    onChange={(e) =>
                      handleSellerFeeChange(Number(e.target.value))
                    }
                  />
                  <Slider
                    value={Number(sellerFee)}
                    onChange={(e) =>
                      typeof e === "number" && handleSellerFeeChange(e)
                    }
                  />
                </div>
              </div>
            </div>
          </Box>
          <Box
            className="flex justify-between flex-col text-white p-3 font-mono"
            style={{ border: "1px solid rgb(9, 194, 246)" }}
          >
            <CreatorsArray creators={creators} setCreators={setCreator} />
            <Button
              size="large"
              variant="outline"
              sx={{ borderRadius: 0 }}
              ref={returnFocusRef}
              disabled={creators.length >= 4}
              onClick={() => addCreator()}
            >
              Add creator
            </Button>
          </Box>
        </Box>
        <Box className="grid grid-cols-2 gap-4 mx-5">
          <Box
            className="flex justify-between flex-col font-mono"
            style={{
              border: "1px solid rgb(9, 194, 246)",
            }}
          >
            <PublicMint
              price={price}
              setPrice={setPrice}
              duration={duration}
              setDuration={setDuration}
            />
          </Box>
          <Box
            className="flex justify-between flex-col text-white gap-5 p-3 font-mono w-full"
            style={{ border: "1px solid rgb(9, 194, 246)" }}
          >
            <Box className="flex flex-wrap">
              {utility.map(
                (item, index) =>
                  item.title && (
                    <Label
                      onClick={() => {
                        setSelectedUtility(index);
                      }}
                      variant="accent"
                      className="cursor-pointer"
                    >
                      {item.title}
                    </Label>
                  )
              )}
            </Box>
            <Box className="flex flex-col w-full justify-start items-start">
              {utility && (
                <UtilityArray
                  selectedUtility={selectedUtility}
                  placeholder="Utility"
                  items={utility}
                  setItems={setUtility}
                ></UtilityArray>
              )}
            </Box>
            <Button
              size="large"
              variant="outline"
              sx={{ borderRadius: 0 }}
              ref={returnFocusRef}
              onClick={() => addUtility()}
            >
              Add utility
            </Button>
          </Box>
        </Box>
      </Dialog>
    </motion.div>
  );
};
