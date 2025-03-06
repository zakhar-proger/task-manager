"use client";

import { useState } from "react";

export default function Checkbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="w-6 h-6 flex items-center justify-center border-2 border-[--foreground] text-[--foreground] cursor-pointer transition-colors"
      onClick={() => setChecked(!checked)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
        className={`transition-opacity duration-200 ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      >
        <path
          d="M1.04184 5.0418L2.22035 3.86329L6.34514 7.98808L5.16663 9.16659L1.04184 5.0418Z"
          fill="currentColor"
        />
        <path
          d="M10.47 1.50634L11.6485 2.68485L5.16668 9.16666L3.98817 7.98815L10.47 1.50634Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
