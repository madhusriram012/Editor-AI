import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import useResize from "../../hooks/useResize";
import "./SidePane.scss";

function SidePane({ children }) {
  const containerRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const setSidebarWidth = useStoreActions((actions) => actions.setSidebarWidth);
  const setSidePanelState = useStoreActions(
    (action) => action.setSidePanelState
  );
  const setActiveItem = useStoreActions((actions) => actions.setActivityItem);
  const activeItem = useStoreState((state) => state.activityItem);

  const [isMouseOver, setMouseOver] = useState(false);
  useResize(
    containerRef,
    dragRef,
    (width) => {
      dragRef.current.style.backgroundColor = "var(--daima-sash-hoverBorder)";
      dragRef.current.style.animation = "none";
      document.body.style.cursor = "ew-resize";
      setSidebarWidth(width);
    },
    () => {
      dragRef.current.style.backgroundColor = "";
      dragRef.current.style.animation = "";
      document.body.style.cursor = "";
    },
    () => {
      setSidePanelState({ left: false });
      setSidebarWidth(284);
      dragRef.current.style.backgroundColor = "";
      dragRef.current.style.animation = "";
      document.body.style.cursor = "";
    }
  );

  return (
    <div className="SidePane" ref={containerRef}>
      <div
        className="SidePane__sash"
        ref={dragRef}
        onClick={(e) => {
          if (e.detail === 2) {
            setSidebarWidth(284);
            dragRef.current.style.left = "284px";
            containerRef.current.style.width = "284px";

            setTimeout(() => {
              dragRef.current.style.left = "";
              containerRef.current.style.width = "";
            }, 50);
          }
        }}
      />
      <ul className="SidePane__headerTabs">
        <li
          className={`SidePane__headerTabs--${
            activeItem === "explorer" ? "activeItem" : "item"
          }`}
        >
          <button
            onClick={() => {
              if (activeItem !== "explorer") {
                setActiveItem("explorer");
              }
            }}
            data-icon={String.fromCharCode(60035)}
          >
            <p>Files</p>
          </button>
        </li>
        <li
          className={`SidePane__headerTabs--${
            activeItem === "git" ? "activeItem" : "item"
          }`}
        >
          <button
            onClick={() => {
              if (activeItem !== "git") {
                setActiveItem("git");
              }
            }}
            data-icon={String.fromCharCode(60158)}
          >
            <p>Git</p>
          </button>
        </li>
        <li
          className={`SidePane__headerTabs--${
            activeItem === "search" ? "activeItem" : "item"
          }`}
        >
          <button
            onClick={() => {
              if (activeItem !== "search") {
                setActiveItem("search");
              }
            }}
            data-icon={String.fromCharCode(60013)}
          >
            <p>Search</p>
          </button>
        </li>
      </ul>
      <div
        className="SidePane__content"
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        style={{
          overflow: isMouseOver ? "auto" : "hidden",
        }}
      >
        <div className="SidePane__content--inner">{children}</div>
      </div>
    </div>
  );
}

export default SidePane;
