import React, { useState, useEffect, useContext, useCallback } from "react";
import "./style.css";

const MenuSettings = React.createContext();

const initMenuState = {
  menuIsActive: false,
  menuIsDisabled: false,
  activeMenu: null,
  activeMenuBranch: null,
  colors: {
    primary: "#303030",
    secondary: "#444444",
    terciary: "#555555",
  },
  size: "medium",
};

const parseSize = (newSize) => {
  const sizes = ["small", "medium", "large"];

  if (newSize.toLowerCase() in sizes) {
    return newSize.toLowerCase();
  } else {
    return "medium";
  }
};

const parseInit = (init) => {
  if (init && "size" in init) {
    init.size = parseSize(init.size);
  }
  return init;
};

function MenuSettingsProvider({ overrideInit, children }) {
  const [state, setState] = useState({
    ...initMenuState,
    ...parseInit(overrideInit),
  });

  const actions = {
    setMenuIsActive: (bool) =>
      setState((prevState) => ({
        ...prevState,
        menuIsActive: bool,
      })),
    setMenuIsDisabled: (bool) =>
      setState((prevState) => ({
        ...prevState,
        menuIsDisabled: bool,
      })),
    setActiveMenu: (menuId) =>
      setState((prevState) => ({
        ...prevState,
        activeMenu: menuId,
      })),
    setActiveMenuBranch: (branchId) =>
      setState((prevState) => ({
        ...prevState,
        activeMenuBranch: branchId,
      })),
    setColors: (newColors) =>
      setState((prevState) => ({
        ...prevState,
        colors: {
          ...prevState.colors,
          ...newColors,
        },
      })),
    setSize: (newSize) =>
      setState((prevState) => ({
        ...prevState,
        size: parseSize(newSize),
      })),
    resetMenu: () =>
      setState({
        ...initMenuState,
        ...parseInit(overrideInit),
      })
  };

  return (
    <MenuSettings.Provider value={{ ...state, ...actions }}>
      <MenuGroup>{children}</MenuGroup>
    </MenuSettings.Provider>
  );
}

export function MenuBar({ colors: initColors, children, disabled=false}) {
  return (
    <MenuSettingsProvider overrideInit={initColors}>
      <MenuGroup disabled={disabled}>{children}</MenuGroup>
    </MenuSettingsProvider>
  );
}

function MenuGroup({ children, disabled }) {
  const { menuIsActive, setMenuIsActive, setMenuIsDisabled, colors, size } = useContext(
    MenuSettings
  );

  const handleClickOutside = useCallback(() => {
    if (menuIsActive) {
      setMenuIsActive(false);
    }
  }, [menuIsActive, setMenuIsActive]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setMenuIsDisabled(disabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  function handleClickInside(e) {
    e.stopPropagation();
    setMenuIsActive(!menuIsActive);
  }

  return (
    <div className={`menu-group ${size}`}  style={{background: colors.primary}} onClick={handleClickInside}>
      {children}
    </div>
  );
}

export function Menu({ id, label, children }) {
  const { menuIsActive, activeMenu, setActiveMenu, colors, size } = useContext(
    MenuSettings
  );
  const isActiveMenu = activeMenu === id;

  function handleMouseOver() {
    setActiveMenu(id);
  }

  return (
    <div className="menu" style={{background: menuIsActive && isActiveMenu ? colors.secondary : colors.primary}}>
      <div
        className={`menu-label ${size}`}
        style={{background: colors.secondary}}
        onMouseOver={handleMouseOver}
      >
        <p>{label}</p>
      </div>
      {menuIsActive && isActiveMenu && (
        <div className={`menu-panel ${size}`} style={{background: colors.secondary}}>
          {children}
        </div>
      )}
    </div>
  );
}

export function MenuBranch({ id, label, children }) {
  const { colors, size, activeMenuBranch, setActiveMenuBranch } = useContext(MenuSettings);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  let delay;

  useEffect(() => {
    if (isOpen && activeMenuBranch !== id) {
      setIsOpen(false);
    }
  }, [id, isOpen, activeMenuBranch])

  function handleMouseEnter() {
    delay = setTimeout(() => {
      setIsOpen(true);
      setActiveMenuBranch(id);
    }, 500);
  }

  function handleMouseLeave() {
    clearTimeout(delay);
  }

  function handleClick(e) {
    clearTimeout(delay);
    setIsOpen(true);
    setActiveMenuBranch(id);
    e.stopPropagation();
  }

  function handleMouseEnterChildren() {
    setIsActive(true);
  }

  function handleMouseLeaveChildren() {
    setIsActive(false);
  }

  return (
    <div
      className="menu-branch"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`menu-item ${size}`}
        style={{background: isActive ? colors.terciary : "none"}}
      >
        <p className={`menu-item-section ${size}`}>{label}</p>
        <p className={`menu-item-section ${size}`}>{">"}</p>
      </div>
      {isOpen && (
        <div
          className={`menu-branch-panel ${size}`}
          onMouseEnter={handleMouseEnterChildren}
          onMouseLeave={handleMouseLeaveChildren}
          style={{background: colors.secondary}}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function MenuItem({
  onClick = null,
  disabled = false,
  label,
  hotkey,
  children,
}) {
  const { menuIsDisabled, colors, size, resetMenu } = useContext(MenuSettings);

  const clickHandler = (e) => {
    if (disabled || menuIsDisabled) {
      return e.stopPropagation();
    }
    resetMenu();
    return onClick(e);
  };

  return (
    <div
      className={`menu-item ${size}`}
      style={{background: disabled || menuIsDisabled ? "none" : colors.terciary}}
      onClick={clickHandler}
    >
      {children ? (
        <p className={`menu-item-section ${size}`}>{children}</p>
      ) : (
        <>
          <p className={`menu-item-section ${size}`}>{label}</p>
          <p className={`menu-item-section ${size}`}>{hotkey}</p>
        </>
      )}
    </div>
  );
}
