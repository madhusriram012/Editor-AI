import "./FancySlider.scss";

function FancySlider({ value, onValueChange, min, max, disabled = false }) {
  return (
    <input
      type="range"
      min={min}
      disabled={disabled}
      max={max}
      value={value}
      className="FancySlider"
      onChange={(e) => onValueChange(parseInt(e.target.value))}
    />
  );
}

export default FancySlider;
