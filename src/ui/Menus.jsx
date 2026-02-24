import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { AiOutlineEllipsis } from "react-icons/ai";
import styled from "styled-components";
import useOutside from "../hooks/useOutside";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenusContext = createContext();

function Menus({ children }) {
  const [openID, setOpenID] = useState("");
  const [position, setPosition] = useState();
  const open = setOpenID;
  const close = () => setOpenID("");

  return (
    <MenusContext.Provider
      value={{ open, close, openID, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ id }) {
  const { openID, open, close, setPosition } = useContext(MenusContext);
  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    console.log(rect);
    openID === "" || openID !== id ? open(id) : close();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  }
  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
      <AiOutlineEllipsis />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { openID, position, close } = useContext(MenusContext);
  const ref = useOutside(close);
  if (openID !== id) return null;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icone, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {" "}
        {icone}
        {children}
      </StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
