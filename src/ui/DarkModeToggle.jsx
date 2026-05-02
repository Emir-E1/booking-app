import { useDarkMode } from "../Context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { FiMoon, FiSun } from "react-icons/fi";
function DarkModeToggle() {
  const { isDark, toggleDark } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDark}>
      {isDark ? <FiSun /> : <FiMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
