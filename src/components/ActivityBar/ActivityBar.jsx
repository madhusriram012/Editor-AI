import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import "./ActivityBar.scss";
import MenuButton from "./Components/MenuButton/MenuButton";

function ActivityBar() {
  const [showMenu, setShowMenu] = React.useState(false);
  const setActiveItem = useStoreActions((actions) => actions.setActivityItem);
  const activeItem = useStoreState((state) => state.activityItem);

  const outRef = React.useRef(null);

  return (
    <div className="ActivityBar" ref={outRef}>
      <MenuButton
        outRef={outRef}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <ul className="ActivityBar__actionList">
        <li
          className={`ActivityBar__actionList--${
            activeItem === "explorer" ? "active" : "item"
          }`}
        >
          <button
            data-icon="&#60144;"
            onClick={() => {
              if (activeItem !== "explorer") {
                setActiveItem("explorer");
              } else {
                setActiveItem(null);
              }
            }}
          />
        </li>
        <li
          className={`ActivityBar__actionList--${
            activeItem === "search" ? "active" : "item"
          }`}
        >
          <button
            data-icon="&#60013;"
            onClick={() => {
              if (activeItem !== "search") {
                setActiveItem("search");
              } else {
                setActiveItem(null);
              }
            }}
          />
        </li>
        <li
          className={`ActivityBar__actionList--${
            activeItem === "git" ? "active" : "item"
          }`}
        >
          <button
            data-icon="&#60008;"
            onClick={() => {
              if (activeItem !== "git") {
                setActiveItem("git");
              } else {
                setActiveItem(null);
              }
            }}
          />
        </li>
      </ul>
    </div>
  );
}
export default ActivityBar;
