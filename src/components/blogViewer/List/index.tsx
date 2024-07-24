import React from "react";

interface ListProps {
  items: string[];
  classes?: string;
}

export const List: React.FC<ListProps> = ({ items, classes }) => {
  return (
    <ul className={classes}>
      {items.map((item, index) => (
        <li key={index} className="text-lg md:text-xl dark:text-white">
          {item}
        </li>
      ))}
    </ul>
  );
};
