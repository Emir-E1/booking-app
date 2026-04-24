import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import { FiLogOut } from "react-icons/fi";

//CUSTOM HOOK THAT WHEN CLICKED
//LOGOUT
//REMOVE THE QUERIES OF THE DATA
//AUTO NAVIGATE INTO LOGIN

function Logout() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon
      disabled={isLoggingOut}
      onClick={() => logout()}
      aria-label="Logout"
      title="Logout"
    >
      <FiLogOut />
    </ButtonIcon>
  );
}

export default Logout;
