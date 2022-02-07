import * as React from "react"

const LocationIcon = (props) => (
  <svg
    width={44}
    height={44}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={22} cy={22} r={22} fill="#5233EA" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.847 15.453a7.35 7.35 0 1 0-10.394 10.394l4.243 4.244c.527.527 1.38.527 1.908 0l4.243-4.244a7.35 7.35 0 0 0 0-10.394Zm-11.314-.92a8.65 8.65 0 0 1 12.234 12.234l-3.503 3.502-.017.017-.724.723a2.649 2.649 0 0 1-3.746.001l-4.244-4.244a8.65 8.65 0 0 1 0-12.232ZM21.65 18.3a2.35 2.35 0 1 0 0 4.7 2.35 2.35 0 0 0 0-4.7ZM18 20.65a3.65 3.65 0 1 1 7.3 0 3.65 3.65 0 0 1-7.3 0Z"
      fill="#fff"
    />
  </svg>
)

export default LocationIcon;