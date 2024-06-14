import React, { useEffect, useRef } from "react";
import "./MonacoEditor.scss";
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { DefineMonacoThemes } from "./ThemeHelper";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { saveFileContents } from "../../utils/FileAccess";

function MonacoEditor() {
  const currentTheme = useStoreState((state) => state.theme);
  const monaco = window.monaco;
  const editorRef = useRef(null);
  DefineMonacoThemes(monaco);
  const [localCode, setLocalCode] = useState("");

  const currentFile = useStoreState((state) => state.currentFile);
  const isAutoSave = useStoreState((state) => state.isAutoSave);
  const currentFileChanged = useStoreState((state) => state.currentFileChanged);
  const debounceValue = useStoreState((state) => state.debounce);
  const setCurrentFileChanged = useStoreActions(
    (action) => action.setCurrentFileChanged
  );
  const setIsSaving = useStoreActions((action) => action.setIsSaving);

  const setCurrentFileContent = useStoreActions(
    (action) => action.setCurrentFileContent
  );
  useDebounce(localCode, debounceValue, (dValue) => {
    if ((dValue.length > 0 || currentFileChanged) && isAutoSave) {
      setCurrentFileChanged(true);
      setIsSaving(true);
      saveFileContents(currentFile.handler, dValue).then(() =>
        setIsSaving(false)
      );
    }
  });

  useEffect(() => {
    let tempEditor;
    if (editorRef) {
      tempEditor = monaco.editor.create(editorRef.current, {
        value: "",
        language: "text",
        theme: currentTheme,
        automaticLayout: true,
        model: null,
        fontSize: 14,
        fontFamily: "JetBrains",
        fontLigatures: true,
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: "beforeWhitespace",
        useShadowDOM: true,
        trimAutoWhitespace: true,
      });
      window.editor = tempEditor;
    }
    return () => tempEditor?.dispose();
  }, [editorRef]);

  useEffect(() => {
    monaco.editor.onDidCreateModel((model) => {
      model.onDidChangeContent((_) => {
        const modelContent = model.getValue();
        setLocalCode(modelContent);
        setCurrentFileContent(modelContent);
      });

      model.onWillDispose((e) => {
        saveFileContents(currentFile.handler, model.getValue());
      });
    });
  });

  return <div className="MonacoEditorWrapper" ref={editorRef} />;
}

export default MonacoEditor;
