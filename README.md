# react-branching-menu
This package allows for customizable branching menus through the use of four React components:

### **MenuBar**
Base component for horizontal menu bar. Creates both the bar component and a context for the rest of the components. All menus must be placed inside this component for the package to work.

### **Menu**
Base component for a dropdown menu. Placed inside a MenuBar component alongside other Menus. Contains either MenuItems or MenuBranches.

### **MenuItem**
Component that represents a selectable item on a menu. Placed inside a Menu component or a MenuBranch component. Can be wrapped around a child component that will be used in place of a lebel.

### **MenuBranch**
Component that creates a menu within a menu. Placed inside a Menu component,opens up a new menu directly to its right consisting of its children(MenuItems or other MenuBranches). Hovering or clicking on the MenuBranchwill cause it to open.

An example of a menu bar that uses all four components:

    import { MenuBar, Menu, MenuItem, MenuBranch, themes } from "react-branching-menu";
    import { setOverlay, importFile, exportAs } from "./fileActions";
    import { runUndo, runRedo, runCopy, runPaste, getClipboard } from "./editActions";
    import history from "./history";

    <MenuBar theme={themes.muted}>
      <Menu label="File">
        <MenuItem onClick={() => setOverlay("newDocument")}>New</MenuItem>
        <MenuItem disabled>Save</MenuItem>
        <MenuItem onClick={importFile}>Import</MenuItem>
        <MenuBranch label="Export As">
          <MenuItem disabled>PDF</MenuItem>
          <MenuItem onClick={() => exportAs("image/jpeg")}>JPG</MenuItem>
          <MenuItem onClick={() => exportAs("image/png")}>PNG</MenuItem>
        </MenuBranch>
      </Menu>
      <Menu label="Edit">
        <MenuItem
          label="Undo"
          rightLabel={`Ctrl+Z`}
          onClick={runUndo}
          disabled={!history.pastLength}
        />
        <MenuItem
          label="Redo"
          rightLabel={`Ctrl+Shift+Z`}
          onClick={runRedo}
          disabled={!history.futureLength}
        />
        <MenuItem
          label="Copy"
          rightLabel={`Ctrl+C`}
          onClick={runCopy}
        />
        <MenuItem
          label="Paste"
          rightLabel={`Ctrl+V`}
          onClick={runPaste}
          disabled={!getClipboard()}
        />
      </Menu>
    </MenuBar>;

More documentation to come later (as well as more features). Stay tuned!
