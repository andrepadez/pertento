import React from 'react';

export default function MoveIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_418_31878)">
        <rect x="1" y="1" width="40" height="40" rx="6" fill="white" />
        <path
          d="M21 14.83L24.17 18L25.58 16.59L21 12L16.41 16.59L17.83 18L21 14.83ZM21 27.17L17.83 24L16.42 25.41L21 30L25.59 25.41L24.17 24L21 27.17Z"
          fill="#12B76A"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_418_31878"
          x="0"
          y="0"
          width="42"
          height="42"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_418_31878"
          />
          <feOffset />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.917647 0 0 0 0 0.92549 0 0 0 0 0.941176 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_418_31878" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_418_31878"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
