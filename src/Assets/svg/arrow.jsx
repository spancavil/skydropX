import * as React from "react"

const Arrow = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m12 .667-1.997 1.997 7.905 7.92H.667v2.832h17.24l-7.904 7.92L12 23.333 23.333 12 12 .667Z"
      fill="#000C2E"
    />
  </svg>
)

export default Arrow;