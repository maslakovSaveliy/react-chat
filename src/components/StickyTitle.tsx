import React, { FC, PropsWithChildren } from "react";
import "../utils/stickyTitle.css";
const StickyTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed">
      <h1>{children}</h1>
    </div>
  );
};
export default StickyTitle;
