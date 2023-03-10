import { TabNav } from "@primer/react";
import { FC } from "react";

const getNavStyling = (tab: string, selected: string) => {
  return {
    backgroundColor: tab === selected ? "rgba(9, 194, 246,.35)" : "transparent",
    color: tab === selected ? "rgba(9, 194, 246)" : "white",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "monospace",
    border:
      tab !== selected ? "2px solid #BBC4CD" : "2px solid rgba(9, 194, 246)",
    cursor: "pointer",
    borderBottom: "none",
    "&:hover": {
      color: tab === selected ? "black" : "rgba(9, 194, 246)",
    },
  };
};

export const HeaderTabs: FC<{
  selectedInfo: string;
  selectedData: string;
  setSelectedInfo: (s: string) => void;
  setSelectedData: (s: string) => void;
}> = ({ selectedInfo, selectedData, setSelectedInfo, setSelectedData }) => {
  return (
    <div
      className="flex w-full self-start bg-gradient-to-r
  font-mono text-gray-700 leading-6 justify-between px-10 py-2 border-none"
    >
      <div className="w-1/2">
        <TabNav
          aria-label="Main"
          className="flex w-full "
          style={{
            borderBottom: "2px solid  rgba(9, 194, 246)",
            position: "sticky",
          }}
        >
          <TabNav.Link
            onClick={() => setSelectedInfo("description")}
            sx={getNavStyling(selectedInfo, "description")}
          >
            DESCRIPTION
          </TabNav.Link>
          <TabNav.Link
            onClick={() => setSelectedInfo("listed")}
            sx={getNavStyling(selectedInfo, "listed")}
          >
            NFTS
          </TabNav.Link>
        </TabNav>
      </div>
      <div className="w-1/2">
        <TabNav
          aria-label="Main"
          className="flex w-full "
          style={{
            borderBottom: "2px solid  rgba(9, 194, 246)",
            position: "sticky",
          }}
        >
          <TabNav.Link
            onClick={() => setSelectedData("traits")}
            sx={getNavStyling(selectedData, "traits")}
          >
            TRAITS
          </TabNav.Link>
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
  );
};
