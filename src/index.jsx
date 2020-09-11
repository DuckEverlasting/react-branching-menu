import React, { useState, useEffect, useContext, useCallback } from "react";
import "./style.css";

const MenuSettings = React.createContext();

/**
 * Preset themes. Can be passed into MenuBar as objects, or can be selected by key with a string.
 */
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
  activeMenuBranch: null,
  nextId: 0
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
    getNextId: () => {
      const id = state.nextId;
      setState((prevState) => ({
        ...prevState,
        nextId: prevState.nextId + 1
      }));
      return id;
    },
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

function MenuGroup({ style = {}, disabled = false, children }) {
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

/**
 * Base component for horizontal menu bar. Creates both the bar component and a context for the rest of the components.
 * All menus must be placed inside this component for the package to work.
 * 
 * Accepts:
 * @param disabled - boolean. When true, all items in the menu group will be disabled.
 * @param theme - optional string | object - either a string or an object with the following format:
 * {
 *  colors?:
*   {
*     primary: string,
*     secondary: string,
*     terciary: string,
*     text: string,
*     disabledText: string
*   },
 *  size?: "small" | "medium" | "large"
 * }
 * @param style - optional object - injects custom styles into the menu bar component. (Just the bar component specifically.)
 */
export function MenuBar({ theme=themes.default, style={}, disabled=false, children}) {
  return (
    <MenuSettingsProvider theme={theme}>
      <MenuGroup style={style} disabled={disabled}>{children}</MenuGroup>
    </MenuSettingsProvider>
  );
}

/**
 * Base component for a dropdown menu. Placed inside a MenuBar component alongside other Menus. Contains either MenuItems or MenuBranches.
 * 
 * Accepts:
 * @param label - string or React component. The name of the menu as it appears in the MenuBar. (e.g. "File", "Edit", "Help")
 * @param style - optional object - injects custom styles into the menu component.
 * @param hoverStyle - optional object - injects custom styles into the menu component to be used when the cursor is hovering over the menu label.
 * @param activeStyle - optional object - injects custom styles into the menu component to be used when the menu is open.
 */
export function Menu({ label, style = {}, hoverStyle = {}, activeStyle = {}, children }) {
  const { menuIsActive, activeMenu, setActiveMenu, getNextId, colors, size } = useContext(
    MenuSettings
  );
  const [id,] = useState(getNextId()); 
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


/**
 * Component that represents a selectable item on a menu. Placed inside a Menu component or a MenuBranch component.
 * Can be wrapped around a child component that will be used in place of a lebel.
 * 
 * Accepts:
 * @param label - string - Left-justified text inside the MenuItem.
 * @param rightLabel - string - Right-justified text inside the MenuItem. Often used for additional information or hotkeys.
 * @param onClick - callback function - Fires when the MenuItem is clicked (and is not disabled).
 * @param disabled - boolean - Disables the MenuItem.
 * @param style - optional object - injects custom styles into the component.
 * @param hoverStyle - optional object - injects custom styles into the component to be used when the cursor is hovering over the item.
 * @param disabledStyle - optional object - injects custom styles into the component to be used when the component is disabled.
 */
export function MenuItem({
  label,
  rightLabel,
  onClick = () => {},
  disabled = false,
  style = {},
  hoverStyle = {},
  disabledStyle = {},
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


/**
 * Component that creates a menu within a menu. Placed inside a Menu component, opens up a new menu directly to its right consisting of
 * its children (MenuItems or other MenuBranches). Hovering or clicking on the MenuBranch will cause it to open.
 * Only one MenuBranch may be open at a time.
 * 
 * Accepts:
 * @param label - string - Left-justified text inside the MenuBranch.
 * @param rightIcon - string or React component - Replaces the default ">" on the right side of the component.
 * @param style - optional object - injects custom styles into the component.
 * @param hoverStyle - optional object - injects custom styles into the component to be used when the cursor is hovering over the item.
 * @param activeStyle - optional object - injects custom styles into the component to be used when the component is open.
 */
export function MenuBranch({ label, rightIcon = null, style = {}, activeStyle = {}, hoverStyle = {}, children }) {
  const { colors, size, activeMenuBranch, setActiveMenuBranch } = useContext(MenuSettings);
  const [id,] = useState(getNextId());
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
