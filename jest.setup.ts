import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement("img", {
      ...props,
      src: typeof props.src === "string" ? props.src : props.src?.src || "",
    }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) =>
    React.createElement("a", { href: typeof href === "string" ? href : "#", ...props }, children),
}));
