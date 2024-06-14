import { useState } from "react";
import { getNewGridWithWallToggled } from "../../../../utils/VisualizerUtils/GridUtils";
import Node from "../Node/Node";
import "./DijkstraGrid.scss";

function DijkstraGrid({ basicGrid, setBasicGrid }) {
  const [isMousePressed, setIsMousePressed] = useState(false);

  return (
    <div className="DijkstraGrid">
      {basicGrid.map((row, rowIndex) => {
        return (
          <div className="DijkstraGrid__row" key={rowIndex}>
            {row.map((node, nodeIndex) => (
              <Node
                key={`${nodeIndex}_${node.row}_${node.col}`}
                col={node.col}
                isFinish={node.isFinish}
                isStart={node.isStart}
                isWall={node.isWall}
                onMouseDown={() => {
                  const newGrid = getNewGridWithWallToggled(
                    basicGrid,
                    node.row,
                    node.col
                  );
                  setBasicGrid(newGrid);
                  setIsMousePressed(true);
                }}
                onMouseEnter={() => {
                  if (!isMousePressed) return;
                  const newGrid = getNewGridWithWallToggled(
                    basicGrid,
                    node.row,
                    node.col
                  );
                  setBasicGrid(newGrid);
                }}
                onMouseUp={() => setIsMousePressed(false)}
                row={node.row}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default DijkstraGrid;
