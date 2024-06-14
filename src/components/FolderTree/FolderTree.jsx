import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState, useEffect } from "react";
import { getFileContents } from "../../utils/FileAccess";
import "./FolderTree.scss";
import SetiMap from "../../assets/Maps/SetiMap.json";
import { handleEditorContent } from "../../utils/MonacoModel";
import { MonacoBinding } from "y-monaco";

import * as Y from "yjs";

function File({ folderStructure, depth }) {
  const setSelectedFiles = useStoreActions((action) => action.setSelectedFiles);
  const setCurrentFile = useStoreActions((action) => action.setCurrentFile);

  const yBinding = useStoreState((state) => state.yBinding);
  // const ySharedDocs = useStoreState((state) => state.ySharedDocs);
  const ySharedDocs = window.ySharedDocs;
  const setYSharedDocs = useStoreActions((action) => action.setYSharedDocs);
  const setYBinding = useStoreActions((action) => action.setYBinding);

  const setCurrentFileChanged = useStoreActions(
    (action) => action.setCurrentFileChanged
  );
  const iconChar =
    SetiMap["iconDefinitions"][SetiMap["languageIds"][folderStructure.ext]];
  const iconOctal = String.fromCharCode(
    parseInt(iconChar?.fontCharacter.replace("\\", ""), 16)
  );

  const joinSessionId = useStoreState((state) => state.joinSessionId);
  const hostSessionId = useStoreState((state) => state.hostSessionId);

  return (
    <div
      className="File"
      tabIndex={1}
      style={{
        paddingLeft: `${depth * 9}px`,
      }}
      onClick={async () => {
        setSelectedFiles(folderStructure);
        setCurrentFile(folderStructure);
        const content = await getFileContents(folderStructure.handler);
        setCurrentFileChanged(false);
        const { editor, neededModel } = handleEditorContent(
          folderStructure,
          content
        );

        if (joinSessionId !== null || hostSessionId !== null) {
          const yDoc = window.yDoc;
          let newDoc;
          console.log(folderStructure.path);
          if (yDoc.getText(folderStructure.path)._length === 0) {
            yDoc.getText(folderStructure.path).insert(0, content);
            newDoc = yDoc.getText(folderStructure.path);
          } else {
            newDoc = yDoc.getText(folderStructure.path);
          }

          const newBinding = new MonacoBinding(
            newDoc,
            neededModel,
            new Set([editor])
          );

          if (![...ySharedDocs.toJSON()].includes(content)) {
            const newArray = [];
            newArray.push(newDoc);
            ySharedDocs.push(newArray);
          }

          if (yBinding) {
            try {
              yBinding.destroy();
            } catch (err) {}
          }
          setYBinding(newBinding);
        }
      }}
    >
      <div
        className="Folder__intentBox"
        style={{
          width: `${depth * 8}px`,
        }}
      >
        {[...Array(depth - 1)].map((_, index) => (
          <i data-intent key={index} />
        ))}
      </div>
      <span
        data-lang={
          iconChar !== undefined ? iconOctal : String.fromCharCode(57379)
        }
        style={{
          color: iconChar !== undefined ? iconChar.fontColor : "",
        }}
      >
        <p>{folderStructure.name}</p>
      </span>
    </div>
  );
}

function Folder({ folderStructure, depth, original }) {
  const [open, setOpen] = useState(folderStructure.open);
  const [isFocused, setIsFocused] = useState(false);
  const setSelectedFolderState = useStoreActions(
    (action) => action.setSelectedFolderState
  );

  return (
    <div
      className="Folder"
      tabIndex={1}
      onFocus={() => setIsFocused(true)}
      onKeyDown={(e) => {
        if (isFocused && e.key === "Enter") {
          setOpen(!open);
        }
      }}
    >
      <div
        className="Folder__intentBox"
        style={{
          width: `${depth * 8}px`,
        }}
      >
        {[...Array(depth - 1)].map((_, index) => (
          <i data-intent key={index} />
        ))}
      </div>
      <div
        className="Folder__title"
        onClick={() => {
          setOpen(!open);
          const tempOriginal = { ...original };

          const findParent = (folder, original) => {
            if (
              folder.path === original.path &&
              folder.name === original.name
            ) {
              original.open = !original.open;
              return original;
            }
            if (
              folder.path === folderStructure.path &&
              folder.name === folderStructure.name
            ) {
              folder.open = !folder.open;
              return original;
            }
            if (folder.type === "directory") {
              for (let child of folder.children) {
                const result = findParent(child, original);
                if (result) {
                  return result;
                }
              }
            }
          };
          setSelectedFolderState(findParent(folderStructure, tempOriginal));
        }}
        style={{
          paddingLeft: `${depth * 9}px`,
        }}
      >
        <span
          className={`Folder__title--logo${open ? "Open" : "Closed"}`}
          data-icon="&#60084;"
        >
          <p>{folderStructure.name}</p>
        </span>
      </div>
    </div>
  );
}

function FolderTree({ folderStructure, depth = 1, original }) {
  if (folderStructure.type === "directory") {
    return (
      <>
        <Folder
          depth={depth}
          original={original}
          folderStructure={folderStructure}
        />
        {folderStructure.open &&
          folderStructure.children.map((child, index) => (
            <FolderTree
              key={index}
              depth={depth + 1}
              original={original}
              folderStructure={child}
            />
          ))}
      </>
    );
  }
  if (folderStructure.type === "file") {
    return <File folderStructure={folderStructure} depth={depth} />;
  }
}

export default FolderTree;
