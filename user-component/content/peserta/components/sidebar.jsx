import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = () => {
  return (
    <>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>PLATFORM</MenuItem>
          <SubMenu title="Digital Talent Schoolarship">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
          <SubMenu title="SIMONAS">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
          <SubMenu title="Beasiswa">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
      ;
    </>
  );
};
export default Sidebar;
