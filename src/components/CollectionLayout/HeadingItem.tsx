import { Heading, Text } from "@primer/react";
import React, { FC } from "react";

const HeadingItem: FC<{
  title: string;
  amount?: number | string;
  desc?: string;
  descColor: string;
}> = ({ title, amount, desc, descColor }) => {
  return (
    <Heading className="flex flex-col items-center gap-2">
      <Text className="text-base" style={{ fontFamily: "monospace" }}>
        {title}
      </Text>
      <Text
        className="text-base"
        style={{
          color: !desc ? descColor : "black",
          filter: `${desc ? `drop-shadow(${descColor} 0px 0px 10px)` : "none"}`,
        }}
      >
        {amount} <span>{desc}</span>
      </Text>
    </Heading>
  );
};

export default HeadingItem;
