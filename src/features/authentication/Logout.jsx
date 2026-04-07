import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";

//CUSTOM HOOK THAT WHEN CLICKED
//LOGOUT
//REMOVE THE QUERIES OF THE DATA
//AUTO NAVIGATE INTO LOGIN

function Logout() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={() => logout()}>
      Logout
    </ButtonIcon>
  );
}

export default Logout;
