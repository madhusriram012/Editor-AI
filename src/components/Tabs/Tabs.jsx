
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import PropTypes from "prop-types";
import "./Tabs.scss";
import SetiMap from "../../assets/Maps/SetiMap.json";
import { MonacoBinding } from "y-monaco";
import { monacoBindingModel } from "../../utils/MonacoModel";

function Tabs({ setPromptText }) {
  const monaco = window.monaco;
  const editor = window.editor;

  const selectedFiles = useStoreState((state) => state.selectedFiles);
  const currentFile = useStoreState((state) => state.currentFile);
  const setCurrentFile = useStoreActions((action) => action.setCurrentFile);
  const removeSelectedFile = useStoreActions(
    (action) => action.removeSelectedFile
  );
  const setYBinding = useStoreActions((actions) => actions.setYBinding);
  const yBinding = useStoreState((state) => state.yBinding);
  const hostSessionId = useStoreState((state) => state.hostSessionId);

  const handleFileClick = async (item, model) => {
    setCurrentFile(item);
    const textValue = model.getValue();
    setPromptText(textValue); // Set prompt text in parent component

    // Additional logic for yBinding and hostSessionId
    if (item.handler === "bindingHandler") {
      if (yBinding) {
        try {
          yBinding.destroy();
        } catch (err) {}
      }
      const { editor, neededModel } = monacoBindingModel(item.path);

      const newBinding = new MonacoBinding(
        item.yText,
        neededModel,
        new Set([editor])
      );
      setYBinding(newBinding);
    }

    if (hostSessionId !== null) {
      if (yBinding) {
        try {
          yBinding.destroy();
        } catch (err) {}
      }

      const yText = window.yDoc.getText(item.path);
      console.log(yText);
      const newBinding = new MonacoBinding(
        yText,
        model,
        new Set([editor])
      );
      setYBinding(newBinding);
    }
  };

  return (
    <ul className="TabsWrapper">
      {selectedFiles.map((item, index) => {
        const iconChar =
          SetiMap["iconDefinitions"][SetiMap["languageIds"][item.ext]];
        const iconOctal = String.fromCharCode(
          parseInt(iconChar?.fontCharacter.replace("\\", ""), 16)
        );

        const model = monaco.editor
          .getModels()
          .find((model) => model._associatedResource.path === "/" + item.path);

        const modelIndex = monaco.editor.getModels().indexOf(model);
        const models = monaco.editor.getModels();
        return (
          <li
            className={`TabsWrapper--${
              currentFile.path === item.path ? "activeItem" : "item"
            }`}
            key={index}
          >
            <span
              data-lang={
                iconChar !== undefined ? iconOctal : String.fromCharCode(57379)
              }
              style={{
                color: iconChar !== undefined ? iconChar.fontColor : "",
                paddingRight:
                  item.handler !== "bindingHandler" ? "32px" : "10px",
              }}
              onClick={async () => {
                editor.setModel(model);
                await handleFileClick(item, model); // Call handleFileClick with item and model
               
              }}
            >
              <p>{item.name}</p>
            </span>
            <span
              style={{
                display: item.handler !== "bindingHandler" ? "block" : "none",
              }}
              data-icon={String.fromCharCode(60022)}
              onClick={() => {
                removeSelectedFile(item);
                model.dispose();

                if (currentFile.path === item.path) {
                  if (modelIndex === 0 && models.length > 1) {
                    editor.setModel(monaco.editor.getModels()[0]);
                    setCurrentFile(selectedFiles[1]);
                    const textValue = models[0].getValue();
                    setPromptText(textValue);
                  } else if (
                    modelIndex === models.length - 1 &&
                    models.length > 1
                  ) {
                    editor.setModel(monaco.editor.getModels()[modelIndex - 1]);
                    setCurrentFile(selectedFiles[selectedFiles.length - 2]);
                    const textValue = models[modelIndex - 1].getValue();
                    setPromptText(textValue);
                  } else if (models.length > 2) {
                    editor.setModel(monaco.editor.getModels()[modelIndex + 1]);
                    setCurrentFile(selectedFiles[modelIndex + 1]);
                    const textValue = models[modelIndex + 1].getValue();
                    setPromptText(textValue);
                    // Log here
                  } else if (models.length === 1) {
                    setCurrentFile({ path: "" });
                    setPromptText("");
                  }
                }
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

Tabs.propTypes = {
  // bla: PropTypes.string,
  setPromptText: PropTypes.func.isRequired,
};

Tabs.defaultProps = {
  // bla: 'test',s
};

export default Tabs;
