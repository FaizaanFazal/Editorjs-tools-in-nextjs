import React from "react";

interface DelimiterProps {
  classes?: string;
}

export const Delimiter: React.FC<DelimiterProps> = ({ classes }) => {
  return (
    <div className={classes}>
      <img
        alt="delimiter"
        loading="lazy"
        width="210"
        height="28"
        decoding="async"
        className="mx-auto"
        src="/images/delimiter.svg"
        style={{ color: "transparent" }}
      />
    </div>
  );
};
