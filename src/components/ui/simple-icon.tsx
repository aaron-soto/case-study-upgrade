import * as Icons from "simple-icons/icons";

import React from "react";

type IconType = {
  path: string;
};

const SimpleIcon = ({
  name,
  size = 24,
  color = "black",
}: {
  name: string;
  size?: number;
  color?: string;
}) => {
  const iconKey = `si${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  const icon = (Icons as Record<string, IconType>)[iconKey];

  if (!icon) {
    console.error(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className="z-0"
    >
      <title>{name}</title>
      <path d={icon.path} />
    </svg>
  );
};

export default SimpleIcon;
