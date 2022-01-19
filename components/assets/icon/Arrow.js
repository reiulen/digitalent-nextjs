export default function Arrow({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 6 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.8751 0H5.28916C5.24932 0 5.21182 0.0195313 5.18838 0.0515626L2.96885 3.11094L0.749318 0.0515626C0.72588 0.0195313 0.68838 0 0.648537 0H0.062599C0.0118177 0 -0.0178698 0.0578126 0.0118177 0.0992189L2.76651 3.89688C2.86651 4.03438 3.07119 4.03438 3.17041 3.89688L5.9251 0.0992189C5.95557 0.0578126 5.92588 0 5.8751 0Z"
        fill={fill}
      />
    </svg>
  );
}

Arrow.defaultProps = {
  width: "6",
  height: "4",
  fill: "#1BC5BD",
};
