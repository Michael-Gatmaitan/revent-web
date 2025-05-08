"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React from "react";

const ToggleMode = () => {
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    console.log("Theme: ", theme);
  }, [theme]);

  return (
    <Switch
      id="switch-mode"
      // checked={theme !== undefined}
      defaultChecked={theme === "dark"}
      onCheckedChange={(val) => {
        setTheme(val ? "dark" : "light");
      }}
    />
  );
};

export default ToggleMode;
