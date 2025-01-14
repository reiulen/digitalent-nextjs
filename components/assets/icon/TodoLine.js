export default function TodoLine({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3333 1.33333H13.3333C13.5101 1.33333 13.6797 1.40357 13.8047 1.5286C13.9298 1.65362 14 1.82319 14 2V14C14 14.1768 13.9298 14.3464 13.8047 14.4714C13.6797 14.5964 13.5101 14.6667 13.3333 14.6667H2.66667C2.48986 14.6667 2.32029 14.5964 2.19526 14.4714C2.07024 14.3464 2 14.1768 2 14V2C2 1.82319 2.07024 1.65362 2.19526 1.5286C2.32029 1.40357 2.48986 1.33333 2.66667 1.33333H4.66667V0H6V1.33333H10V0H11.3333V1.33333ZM11.3333 2.66667V4H10V2.66667H6V4H4.66667V2.66667H3.33333V13.3333H12.6667V2.66667H11.3333ZM4.66667 5.33333H11.3333V6.66667H4.66667V5.33333ZM4.66667 8H11.3333V9.33333H4.66667V8Z"
        fill={fill}
      />
    </svg>
  );
}

TodoLine.defaultProps = {
  width: "16",
  height: "16",
  fill: "white",
};
