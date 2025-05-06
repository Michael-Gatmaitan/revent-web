"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const ToggleMode = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Switch
      id="switch-mode"
      // checked={theme !== undefined}
      defaultChecked={theme !== undefined}
      onCheckedChange={(val) => {
        setTheme(val ? "light" : "dark");
      }}
    />
  );
};

export default ToggleMode;
