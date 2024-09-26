import { useCallback, useState } from "react";

export const useSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return { collapsed, toggleSidebar };
};
