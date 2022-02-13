import * as React from "react"

const TruckIcon = (props) => (
  <svg
    width={45}
    height={44}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx={22.595} cy={22} rx={22.187} ry={22} fill="#5233EA" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.863 16c0-.911.745-1.65 1.664-1.65h8.068c.92 0 1.664.739 1.664 1.65v.387c.114-.024.232-.037.353-.037h2.608c.441 0 .864.174 1.176.483l-.463.46.463-.46 3.444 3.415c.312.309.487.729.487 1.166V26c0 .911-.745 1.65-1.664 1.65h-.434a2.67 2.67 0 0 1-2.591 2c-1.25 0-2.3-.85-2.592-2h-.434c-.38 0-.729-.126-1.008-.337-.28.211-.63.337-1.009.337h-2.45a2.67 2.67 0 0 1-2.592 2c-1.25 0-2.3-.85-2.592-2h-.434A1.657 1.657 0 0 1 12.863 26V16Zm2.098 10.35a2.67 2.67 0 0 1 2.592-2c1.25 0 2.299.85 2.591 2h2.451a.351.351 0 0 0 .353-.35v-8.002V18m0-.002V16a.351.351 0 0 0-.353-.35h-8.068a.351.351 0 0 0-.353.35v10c0 .193.158.35.353.35h.434M24.26 26c0 .193.158.35.353.35h.434a2.67 2.67 0 0 1 2.591-2c1.25 0 2.3.85 2.592 2h.434a.351.351 0 0 0 .353-.35v-4.586a.349.349 0 0 0-.103-.247l-3.444-3.414a.355.355 0 0 0-.25-.103h-2.607a.352.352 0 0 0-.353.349V26Zm-6.706-.35c-.752 0-1.362.605-1.362 1.35 0 .746.61 1.35 1.362 1.35.752 0 1.361-.604 1.361-1.35 0-.745-.61-1.35-1.361-1.35Zm10.084 0c-.751 0-1.36.605-1.36 1.35 0 .746.609 1.35 1.36 1.35.752 0 1.362-.604 1.362-1.35 0-.745-.61-1.35-1.361-1.35Z"
      fill="#fff"
    />
  </svg>
)

export default TruckIcon