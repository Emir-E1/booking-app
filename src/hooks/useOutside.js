import { useEffect, useRef } from "react";

function useOutside(handler, cptEvent = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("click outside");
        handler();
      }
    }
    document.addEventListener("click", handleClick, cptEvent);
    return () => document.removeEventListener("click", handleClick, cptEvent);
  }, [handler]);
  return ref;
}

export default useOutside;
