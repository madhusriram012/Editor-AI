import { useStoreState } from "easy-peasy";
import { useState, useEffect } from "react";
import {
  dijkstra,
  getInitialGrid,
  getNodesInShortestPathOrder,
} from "../../../utils/VisualizerUtils/GridUtils";
import {
  getBubbleSortAnimations,
  getMergeSortAnimations,
  getQuickSortAnimations,
} from "../../../utils/VisualizerUtils/SortHelper";
import FancyButton from "../../FancyButton/FancyButton";
import FancySlider from "../../FancySlider/FancySlider";
import {
  BinarySearchMarkdown,
  Heaps,
  Knapsack,
  Kruskal,
  MinSpanningTree,
  PrimAlgo,
  Traveling,
} from "../../LearningMaterial/Material";
import BubbleSort from "../../pseudocode/pseudocode-bubble";
import MergeSort from "../../pseudocode/pseudocode-merge";
import QuickSort from "../../pseudocode/pseudocode-quicksort";
import DijkstraGrid from "../components/DijkstraGrid/DijkstraGrid";
import SortBlocks from "../components/SortBlocks/SortBlocks";
import "./VizLayout.scss";

function VizLayout() {
  const vizItem = useStoreState((state) => state.vizItem);
  const PRIMARY_COLOR = "aqua";
  const SECONDARY_COLOR = "red";
  const TERTIARY_COLOR = "green";
  const [START_NODE_ROW, setSTART_NODE_ROW] = useState(0);
  const [START_NODE_COL, setSTART_NODE_COL] = useState(0);
  const [FINISH_NODE_COL, setFINISH_NODE_COL] = useState(0);
  const [FINISH_NODE_ROW, setFINISH_NODE_ROW] = useState(0);

  const randomHeights = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const generateBlockArray = (Size = arraySize) => {
    return [
      ...Array(Size)
        .fill()
        .map(() => randomHeights(10, 300)),
    ];
  };

  const [animationSpeed, setAnimationSpeed] = useState(20);
  const [arraySize, setArraySize] = useState(70);

  const localArray = generateBlockArray();

  const [blockArray, setBlockArray] = useState(localArray);
  const [blockArray2, setBlockArray2] = useState(localArray);
  const [blockArray3, setBlockArray3] = useState(localArray);
  const [selectedAlgo, setSelectedAlgo] = useState("");
  const [isCompare, setIsCompare] = useState(false);

  //=================== SORTING ===================
  function mergeSort() {
    const animations = getMergeSortAnimations(blockArray);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        isCompare
          ? "SortBlocks__blockBox--mergeSort"
          : "SortBlocks__blockBox--general"
      );
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          // arrayBars[barOneIdx].innerHTML = `<pre>${newHeight}</pre>`;
        }, i * animationSpeed);
      }
    }
  }

  function quickSort() {
    const animations2 = getQuickSortAnimations(
      isCompare ? blockArray2 : blockArray
    );
    for (let i = 0; i < animations2.length; i++) {
      const arrayBars = document.getElementsByClassName(
        isCompare
          ? "SortBlocks__blockBox--quickSort"
          : "SortBlocks__blockBox--general"
      );
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] =
          animations2[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = TERTIARY_COLOR;
        barOneStyle.height = `${barOneHeight}px`;
        barTwoStyle.height = `${barTwoHeight}px`;
      }, i * animationSpeed);
    }
  }

  function bubbleSort() {
    const animations3 = getBubbleSortAnimations(
      isCompare ? blockArray3 : blockArray
    );
    for (let i = 0; i < animations3.length; i++) {
      const arrayBars = document.getElementsByClassName(
        isCompare
          ? "SortBlocks__blockBox--bubbleSort"
          : "SortBlocks__blockBox--general"
      );
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] =
          animations3[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = TERTIARY_COLOR;
        barOneStyle.height = `${barOneHeight}px`;
        barTwoStyle.height = `${barTwoHeight}px`;
      }, i * animationSpeed);
    }
  }

  // =================== PATHFINDING ===================

  const [basicGrid, setBasicGrid] = useState(null);

  const resetGrid = () => {
    const allNodeItems = document.getElementsByClassName("NodeItem");
    for (let i = 0; i < allNodeItems.length; i++) {
      // if class list does not contain NodeItem--start or NodeItem--finish
      if (
        !allNodeItems[i].classList.contains("NodeItem--start") &&
        !allNodeItems[i].classList.contains("NodeItem--finish")
      ) {
        allNodeItems[i].className = "NodeItem";
      } else if (allNodeItems[i].classList.contains("NodeItem--start")) {
        allNodeItems[i].className = "NodeItem NodeItem--start";
      } else if (allNodeItems[i].classList.contains("NodeItem--finish")) {
        allNodeItems[i].className = "NodeItem NodeItem--finish";
      }
    }
  };

  const recalculateGrid = () => {
    const container = document.querySelector(".VizLayout__pathBox--top");
    if (container) {
      const clientWidth = container.clientWidth;
      const clientHeight = container.clientHeight;
      const numberOfNodesRow = Math.floor(clientHeight / 30);
      const numberOfNodesCol = Math.floor(clientWidth / 30);

      setSTART_NODE_ROW(Math.floor(numberOfNodesRow / 2));
      setSTART_NODE_COL(Math.floor(numberOfNodesCol * 0.15));
      setFINISH_NODE_ROW(Math.floor(numberOfNodesRow / 2));
      setFINISH_NODE_COL(Math.floor(numberOfNodesCol * 0.85));
      const grid = getInitialGrid(
        numberOfNodesRow,
        numberOfNodesCol,
        Math.floor(numberOfNodesRow / 2),
        Math.floor(numberOfNodesCol * 0.15),
        Math.floor(numberOfNodesRow / 2),
        Math.floor(numberOfNodesCol * 0.85)
      );
      resetGrid();
      setBasicGrid(grid);
    }
  };

  useEffect(() => {
    recalculateGrid();
    // add mutation observer to Workbench__bottom element inline style
    const container = document.querySelector(".Workbench__bottom");
    const parent = document.querySelector(".VizLayout__pathBox--top");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          recalculateGrid();
        }
      });
    });
    if (container && parent) {
      parent.addEventListener("resize", recalculateGrid);

      observer.observe(container, {
        attributes: true,
      });
    }

    return () => {
      if (container && parent) {
        observer.disconnect();
        parent.removeEventListener("resize", recalculateGrid);
      }
    };
  }, []);

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const cList = document.getElementById(
          `NodeItem-${node.row}-${node.col}`
        ).classList;

        if (cList.contains("NodeItem--start")) {
          document.getElementById(
            `NodeItem-${node.row}-${node.col}`
          ).className = "NodeItem NodeItem--start";
        } else if (cList.contains("NodeItem--finish")) {
          document.getElementById(
            `NodeItem-${node.row}-${node.col}`
          ).className = "NodeItem NodeItem--finish";
        } else {
          document.getElementById(
            `NodeItem-${node.row}-${node.col}`
          ).className = "NodeItem NodeItem--visited";
        }
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const cList = document.getElementById(
          `NodeItem-${node.row}-${node.col}`
        ).classList;

        if (cList.contains("NodeItem--start")) {
          document.getElementById(
            `NodeItem-${node.row}-${node.col}`
          ).className = "NodeItem NodeItem--start";
        } else if (cList.contains("NodeItem--finish")) {
          document.getElementById(
            `NodeItem-${node.row}-${node.col}`
          ).className = "NodeItem NodeItem--finish";
        } else {
          document.getElementById(
            `NodeItem-${node.row}-${node.col}`
          ).className = "NodeItem NodeItem--shortest-path";
        }
      }, 50 * i);
    }
  }

  function visualizeDijkstra() {
    const grid = basicGrid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  return (
    <div
      className={`VizLayout VizLayout__${vizItem}`}
      style={{
        padding: vizItem !== "sort" && vizItem !== "path" ? "20px" : "",
        overflowY: vizItem !== "sort" && vizItem !== "path" ? "auto" : "",
      }}
    >
      {vizItem === "sort" && (
        <>
          <div className={`VizLayout__sort--top`}>
            {!isCompare && (
              <SortBlocks blockArray={blockArray} sortType="general" />
            )}
            {isCompare && (
              <>
                <div className="VizLayout__sort--ComparePartition">
                  <h3>Merge Sort</h3>
                  <SortBlocks
                    blockArray={blockArray}
                    optionalColor="pink"
                    sortType="mergeSort"
                  />
                </div>
                <div className="VizLayout__sort--ComparePartition">
                  <h3>Quick Sort</h3>
                  <SortBlocks
                    blockArray={blockArray2}
                    optionalColor="violet"
                    sortType="quickSort"
                  />
                </div>
                <div className="VizLayout__sort--ComparePartition">
                  <h3>Bubble Sort</h3>
                  <SortBlocks
                    blockArray={blockArray3}
                    optionalColor="orange"
                    sortType="bubbleSort"
                  />
                </div>
              </>
            )}
          </div>
          <div className="VizLayout__sort--bottom">
            <div className="VizLayout__sort--algos">
              <h3>Algorithms</h3>
              {!isCompare ? (
                <>
                  <FancyButton
                    onClick={() => {
                      mergeSort();
                      setSelectedAlgo("merge");
                    }}
                  >
                    Merge Sort
                  </FancyButton>
                  <FancyButton
                    onClick={() => {
                      quickSort();
                      setSelectedAlgo("quick");
                    }}
                  >
                    Quick Sort
                  </FancyButton>
                  <FancyButton
                    onClick={() => {
                      bubbleSort();
                      setSelectedAlgo("bubble");
                    }}
                  >
                    Bubble Sort
                  </FancyButton>
                </>
              ) : (
                <FancyButton
                  onClick={() => {
                    const promises = [bubbleSort(), quickSort(), mergeSort()];
                    Promise.all(promises);
                  }}
                >
                  Sort
                </FancyButton>
              )}
            </div>
            <div className="VizLayout__sort--controls">
              <h3>Controls</h3>
              <FancyButton
                onClick={() => {
                  setIsCompare(!isCompare);
                  if (!isCompare) {
                    const windowWidth = document.querySelector(
                      ".VizLayout__sort--top"
                    ).clientWidth;
                    const sectionSize = Math.floor((windowWidth / 3 - 30) / 11);
                    const temp = generateBlockArray(sectionSize);
                    setBlockArray(temp);
                    setBlockArray2(temp);
                    setBlockArray3(temp);
                    setArraySize(sectionSize);
                  } else {
                    setArraySize(70);
                    const temp = generateBlockArray(70);
                    setBlockArray(temp);
                    setBlockArray2(temp);
                    setBlockArray3(temp);
                  }
                }}
              >
                Compare
              </FancyButton>
              <FancyButton
                onClick={() => {
                  const temp = generateBlockArray();
                  setBlockArray(temp);
                  setBlockArray2(temp);
                  setBlockArray3(temp);

                  if (isCompare === false) {
                    const arrayBars = document.getElementsByClassName(
                      "SortBlocks__blockBox"
                    );
                    for (let i = 0; i < arrayBars.length; i++) {
                      arrayBars[i].style = "";
                    }
                  } else {
                    const arrayBars1 = document.getElementsByClassName(
                      "SortBlocks__blockBox--quickSort"
                    );
                    const arrayBars2 = document.getElementsByClassName(
                      "SortBlocks__blockBox--mergeSort"
                    );
                    const arrayBars3 = document.getElementsByClassName(
                      "SortBlocks__blockBox--bubbleSort"
                    );
                    for (let i = 0; i < arrayBars1.length; i++)
                      arrayBars1[i].style.backgroundColor = "violet";

                    for (let i = 0; i < arrayBars2.length; i++)
                      arrayBars2[i].style.backgroundColor = "pink";

                    for (let i = 0; i < arrayBars3.length; i++)
                      arrayBars3[i].style.backgroundColor = "orange";
                  }
                }}
              >
                New Array
              </FancyButton>
              <div className="VizLayout__sort--controlsRow">
                <span>
                  <p>Animation speed</p> <pre>{animationSpeed}</pre>
                </span>
                <FancySlider
                  min="10"
                  max="1000"
                  value={animationSpeed}
                  onValueChange={(val) => setAnimationSpeed(val)}
                />
              </div>
              <div className="VizLayout__sort--controlsRow">
                <span>
                  <p> Array size</p> <pre>{arraySize}</pre>
                </span>
                <FancySlider
                  min="10"
                  max="100"
                  disabled={isCompare}
                  value={arraySize}
                  onValueChange={(val) => {
                    setArraySize(val);
                    const temp = generateBlockArray();
                    setBlockArray(temp);
                    setBlockArray2(temp);
                    setBlockArray3(temp);
                  }}
                />
              </div>
            </div>
            <div className="VizLayout__sort--pseudoCode">
              {selectedAlgo === "bubble" && <BubbleSort />}
              {selectedAlgo === "merge" && <MergeSort />}
              {selectedAlgo === "quick" && <QuickSort />}
            </div>
          </div>
        </>
      )}

      {vizItem === "path" && (
        <div className="VizLayout__pathBox">
          <div className="VizLayout__pathBox--top">
            {basicGrid !== null && (
              <DijkstraGrid basicGrid={basicGrid} setBasicGrid={setBasicGrid} />
            )}
          </div>
          <div className="VizLayout__pathBox--bottom">
            <div className="VizLayout__pathBox--left">
              <FancyButton onClick={visualizeDijkstra}>
                Dijkstra's Algorithm
              </FancyButton>
              <FancyButton
                onClick={() => {
                  recalculateGrid();
                }}
              >
                Clear Board
              </FancyButton>
            </div>
          </div>
        </div>
      )}

      {vizItem === "binarySearch" && <BinarySearchMarkdown />}
      {vizItem === "minSpanningTree" && <MinSpanningTree />}
      {vizItem === "primAlgo" && <PrimAlgo />}
      {vizItem === "kruskal" && <Kruskal />}
      {vizItem === "knapsack" && <Knapsack />}
      {vizItem === "heaps" && <Heaps />}
      {vizItem === "traveling" && <Traveling />}
      {vizItem === "astar" && <Traveling />}
    </div>
  );
}

export default VizLayout;
