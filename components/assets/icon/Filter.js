export default function Filter({ className, style, fill, width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      style={style}
      width={width}
      height={height}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M10 14L4 5V3h16v2l-6 9v6l-4 2z" fill={fill} />
    </svg>
  );
}

Filter.defaultProps = {
  width: "20",
  height: "20",
  fill: "#E4E6EF",
};
