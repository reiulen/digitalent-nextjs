export default function Pencil({ className, style, fill, width, height }) {
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
      <path
        d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
        fill={fill}
      />
    </svg>
  );
}

Pencil.defaultProps = {
  width: "14",
  height: "12",
  fill: "rgba(255,255,255,1)",
};
