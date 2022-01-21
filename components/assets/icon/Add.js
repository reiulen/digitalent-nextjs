export default function Add({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.33331 4.3335V0.333496H5.66665V4.3335H9.66665V5.66683H5.66665V9.66683H4.33331V5.66683H0.333313V4.3335H4.33331Z"
        fill={fill}
      />
    </svg>
  );
}

Add.defaultProps = {
  width: "10",
  height: "10",
  fill: "white",
};
