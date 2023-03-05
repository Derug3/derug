import { FC, useEffect, useRef, useState } from "react";
import { pane } from "./../components/CollectionLayout/Pane";
import { content } from "./../components/CollectionLayout/Content";
import { header } from "./../components/CollectionLayout/Header";
import { proposals } from "./../components/CollectionLayout/Proposals";
import { CollectionLayout } from "../components/CollectionLayout/CollectionLayout";
import { ICollection } from "../interface/collections.interface";

export const Collections: FC = () => {
  const [collection, setCollection] = useState<ICollection>();

  const [selectedInfo, setSelectedInfo] = useState("description");
  const [selected, setSelected] = useState("addnewproposal");
  const iframeRef = useRef(null);

  return (
    <CollectionLayout
      pane={pane(selectedInfo, setSelectedInfo, iframeRef)}
      content={content()}
      header={header()}
      proposals={proposals()}
    ></CollectionLayout>
  );
};

export default Collections;
