import { Box, Button, Label, Textarea, TextInput } from "@primer/react";
import "rc-slider/assets/index.css";
import { FC } from "react";

const CreatorsArray: FC<{
  creators: any[];
  setCreators: (item: any) => void;
}> = ({ creators, setCreators }) => {
  const handleItemsNameChange = (value: string, index: number) => {
    if (!creators) return;
    const updatedTodo = { ...creators[index], address: value };
    const newItems = [
      ...creators.slice(0, index),
      updatedTodo,
      ...creators.slice(index + 1),
    ];
    setCreators(newItems);
  };

  const handleItemsDescChange = (value: string, index: number) => {
    if (!creators) return;
    const updatedTodo = { ...creators[index], percentage: value };
    const newItems = [
      ...creators.slice(0, index),
      updatedTodo,
      ...creators.slice(index + 1),
    ];
    setCreators(newItems);
  };

  const removeItems = (index: number) => {
    if (!creators) return;
    const temp = [...creators];
    temp.splice(index, 1);

    setCreators(temp);
  };

  return (
    <Box className="w-full">
      {creators &&
        creators.map((creator, index) => (
          <div className="flex w-full justify-between creators-start gap-3">
            <div className="flex w-full flex-row">
              <TextInput
                placeholder="Address"
                value={creator.address}
                sx={{ width: "100%", borderRadius: 0 }}
                disabled={index === 0}
                onChange={(e) => handleItemsNameChange(e.target.value, index)}
              />
              <TextInput
                placeholder="Percentage"
                value={creator.percentage}
                sx={{ width: "30%", borderRadius: 0 }}
                onChange={(e) => handleItemsDescChange(e.target.value, index)}
              />
            </div>
            <Button
              variant="danger"
              sx={{ borderRadius: 0 }}
              onClick={() => removeItems(index)}
            >
              remove
            </Button>
          </div>
        ))}
    </Box>
  );
};

export default CreatorsArray;
