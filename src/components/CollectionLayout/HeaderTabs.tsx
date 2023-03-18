import { Button, TabNav } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";
import { FC, useContext, useMemo } from "react";
import { DerugStatus } from "../../enums/collections.enums";
import { CollectionContext } from "../../stores/collectionContext";

const getNavStyling = (tab: string, selected: string) => {
  return {
    backgroundColor: tab === selected ? "rgba(9, 194, 246,.35)" : "transparent",
    color: tab === selected ? "rgba(9, 194, 246)" : "white",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "monospace",
    cursor: "pointer",
    borderBottom: "none",
    "&:hover": {
      color: tab === selected ? "black" : "rgba(9, 194, 246)",
    },
  };
};

export const HeaderTabs: FC<{
  selectedData: string;
  setSelectedInfo: (s: string) => void;
  setSelectedData: (s: string) => void;
  openDerugModal: (value: boolean) => void;
}> = ({ openDerugModal, selectedData, setSelectedData }) => {
  const { traits, collectionDerug, derugRequests } =
    useContext(CollectionContext);
  const wallet = useWallet();

  const showAddDerugButton = useMemo(() => {
    if (!derugRequests || derugRequests.length == 0) {
      return true;
    } else if (
      (collectionDerug &&
        collectionDerug.addedRequests.find((ar) => ar.winning)) ||
      collectionDerug?.status === DerugStatus.Reminting
    ) {
      return false;
    }
  }, [derugRequests, collectionDerug]);

  return (
    <div
      className="flex w-full self-start bg-gradient-to-r
  font-mono text-gray-700 leading-6 px-10 border-none justify-end"
    >
      <div className="w-full gap-5 flex justify-end">
        <div className="w-1/2 flex pl-8">
          <div className="w-full flex justify-between">
            {wallet &&
              wallet.publicKey &&
              (!collectionDerug ||
                (collectionDerug &&
                  dayjs(collectionDerug?.periodEnd).isAfter(dayjs()))) &&
              !derugRequests?.find(
                (dr) => dr.derugger.toString() === wallet.publicKey?.toString()
              ) && (
                <Button
                  className="ml-8"
                  sx={{
                    padding: "1.25em 3.25em",
                    color: "rgba(9, 194, 246)",
                    borderRadius: 0,
                    // backgroundColor: "rgba(9, 194, 246,.35)",
                  }}
                  onClick={() => openDerugModal(true)}
                >
                  <span className="text-sm uppercase">Add derug request</span>
                </Button>
              )}
            <TabNav
              aria-label="Main"
              className="flex justify-end w-fit"
              style={{
                borderBottom: "1px solid  rgba(9, 194, 246)",
                position: "sticky",
              }}
            >
              <TabNav.Link
                onClick={() => setSelectedData("listed")}
                sx={getNavStyling(selectedData, "listed")}
              >
                NFTS
              </TabNav.Link>
              {traits && traits.length > 0 && (
                <TabNav.Link
                  onClick={() => setSelectedData("traits")}
                  sx={getNavStyling(selectedData, "traits")}
                >
                  TRAITS
                </TabNav.Link>
              )}
              <TabNav.Link
                onClick={() => setSelectedData("statistics")}
                sx={getNavStyling(selectedData, "statistics")}
              >
                STATISTICS
              </TabNav.Link>
              <TabNav.Link
                onClick={() => setSelectedData("solanafm")}
                sx={getNavStyling(selectedData, "solanafm")}
              >
                SOLANAFM
              </TabNav.Link>
            </TabNav>
          </div>
        </div>
      </div>
    </div>
  );
};
