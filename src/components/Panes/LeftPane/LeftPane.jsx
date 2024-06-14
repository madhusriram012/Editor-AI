import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { CreateFolderMap } from "../../../utils/FileAccess";
import BlurredSpinner from "../../BlurredSpinner/BlurredSpinner";
import FancyButton from "../../FancyButton/FancyButton";
import FolderTree from "../../FolderTree/FolderTree";
import "./LeftPane.scss";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../../RaisedContainer/Popup.css";


function LeftPane() {
  const API_KEY = "AIzaSyBSSw__qdi-2LfTX5TLzgRGNtH8R7jhQPo";
  //  import.meta.env.GEMINI_API_KEY;
  const currentActivity = useStoreState((state) => state.activityItem);
  const [isMouseOver, setMouseOver] = useState(false);
  const setActiveItem = useStoreActions((actions) => actions.setActivityItem);
  const setVizItem = useStoreActions((actions) => actions.setVizItem);
  const setSelectedFolderState = useStoreActions(
    (actions) => actions.setSelectedFolderState
  );
  const activeItem = useStoreState((state) => state.activityItem);
  const [showLoader, setShowLoader] = useState(false);
  const folderStructure = useStoreState((state) => state.selectedFolder);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [text, setText] = useState("");

  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const FetchDataFromAPI = async (event) => {
    event.preventDefault();
    setLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = text || "What's different between these pictures?";
    const files = event.target.elements.images.files;
    const imageParts = await Promise.all([...files].map(fileToGenerativePart));

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const textResult = await response.text();
    setLoading(false);
    setResult(textResult);
  };

  return (
    <div className="LeftPane">
      <ul className="LeftPane__headerTabs">
        <li
          className={`LeftPane__headerTabs--${
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
          className={`LeftPane__headerTabs--${
            activeItem === "visualize" ? "activeItem" : "item"
          }`}
        >
          <button
            onClick={() => {
              if (activeItem !== "visualize") {
                setActiveItem("visualize");
              }
            }}
            data-icon={String.fromCharCode(60068)}
          >
            <p>visualize</p>
          </button>
        </li>
        <li
          className={`LeftPane__headerTabs--${
            activeItem === "gemini" ? "activeItem" : "item"
          }`}
        >
          <button
            onClick={() => {
              if (activeItem !== "gemini") {
                setActiveItem("gemini");
              }
            }}
            data-icon={String.fromCharCode(60064)}
          >
            <p>Gemini</p>
          </button>
        </li>
      </ul>
      <div
        className="LeftPane__content"
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        style={{
          overflow: isMouseOver ? "auto" : "hidden",
        }}
      >
        <div className="LeftPane__content--inner">
          {currentActivity === "explorer" && (
            <>
              {showLoader && <BlurredSpinner />}

              {folderStructure ? (
                <FolderTree
                  original={folderStructure}
                  folderStructure={folderStructure}
                />
              ) : (
                <div className="Workbench__content--empty">
                  <FancyButton
                    onClick={async () => {
                      setShowLoader(true);
                      try {
                        const root = await CreateFolderMap();
                        setSelectedFolderState(root);
                        setShowLoader(false);
                      } catch (error) {
                        setShowLoader(false);
                      }
                    }}
                    innerText="Open a folder"
                  />
                </div>
              )}
            </>
          )}

          {currentActivity == "gemini" && (
            <div className="Workbench__content--empty">
              <h2 className="gradient-text">Ask Gemini</h2>
              <form onSubmit={FetchDataFromAPI}>
                <div>
                  <label htmlFor="textInput"></label>
                  <input
                    style={{
                      width: "270px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                    type="text"
                    id="textInput"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="fileInput"></label>
                  <br />
                  <input type="file" id="fileInput" name="images" multiple />
                </div>
                <br />
                <FancyButton type="submit">
                  {loading ? "Loading....." : "BARD IT"}
                </FancyButton>
              </form>

              <br />
              {/* <div className="resultview">
                <h2>Result:</h2>
                <p>{result}</p>
              </div> */}

              {result && (
                <div>
                  <h2>Result:</h2>
                  <p>{result}</p>
                </div>
              )}
            </div>
          )}

          {currentActivity === "visualize" && (
            <div className="Workbench__content--empty">
              <h2>Visualize Algos</h2>
              <FancyButton
                onClick={() => setVizItem("sort")}
                innerText="Sorting"
              />
              <FancyButton
                onClick={() => setVizItem("path")}
                innerText="Path Finding"
              />
              <br />
              <h2>Learn Algos</h2>
              <FancyButton
                onClick={() => setVizItem("binarySearch")}
                innerText="Binary Search"
              />
              <FancyButton
                onClick={() => setVizItem("minSpanningTree")}
                innerText="Min Spanning Tree"
              />
              <FancyButton
                onClick={() => setVizItem("primAlgo")}
                innerText="Prim's Algo"
              />
              <FancyButton
                onClick={() => setVizItem("kruskal")}
                innerText="Kruskal's Algo"
              />
              <FancyButton
                onClick={() => setVizItem("knapsack")}
                innerText="Knapsack"
              />
              <FancyButton
                onClick={() => setVizItem("heaps")}
                innerText="Heaps"
              />{" "}
              <br />
              <h2>Coming Soon</h2>
              <FancyButton
                onClick={() => setVizItem("traveling")}
                innerText="Traveling Sales Man"
              />{" "}
              <FancyButton onClick={() => setVizItem("astar")} innerText="A*" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftPane;
