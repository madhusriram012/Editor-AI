import "./Node.scss";

function Node({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
}) {
  const extraClassName = isFinish
    ? "NodeItem--finish"
    : isStart
    ? "NodeItem--start"
    : isWall
    ? "NodeItem--wall"
    : "";

  return (
    <div
      id={`NodeItem-${row}-${col}`}
      className={`NodeItem ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  );
}

export default Node;
