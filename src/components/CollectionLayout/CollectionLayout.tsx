import { Box, SplitPageLayout } from "@primer/react";
import { FC, ReactNode, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collectionsStore } from "../../stores/collectionsStore";

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
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("symbol"), "symbol");

  return (
    <>
      <Box
        sx={{
          height: 450,
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

        <SplitPageLayout>
          <SplitPageLayout.Content sx={{ paddingX: 6 }}>
            {content}
          </SplitPageLayout.Content>
          <SplitPageLayout.Pane
            sticky
            offsetHeader={64}
            padding="none"
            resizable
            position="end"
            width="large"
          >
            {pane}
          </SplitPageLayout.Pane>
        </SplitPageLayout>
      </Box>
      <SplitPageLayout>
        <SplitPageLayout.Content sx={{ paddingX: 6 }}>
          {content}
        </SplitPageLayout.Content>
        <SplitPageLayout.Pane
          sticky
          offsetHeader={64}
          padding="none"
          resizable
          position="end"
          width="large"
        >
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
        </SplitPageLayout.Pane>
      </SplitPageLayout>
    </>
  );
};
