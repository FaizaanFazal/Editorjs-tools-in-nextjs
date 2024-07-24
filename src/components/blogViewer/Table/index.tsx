import React from "react";

interface TableProps {
  content: string[][];
  classes?: string;
}

export const Table: React.FC<TableProps> = ({ content, classes }) => {
  return (
    <div className={classes}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {content[0].map((headerItem, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-lg md:text-xl font-medium text-gray-500 dark:text-white tracking-wider"
                >
                  {headerItem}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {content.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-lg md:text-xl font-medium text-gray-900 dark:text-white"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
