import { useEffect, useState } from "react";

export function useBreakpointCols() {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    function updateCols() {
      if (window.innerWidth < 640) setCols(2); // base
      else if (window.innerWidth < 768) setCols(3); // sm
      else if (window.innerWidth < 1024) setCols(3); // md
      else setCols(4); // lg+
    }

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
}
