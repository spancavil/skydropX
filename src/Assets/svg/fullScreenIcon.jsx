import * as React from "react"

const FullscreenIcon = (props) => (
  <svg
    width={154}
    height={155}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#a)">
      <circle cx={77} cy={70} r={35} fill="#0B005A" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.188 60c0-.449.363-.813.812-.813h5a.813.813 0 0 1 0 1.626h-3.038l4.862 4.862a.812.812 0 1 1-1.148 1.15l-4.864-4.864V65a.813.813 0 0 1-1.624 0v-5ZM82 59.187h5c.449 0 .813.364.813.813v5a.813.813 0 0 1-1.626 0v-3.038l-4.862 4.862a.812.812 0 1 1-1.15-1.148l4.864-4.864H82a.813.813 0 0 1 0-1.624Zm-8.175 13.989a.812.812 0 0 1 0 1.148l-4.864 4.864H72a.813.813 0 0 1 0 1.624h-5a.813.813 0 0 1-.813-.812v-5a.813.813 0 0 1 1.626 0v3.038l4.862-4.862a.812.812 0 0 1 1.15 0Zm6.35 0a.812.812 0 0 1 1.15 0l4.862 4.862V75a.813.813 0 0 1 1.626 0v5a.813.813 0 0 1-.813.813h-5a.813.813 0 0 1 0-1.626h3.038l-4.862-4.862a.812.812 0 0 1 0-1.15Z"
        fill="#fff"
      />
    </g>
    <defs>
      <filter
        id="a"
        x={0}
        y={0}
        width={154}
        height={155}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius={6}
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow_751_21782"
        />
        <feOffset dy={7} />
        <feGaussianBlur stdDeviation={18} />
        <feColorMatrix values="0 0 0 0 0.054902 0 0 0 0 0.121569 0 0 0 0 0.207843 0 0 0 0.12 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_751_21782"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius={2}
          operator="dilate"
          in="SourceAlpha"
          result="effect2_dropShadow_751_21782"
        />
        <feOffset dy={19} />
        <feGaussianBlur stdDeviation={14.5} />
        <feColorMatrix values="0 0 0 0 0.054902 0 0 0 0 0.121569 0 0 0 0 0.207843 0 0 0 0.14 0" />
        <feBlend
          in2="effect1_dropShadow_751_21782"
          result="effect2_dropShadow_751_21782"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius={6}
          in="SourceAlpha"
          result="effect3_dropShadow_751_21782"
        />
        <feOffset dy={9} />
        <feGaussianBlur stdDeviation={6} />
        <feColorMatrix values="0 0 0 0 0.054902 0 0 0 0 0.121569 0 0 0 0 0.207843 0 0 0 0.2 0" />
        <feBlend
          in2="effect2_dropShadow_751_21782"
          result="effect3_dropShadow_751_21782"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect3_dropShadow_751_21782"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default FullscreenIcon;
