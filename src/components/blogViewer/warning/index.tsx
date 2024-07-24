import React from 'react';

interface WarningProps {
  title: string;
  message: string;
  classes?: string;
}

export const Warning: React.FC<WarningProps> = ({ title, message, classes }) => {
  console.log(title , message)
  return (
    <div className={classes + " p-4 mb-4 text-md text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 "} role="alert">
      <span className="font-semibold">{title}! </span> <br></br>
      <span className="p-2">{message} </span>
    </div>
  );
};