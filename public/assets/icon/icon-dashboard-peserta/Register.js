export default function Register({ className, style, fill, width, height }) {
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
        d="M13.3333 1.33325C13.7013 1.33325 14 1.63192 14 1.99992V4.50459L8.00067 10.5046L7.99667 13.3299L10.8273 13.3339L14 10.1613V13.9999C14 14.3679 13.7013 14.6666 13.3333 14.6666H2.66667C2.29867 14.6666 2 14.3679 2 13.9999V1.99992C2 1.63192 2.29867 1.33325 2.66667 1.33325H13.3333ZM14.5187 5.87192L15.4613 6.81459L10.276 11.9999L9.332 11.9986L9.33333 11.0573L14.5187 5.87192ZM8 7.99992H4.66667V9.33325H8V7.99992ZM10 5.33325H4.66667V6.66659H10V5.33325Z"
        fill={fill}
      />
    </svg>
  );
}

Register.defaultProps = {
  width: "16",
  height: "16",
  fill: "white",
};
