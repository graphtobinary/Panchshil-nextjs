import { ArrowLeftIconProps } from "@/interfaces";
import { FC } from "react";

const DoubleQuotesIcon: FC<ArrowLeftIconProps> = ({
  fill = "#9E8C70",
  width = 28,
  height = 18,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      className="bi bi-arrow-left"
      viewBox="0 0 32 32"
    >
      <g>
        <g id="right_x5F_quote">
          <g>
            <path
              fill={fill}
              d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z"
            />
            <path
              fill={fill}
              d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default DoubleQuotesIcon;
