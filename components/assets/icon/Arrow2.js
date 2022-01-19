export default function Arrow2({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.528554 1.47157C0.268205 1.21122 0.268205 0.789108 0.528554 0.528758C0.788904 0.268409 1.21101 0.268409 1.47136 0.528758L5.47136 4.52876C5.72375 4.78114 5.73258 5.18754 5.49139 5.45065L1.82473 9.45065C1.57593 9.72206 1.15422 9.74039 0.882809 9.4916C0.611396 9.2428 0.593061 8.82109 0.841856 8.54968L4.0772 5.02021L0.528554 1.47157Z"
        fill={fill}
      />
    </svg>
  );
}

Arrow2.defaultProps = {
  width: "6",
  height: "10",
  fill: "#FFFFFF",
};
