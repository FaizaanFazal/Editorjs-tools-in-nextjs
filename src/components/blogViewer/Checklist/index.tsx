import React from 'react';

interface ChecklistItem {
  text: string;
  checked: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  classes?: string;
}

export const Checklist: React.FC<ChecklistProps> = ({ items, classes }) => {
  return (
    <ul className={classes}>
      {items.map((item, index) => (
        <li key={index} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id={item.text}
              checked={item.checked}
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label htmlFor={item.text} className="w-full py-3 ms-2 text-lg md:text-xl font-medium text-gray-900 dark:text-gray-300">
              {item.text}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};