import React from "react";

interface AnyButtonProps {
  text: string;
  className: string;
  themeColor: string;
  classes?: string;
}

export const AnyButton: React.FC<AnyButtonProps> = ({
  text,
  className,
  themeColor,
  classes,
}) => {
  return (
    <div className={classes}>
      <button
        type="button"
        className={`px-4 py-2 text-lg md:text-xl font-medium text-center text-white ${className} rounded-lg hover:bg-${themeColor}-700 focus:ring-4 focus:outline-none focus:ring-${themeColor}-300 dark:bg-${themeColor}-600 dark:hover:bg-${themeColor}-700 dark:focus:ring-${themeColor}-800`}
      >
        {text}
      </button>
    </div>
  );
};
