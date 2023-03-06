import { Box, SplitPageLayout } from "@primer/react";
import { FC, ReactNode } from "react";

interface ICollectionLayoutProps {
  pane: ReactNode;
  content: ReactNode;
  proposals: ReactNode;
  header: ReactNode;
}
export const CollectionLayout: FC<ICollectionLayoutProps> = ({
  pane,
  content,
  proposals,
  header,
}) => {
  return (
    <>
      <Box
        sx={{
          overflowY: "auto",
          border: "1px solid gray",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            display: "grid",
            placeItems: "start",
            borderBottom: "1px solid gray",
          }}
        >
          {header}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "60% 40%" }}>
          <Box sx={{ maxHeight: "20em" }} className="overflow-x-scroll">
            {pane}{" "}
          </Box>
          <Box>{content}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflowY: "auto",
          border: "none",
          display: "flex",

          borderColor: "border-cyan-200",
        }}
      >
        {proposals}
      </Box>
    </>
  );
};
