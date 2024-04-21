import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 256,
  height: 256,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="256"
        height="256"
        viewBox="0 0 67.7 67.7"
      >
        <path fill="#facc15" d="M8.5 8.5h50.8v50.8H8.5z" />
      </svg>
    ),
    {
      ...size,
    },
  );
}
