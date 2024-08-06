import React from "react";
import { customSanitize, parseHtml } from "..";

interface TableProps {
  content: string[][];
  classes?: string;
  borders:boolean;
  tableHeader:boolean;
  textAlignment:string;
}

export const Table: React.FC<TableProps> = ({ content, classes, borders ,tableHeader,textAlignment}) => {
  const borderClasses = borders ? 'border-[1px] border-black dark:border-white': '';
  const HeaderClasses = tableHeader ? 'text-[14px] md:text-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-white tracking-wider': '';
  const alignmentClass= ()=>{
    if(textAlignment==="Left"){return 'text-left'}
    else if(textAlignment==="Center"){return 'text-center'}
    else if(textAlignment==="Right"){return 'text-right'}
    else if(textAlignment==="Justify"){return 'text-justify'}
    else {return 'text-left'}
  }
  const currentAlignmentClass = alignmentClass();
  return (
    <div className={classes}>
      <div className="overflow-x-auto ">
        <table className={`${borderClasses} ${currentAlignmentClass} bg-white dark:bg-gray-800 min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse table-fixed `}>
          <thead className="">
            <tr className={`${borderClasses}`}>
              {content && content[0]?.map((headerItem, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`${borderClasses} ${HeaderClasses} px-6 py-3 font-medium`}
                >
                  {parseHtml(customSanitize(headerItem))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200 ">
            {content?.slice(1)?.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${borderClasses}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`${borderClasses} px-6 py-4 whitespace-nowrap text-lg md:text-xl font-medium text-gray-900 dark:text-white`}
                  >
                    {parseHtml(customSanitize(cell))}
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
