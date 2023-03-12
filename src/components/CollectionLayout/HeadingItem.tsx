import { Heading, Text } from "@primer/react";
import dayjs from "dayjs";
import React, { FC } from "react";
import Countdown from "react-countdown";
const HeadingItem: FC<{
  title: string;
  amount?: number | string;
  desc?: string;
  descColor: string;
  isCounter?: boolean;
}> = ({ title, amount, desc, descColor, isCounter }) => {
  return (
    <Heading className="flex flex-col items-center gap-2">
      <Text
        className="text-base"
        style={{ fontFamily: "monospace", color: "white" }}
      >
        {title}
      </Text>
      {!isCounter ? (
        <Text
          className="text-base"
          style={{
            color: `white`,
            filter: `${`drop-shadow(white 0px 0px 10px)`}`,
          }}
        >
          {amount} <span>{desc}</span>
        </Text>
      ) : (
        <Countdown
          className="text-md"
          date={dayjs
            .unix(amount as number)
            .add(3, "days")
            .toDate()}
        />
      )}
    </Heading>
  );
};

export default HeadingItem;
