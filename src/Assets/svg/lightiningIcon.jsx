import * as React from "react"

const LightningIcon = (props) => (
  <svg
    width={44}
    height={45}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={22} cy={22.5} r={22} fill="#5233EA" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.869 12.538a.65.65 0 0 1 .431.612v6.35h6.35a.65.65 0 0 1 .503 1.062l-9 11A.65.65 0 0 1 20 31.15V24.8h-6.35a.65.65 0 0 1-.503-1.062l9-11a.65.65 0 0 1 .722-.2ZM15.021 23.5h5.628a.65.65 0 0 1 .65.65v5.18l6.978-8.53H22.65a.65.65 0 0 1-.65-.65v-5.18l-6.978 8.53Z"
      fill="#fff"
    />
  </svg>
)

export default LightningIcon
