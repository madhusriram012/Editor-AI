import "./SortBlocks.scss";

function SortBlocks({ blockArray, optionalColor = "", sortType }) {
  return (
    <ul className={`SortBlocks SortBlocks--${sortType}`}>
      {blockArray.map((height, index) => (
        <li
          className={`SortBlocks__blockBox SortBlocks__blockBox--${sortType}`}
          key={index}
          style={{
            height: `${height}px`,
            backgroundColor: optionalColor,
          }}
        >
        </li>
      ))}
    </ul>
  );
}

export default SortBlocks;
