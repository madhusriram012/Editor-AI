import "./FancyButton.scss";

function FancyButton({
  className,
  children,
  innerText,
  onClick = () => {},
  ...props
}) {
  return (
    <button
      className={`FancyButton ${className}`}
      {...props}
      onClick={async () => await onClick()}
    >
      {innerText ? innerText : children}
    </button>
  );
}

export default FancyButton;
