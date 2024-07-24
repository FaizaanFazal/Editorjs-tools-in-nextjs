import React from "react";

interface ListProps {
  items: string[];
  classes?: string;
  style?: string;
}

export const List: React.FC<ListProps> = ({ items, classes, style }) => {

  const getListClasses = (style: string ) => {
    switch (style) {
      case 'unordered':
        return 'py-2 space-y-1 text-gray-500 list-disc list-outside dark:text-gray-400 ps-5 mt-2 text-lg md:text-xl';
      case 'unorderedNoBullet':
        return 'py-2 space-y-1 text-gray-500 list-none list-outside dark:text-gray-400 ps-5 mt-2 text-lg md:text-xl';
      case 'ordered':
        return 'ps-5 mt-2 space-y-1 list-decimal list-outside text-lg md:text-xl';
      default:
        return ''; 
    }
  };
 
  return (
    <ul className={`${classes} ${getListClasses(style || "")} `}>
      {items.map((item, index) => (
        <li key={index} className="text-lg md:text-xl dark:text-white">
          {item}
        </li>
      ))}
    </ul>
  );
};
