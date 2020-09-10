import React, { useState, useEffect, useContext, useCallback } from "react";
import "./style.css";

const MenuSettings = React.createContext();

export const themes = {
  default: {
    colors: {
      primary: "#383B53",
      secondary: "#505A68",
      terciary: "#32213A",
      text: "rgba(223, 225, 204, 1)",
      disabledText: "rgba(223, 225, 204, .5)"
    },
    size: "medium"
  },
  lively: {
    colors: {
      primary: "#2B3A67",
      secondary: "#478285",
      terciary: "#CC6D00",
      text: "#FFFFFF",
      disabledText: "#B5D1DD"
    },
    size: "medium"
  },
  muted: {
    colors: {
      primary: "#47372e",
      secondary: "#384754",
      terciary: "#30251e",
      text: "rgba(222, 206, 206, 1)",
      disabledText: "rgba(222, 206, 206, .6)"
    },
    size: "medium"
  },
  monoDark: {
    colors: {
      primary: "#060606",
      secondary: "#222222",
      terciary: "#555555",
      text: "#ffffff",
      disabledText: "rgba(255, 255, 255, .6)"
    },
    size: "medium"
  },
  monoLight: {
    colors: {
      primary: "#ffffff",
      secondary: "#dddddd",
      terciary: "#888888",
      text: "#060606",
      disabledText: "rgba(0, 0, 0, .6)"
    },
    size: "medium"
  }
}

const initMenuState = {
  menuIsActive: false,
  menuIsDisabled: false,
  activeMenu: null,
  activeMenuBranch: null
};

function parseSize(newSize) {
  const sizes = ["small", "medium", "large"];

  if (newSize.toLowerCase() in sizes) {
    return newSize.toLowerCase();
  } else {
    return "medium";
  }
};

function parseTheme(theme) {
  if (typeof theme === "string") {
    theme = themes[theme] || themes.default; 
  } else {
    theme.size = parseSize(theme.size);
    theme.colors = {...themes.default.colors, ...theme.colors};
  }
  return theme;
};

function MenuSettingsProvider({ theme, children }) {
  const [state, setState] = useState({
    ...initMenuState,
    ...parseTheme(theme),
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
      // Clears open menu branch when menu switches
      setState((prevState) => {
        return prevState.activeMenu === menuId ? prevState : {
          ...prevState,
          activeMenu: menuId,
          activeMenuBranch: null
        }
      }),
    setActiveMenuBranch: (branchId) =>
      setState((prevState) => ({
        ...prevState,
        activeMenuBranch: branchId,
      })),
    resetMenu: () =>
      setState({
        ...initMenuState,
        ...parseTheme(theme),
      }),
  };

  return (
    <MenuSettings.Provider value={{ ...state, ...actions }}>
      {children}
    </MenuSettings.Provider>
  );
}

function MenuGroup({ style, children, disabled }) {
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
    <div className={`menu-group ${size}`}  style={{background: colors.primary, color: colors.text, ...style}} onClick={handleClickInside}>
      {children}
    </div>
  );
}

export function MenuBar({ theme=themes.default, style, children, disabled=false}) {
  return (
    <MenuSettingsProvider theme={theme}>
      <MenuGroup style={style} disabled={disabled}>{children}</MenuGroup>
    </MenuSettingsProvider>
  );
}

export function Menu({ id, label, style, hoverStyle, activeStyle, children }) {
  const { menuIsActive, activeMenu, setActiveMenu, colors, size } = useContext(
    MenuSettings
  );
  const [isHovering, setIsHovering] = useState(false);
  const isActiveMenu = activeMenu === id;

  function handleMouseOver() {
    setIsHovering(true);
    setActiveMenu(id);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  const mainStyle = {
    background: colors.primary,
    ...style
  }

  const calcActiveStyle = {
    background: colors.secondary,
    ...activeStyle
  }

  const calcHoverStyle = {
    background: colors.secondary,
    ...hoverStyle
  }

  function getStyle() {
    if (menuIsActive && isActiveMenu) {
      return calcActiveStyle;
    } else if (isHovering) {
      return calcHoverStyle;
    } else {
      return mainStyle;
    }
  }

  return (
    <div className="menu">
      <div
        className={`menu-label ${size}`}
        style={getStyle()}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <p>{label}</p>
      </div>
      {menuIsActive && isActiveMenu && (
        <div className="menu-panel" style={calcActiveStyle}>
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
  rightLabel,
  style,
  hoverStyle,
  disabledStyle,
  children,
}) {
  const { menuIsDisabled, colors, size, resetMenu } = useContext(MenuSettings);

  const [isHovering, setIsHovering] = useState(false);

  function clickHandler(e) {
    if (disabled || menuIsDisabled) {
      return e.stopPropagation();
    }
    resetMenu();
    return onClick(e);
  };

  const calcStyle = style;

  const calcHoverStyle = {
    background: colors.terciary,
    ...hoverStyle
  }

  const calcDisabledStyle = {
    color: colors.disabledText,
    ...disabledStyle
  }

  function getStyle() {
    if (disabled || menuIsDisabled) {
      return calcDisabledStyle;
    } else if (isHovering) {
      return calcHoverStyle;
    } else {
      return calcStyle;
    }
  }

  return (
    <div
      className={`menu-item ${size}`}
      style={getStyle()}
      onClick={clickHandler}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children ? (
        <p className={`menu-item-section ${size}`}>{children}</p>
      ) : (
        <>
          <p className={`menu-item-section ${size}`}>{label}</p>
          <p className={`menu-item-section ${size}`}>{rightLabel}</p>
        </>
      )}
    </div>
  );
}

export function MenuBranch({ id, label, style, activeStyle, hoverStyle, rightIcon, children }) {
  const { colors, size, activeMenuBranch, setActiveMenuBranch } = useContext(MenuSettings);
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isOpen = activeMenuBranch === id;
  let delay;

  function handleMouseEnter() {
    setIsHovering(true);
    delay = setTimeout(() => {
      setActiveMenuBranch(id);
    }, 500);
  }

  function handleMouseLeave() {
    setIsHovering(false);
    clearTimeout(delay);
  }

  function handleClick(e) {
    clearTimeout(delay);
    setActiveMenuBranch(id);
    e.stopPropagation();
  }

  function handleMouseEnterChildren() {
    setIsActive(true);
  }

  function handleMouseLeaveChildren() {
    setIsActive(false);
  }

  const calcStyle = style;

  const calcActiveStyle = {
    background: colors.terciary,
    ...activeStyle
  }

  const calcHoverStyle = {
    background: colors.terciary,
    ...hoverStyle
  }

  function getStyle() {
    if (isActive) {
      return calcActiveStyle;
    } else if (isHovering) {
      return calcHoverStyle;
    } else {
      return calcStyle
    }
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
        style={getStyle()}
      >
        <p className={`menu-item-section ${size}`}>{label}</p>
        <p className={`menu-item-section ${size}`}>{rightIcon || ">"}</p>
      </div>
      {isOpen && (
        <div
          className="menu-branch-panel"
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
