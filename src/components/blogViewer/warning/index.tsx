import React from 'react';

interface WarningProps {
  title: string;
  message: string;
  classes?: string;
}

export const Warning: React.FC<WarningProps> = ({ title, message, classes }) => {
  return (
    <div className={classes} role="alert">
      <span className="font-medium">{title}!</span> {message}
    </div>
  );
};