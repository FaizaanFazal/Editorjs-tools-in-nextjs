import React from "react";

interface TwoColumnsProps {
  left: React.ReactNode;
  right: React.ReactNode;
  classes?: string;
}

export const TwoColumns: React.FC<TwoColumnsProps> = ({
  left,
  right,
  classes,
}) => {
  return (
    <div className={`${classes} grid gap-4 sm:grid-cols-2`}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};
