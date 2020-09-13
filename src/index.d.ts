/// <reference types="react" />
import "./style.css";
/* Preset themes. Can be passed into MenuBar as objects, or can be selected by key with a string. */
export declare const themes: {
    default: {
        colors: {
            primary: string;
            secondary: string;
            terciary: string;
            text: string;
            disabledText: string;
        };
        size: string;
    };
    lively: {
        colors: {
            primary: string;
            secondary: string;
            terciary: string;
            text: string;
            disabledText: string;
        };
        size: string;
    };
    muted: {
        colors: {
            primary: string;
            secondary: string;
            terciary: string;
            text: string;
            disabledText: string;
        };
        size: string;
    };
    monoDark: {
        colors: {
            primary: string;
            secondary: string;
            terciary: string;
            text: string;
            disabledText: string;
        };
        size: string;
    };
    monoLight: {
        colors: {
            primary: string;
            secondary: string;
            terciary: string;
            text: string;
            disabledText: string;
        };
        size: string;
    };
};
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
export declare function MenuBar({ theme, style, disabled, children }: {
    theme?: {
        colors: {
            primary: string;
            secondary: string;
            terciary: string;
            text: string;
            disabledText: string;
        };
        size: string;
    };
    style?: {};
    disabled?: boolean;
    children: any;
}): JSX.Element;
/**
 * Base component for a dropdown menu. Placed inside a MenuBar component alongside other Menus. Contains either MenuItems or MenuBranches.
 *
 * Accepts:
 * @param label - string or React component. The name of the menu as it appears in the MenuBar. (e.g. "File", "Edit", "Help")
 * @param style - optional object - injects custom styles into the menu component.
 * @param hoverStyle - optional object - injects custom styles into the menu component to be used when the cursor is hovering over the menu label.
 * @param activeStyle - optional object - injects custom styles into the menu component to be used when the menu is open.
 */
export declare function Menu({ label, style, hoverStyle, activeStyle, children }: {
    label: any;
    style?: {};
    hoverStyle?: {};
    activeStyle?: {};
    children: any;
}): JSX.Element;
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
export declare function MenuItem({ label, rightLabel, onClick, disabled, style, hoverStyle, disabledStyle, children, }: {
    label: any;
    rightLabel: any;
    onClick: Function;
    disabled?: boolean;
    style?: {};
    hoverStyle?: {};
    disabledStyle?: {};
    children: any;
}): JSX.Element;
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
export declare function MenuBranch({ label, rightIcon, style, activeStyle, hoverStyle, children }: {
    label: any;
    rightIcon?: any;
    style?: {};
    activeStyle?: {};
    hoverStyle?: {};
    children: any;
}): JSX.Element;
