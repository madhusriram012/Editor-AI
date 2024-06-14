import Lang from "../assets/Maps/ExtToMap.json";

export function handleEditorContent(folderStructure, content) {
  const monaco = window.monaco;
  const editor = window.editor;

  const exist = monaco.editor
    .getModels()
    .map((elem) => elem._associatedResource.path);

  if (!exist.includes("/" + folderStructure.path)) {
    monaco.editor.createModel(
      content,
      Lang[folderStructure.ext] ? Lang[folderStructure.ext][0] : "txt",
      new monaco.Uri().with({ path: folderStructure.path })
    );
  }
  const neededModel = monaco.editor
    .getModels()
    .find(
      (model) => model._associatedResource.path === "/" + folderStructure.path
    );
  editor.setModel(neededModel);

  return { editor, neededModel };
}

export function monacoBindingModel(path) {
  const monaco = window.monaco;
  const editor = window.editor;

  const exist = monaco.editor
    .getModels()
    .map((elem) => elem._associatedResource.path);
  const ext = path.split(".").pop();

  if (!exist.includes("/" + path)) {
    monaco.editor.createModel(
      "",
      Lang[ext] ? Lang[ext][0] : "txt",
      new monaco.Uri().with({ path: path })
    );
  }

  const neededModel = monaco.editor
    .getModels()
    .find((model) => model._associatedResource.path === "/" + path);

  editor.setModel(neededModel);
  return { editor, neededModel };
}
