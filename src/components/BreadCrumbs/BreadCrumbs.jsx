import React from "react";
import "./BreadCrumbs.scss";

function BreadCrumbs({ currentFile }) {
  const crumbs = currentFile.path.split("/");
  return (
    <div className="BreadCrumbsWrapper">
      {crumbs.map((item, index) => {
        return (
          <div className="BreadCrumbsWrapper__crumb" key={index}>
            <p>{item}</p>
            {index !== crumbs.length - 1 && <span data-icon="&#60084;" />}
          </div>
        );
      })}
    </div>
  );
}

export default BreadCrumbs;
