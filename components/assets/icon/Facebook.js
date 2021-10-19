export default function Facebook({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.402 18V11.034H14.735L15.084 8.326H12.402V6.598C12.402 5.814 12.62 5.279 13.744 5.279H15.178V2.857C14.4838 2.78334 13.7861 2.74762 13.088 2.75C11.021 2.75 9.606 4.012 9.606 6.33V8.326H7.268V11.034H9.606V18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H12.402Z"
        fill={fill}
      />
    </svg>
  );
}

Facebook.defaultProps = {
  width: "18",
  height: "18",
  fill: "white",
};
