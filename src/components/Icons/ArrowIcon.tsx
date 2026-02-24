import { SVGProps } from "react";

export default function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16455 9.99484H15.8252"
        stroke="currentColor"
        strokeWidth="1.6658"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99487 4.16452L15.8252 9.99483L9.99487 15.8251"
        stroke="currentColor"
        strokeWidth="1.6658"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
