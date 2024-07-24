import React from "react";

export const Paragraph = ({
  text,
  classes,
}: {
  text: string;
  classes: string;
}) => {
  return <p className={classes}>{text}</p>;
};
