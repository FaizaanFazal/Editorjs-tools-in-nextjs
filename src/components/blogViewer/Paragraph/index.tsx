import React from "react";

export const Paragraph = ({
  text,
  classes,
}: {
  text: any;
  classes: string;
}) => {
  return <p className={classes + "font-normal leading-[28px] md:leading-[32px] tracking-[-.003em] break-words text-lg md:text-xl"}>{text}</p>;
};
