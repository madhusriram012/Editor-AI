import { createStore, action, persist, debug } from "easy-peasy";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import storage from "../utils/StorageEngine";
import * as Y from "yjs";

window.monaco = monaco;
let yDoc = new Y.Doc();
let ySharedDocs = yDoc.getArray("daima-editorList");
window.yDoc = yDoc;
window.ySharedDocs = ySharedDocs;

const Store = createStore(
  persist(
    {
      // monaco: monaco,
      theme: "github",
      vizItem: "path", // sort, path
      leftPanelWidth: 284,
      rightPanelWidth: 284,
      activityItem: "explorer",
      ySharedDocs: ySharedDocs,
      yProvider: null,
      yBinding: null,
      sidePanelState: { left: true, right: false },

      selectedFolder: null,

      selectedFiles: [],

      currentFileContent: null,
      currentFileChanged: false,
      currentFile: { path: "" },

      isAutoSave: false,
      isSaving: false,
      isFullScreen: false,
      debounce: 1000,

      hostSessionId: null,
      joinSessionId: null,

      setYSharedDocs: action((state, payload) => {
        state.ySharedDocs = payload;
      }),
      setYBinding: action((state, payload) => {
        state.yBinding = payload;
      }),
      setYProvider: action((state, payload) => {
        state.yProvider = payload;
      }),
      setHostSessionId: action((state, payload) => {
        state.hostSessionId = payload;
        if (payload === null) {
          try {
            state.ySharedDocs = state.ySharedDocs.delete(
              0,
              state.ySharedDocs.length
            );
          } catch (e) {}
          if (state.yBinding) {
            state.yBinding.destroy();
          }
          if (state.yProvider) {
            state.yProvider.destroy();
          }
        }
      }),

      setJoinSessionId: action((state, payload) => {
        state.joinSessionId = payload;
        if (payload === null) {
          state.ySharedDocs = state.ySharedDocs.delete(
            0,
            state.ySharedDocs.length
          );
          if (state.yBinding) {
            state.yBinding.destroy();
          }
          if (state.yProvider) {
            state.yProvider.destroy();
          }
        }
      }),

      setVizItem: action((state, payload) => {
        state.vizItem = payload;
      }),

      toggleAutoSave: action((state) => {
        state.isAutoSave = !state.isAutoSave;
      }),
      setIsSaving: action((state, payload) => {
        state.isSaving = payload;
      }),

      toggleFullScreenState: action((state) => {
        state.isFullScreen = !state.isFullScreen;
      }),

      setSidePanelState: action((state, payload) => {
        state.sidePanelState = { ...state.sidePanelState, ...payload };

        if (payload.left && state.leftPanelWidth === 0)
          state.leftPanelWidth = 284;

        if (payload.right && state.rightPanelWidth === 0)
          state.rightPanelWidth = 284;
      }),

      setCurrentFile: action((state, payload) => {
        state.currentFile = payload;
      }),

      setSelectedFiles: action((state, payload) => {
        if (
          state.selectedFiles.find((item) => item.path === payload.path) ===
          undefined
        ) {
          state.selectedFiles = [...state.selectedFiles, payload];
        }
      }),

      removeSelectedFile: action((state, payload) => {
        state.selectedFiles = state.selectedFiles.filter(
          (item) => item.path !== payload.path
        );
      }),

      setCurrentFileChanged: action((state, payload) => {
        state.currentFileChanged = payload;
      }),

      setCurrentFileContent: action((state, payload) => {
        state.currentFileContent = payload;
      }),

      setSelectedFolderState: action((state, payload) => {
        state.selectedFolder = payload;
      }),

      setTheme: action((state, payload) => {
        state.theme = payload;
        window.monaco.editor.setTheme(payload);
      }),
      setActivityItem: action((state, payload) => {
        state.activityItem = payload;
      }),

      setLeftPanelWidth: action((state, payload) => {
        state.leftPanelWidth = payload;
        if (payload === 0)
          state.sidePanelState = { ...state.sidePanelState, left: false };
        else if (payload > 0 && !state.sidePanelState.left)
          state.sidePanelState = { ...state.sidePanelState, left: true };
      }),
      setRightPanelWidth: action((state, payload) => {
        state.rightPanelWidth = payload;
        if (payload === 0)
          state.sidePanelState = { ...state.sidePanelState, right: false };
        else if (payload > 0 && !state.sidePanelState.right)
          state.sidePanelState = { ...state.sidePanelState, right: true };
      }),
    },
    {
      deny: [
        "selectedFolder",
        "selectedFiles",
        "selectedFileContent",
        "currentFile",
        "currentFileContent",
        "yBinding",
        "yProvider",
        "ySharedDocs",
        "hostSessionId",
        "joinSessionId",
      ],
      storage: storage("diama-editor"),
    }
  )
);

export { Store };
