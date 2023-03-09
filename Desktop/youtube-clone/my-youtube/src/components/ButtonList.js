import React from "react";
import Button from "./Button";

const items = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Cricket",
  "News",
  "Love",
  "Lion",
  "React",
  "NTR",
  "SunnyLeone",
  "Namaste-JavaScript",
  "Programming",
  "Power-Rangers",
  "Modi",
];

const ButtonList = () => {
  return (
    <div className="flex ">
      {items.map((item, i) => (
        <Button key={item} name={item} />
      ))}
    </div>
  );
};

export default ButtonList;
