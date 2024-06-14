import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import {
  CreateFolderMap,
  OpenFile,
  saveFileContents,
} from "../../../../utils/FileAccess";
import "./MenuButton.scss";

function MenuButton({ outRef, showMenu, setShowMenu }) {
  const [treeStates, setTreeStates] = React.useState({
    file: false,
    theme: false,
  });

  const currentTheme = useStoreState((state) => state.theme);
  const currentFile = useStoreState((state) => state.currentFile);
  const currentFileContent = useStoreState((state) => state.currentFileContent);

  const setCurrentTheme = useStoreActions((actions) => actions.setTheme);
  const setSelectedFolderState = useStoreActions(
    (actions) => actions.setSelectedFolderState
  );
  const toggleAutoSave = useStoreActions((actions) => actions.toggleAutoSave);
  const isAutoSave = useStoreState((state) => state.isAutoSave);
  const setIsSaving = useStoreActions((action) => action.setIsSaving);

  useOnClickOutside(outRef, () => {
    setShowMenu(false);
    setTreeStates({
      file: false,
      theme: false,
    });
  });
  return (
    <>
      <div
        className={`MenuButton__menu
            ${showMenu ? "MenuButton__menu--active" : ""}
        `}
        onClick={() => {
          const currentMenuState = showMenu;
          setShowMenu(!currentMenuState);
          if (currentMenuState) {
            setTreeStates({
              file: false,
              theme: false,
            });
          }
        }}
        data-icon="&#60308;"
      />
      {showMenu && (
        <ul
          className="MenuButton__menuBox"
          style={{
            borderRadius:
              treeStates.file || treeStates.theme ? "5px 0 0 5px" : "",
          }}
        >
          <li
            className={`MenuButton__menuBox--${
              treeStates.file ? "active" : "item"
            }`}
          >
            <button
              onClick={() => {
                setTreeStates({
                  file: true,
                  theme: false,
                });
              }}
              onMouseEnter={() => {
                setTreeStates({
                  file: true,
                  theme: false,
                });
              }}
            >
              <span>File</span>
              <span data-icon="&#60086;" />
            </button>
          </li>
          <li
            className={`MenuButton__menuBox--${
              treeStates.theme ? "active" : "item"
            }`}
          >
            <button
              onClick={() => {
                setTreeStates({
                  file: false,
                  theme: true,
                });
              }}
              onMouseEnter={() => {
                setTreeStates({
                  file: false,
                  theme: true,
                });
              }}
            >
              <span>Theme</span>
              <span data-icon="&#60086;" />
            </button>
          </li>
        </ul>
      )}
      {treeStates.file && (
        <ul
          className="MenuButton__subMenuBox"
          style={{
            left: "191px",
            borderRadius: "0 5px 5px 5px",
            width: "250px",
          }}
        >
          <li className="MenuButton__subMenuBox--item">
            <button
              onClick={async () => {
                await OpenFile();
              }}
            >
              <p>Open File</p>
              <pre>Ctrl+Alt+O</pre>
            </button>
          </li>
          <li className="MenuButton__subMenuBox--item">
            <button
              onClick={async () => {
                const root = await CreateFolderMap();
                setSelectedFolderState(root);
              }}
            >
              <p>Open Folder</p>
              <pre>Ctrl+Shift+O</pre>
            </button>
          </li>
          <li className="MenuButton__subMenuBox--separator" />
          <li className="MenuButton__subMenuBox--item">
            <button
              onClick={async () => {
                setIsSaving(true);
                await saveFileContents(
                  currentFile.handler,
                  currentFileContent
                ).then(() => setIsSaving(false));
              }}
            >
              Save
            </button>
          </li>
          <li className="MenuButton__subMenuBox--disabled">
            <button disabled>Save As</button>
          </li>
          <li className="MenuButton__subMenuBox--item">
            <button onClick={() => toggleAutoSave()}>
              <span>Auto Save</span>
              {isAutoSave && <span data-icon="&#60082;" />}
            </button>
          </li>
        </ul>
      )}
      {treeStates.theme && (
        <ul
          className="MenuButton__subMenuBox"
          style={{
            left: "191px",
            borderRadius: "0 5px 5px 5px",
          }}
        >
          <li className="MenuButton__subMenuBox--item">
            <button onClick={() => setCurrentTheme("tomorrow-night-blue")}>
              <span>Tomorrow Night Blue</span>
              {currentTheme === "tomorrow-night-blue" && (
                <span data-icon="&#60082;" />
              )}
            </button>
          </li>
          <li className="MenuButton__subMenuBox--item">
            <button onClick={() => setCurrentTheme("github")}>
              <span>Github</span>
              {currentTheme === "github" && <span data-icon="&#60082;" />}
            </button>
          </li>
          <li className="MenuButton__subMenuBox--item">
            <button onClick={() => setCurrentTheme("blackboard")}>
              <span>Blackboard</span>
              {currentTheme === "blackboard" && <span data-icon="&#60082;" />}
            </button>
          </li>
          <li className="MenuButton__subMenuBox--disabled">
            <button
              disabled
              onClick={() => setCurrentTheme("chrome-dev-tools")}
            >
              <span>Chrome Dev Tools</span>
              {currentTheme === "chrome-dev-tools" && (
                <span data-icon="&#60082;" />
              )}
            </button>
          </li>
          <li className="MenuButton__subMenuBox--disabled">
            <button disabled onClick={() => setCurrentTheme("ocean-next")}>
              <span>Ocean Next</span>
              {currentTheme === "ocean-next" && <span data-icon="&#60082;" />}
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default MenuButton;
