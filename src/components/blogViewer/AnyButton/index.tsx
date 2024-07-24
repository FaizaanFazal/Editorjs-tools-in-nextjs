import Link from "next/link";
import React from "react";

interface AnyButtonProps {
  text: string;
  className: string;
  themeColor: string;
  classes?: string;
  link?: string;
}

export const AnyButton: React.FC<AnyButtonProps> = ({
  text,
  className,
  themeColor,
  classes,
  link
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className={" font-medium  rounded-[8px] shadow-lg flex  bg-blue-600 dark:text-white "}>
        <Link
          href={link || ""}
          type="button"
          target="blank"
          className={`px-8 py-2.5 text-lg md:text-xl font-medium text-center text-white  rounded-[8px] hover:bg-${themeColor}-700 focus:ring-4 focus:outline-none focus:ring-${themeColor}-300 dark:bg-${themeColor}-600 dark:hover:bg-${themeColor}-700 dark:focus:ring-${themeColor}-800 `}
        >
          {text}
        </Link>
      </div>
    </div>

  );
};
