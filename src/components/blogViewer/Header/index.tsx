import React from "react";

export const Header = ({
  level,
  text,
  classes,
}: {
  level: number;
  text: string;
  classes: string;
}) => {


  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`${classes} `} >{text}</Tag>;
};
