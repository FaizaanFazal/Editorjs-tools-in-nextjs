import React from "react";

export const Header = ({
  level,
  text,
  classes,
}: {
  level: number;
  text: any;
  classes: string;
}) => {


  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`${classes} font-bold `} >{text}</Tag>;
};
