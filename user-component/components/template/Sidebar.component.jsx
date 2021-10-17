import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Logo from "../../../../public/assets/logo/mainlogo.png";
import Simonas from "../../../../public/assets/logo/image 10.png";
import Beasiswa from "../../../../public/assets/logo/Logo besiswa fix  3.png";
import Image from "next/dist/client/image";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <>
      <ProSidebar width="100%" className={styles.proSidebar}>
        <Menu iconShape="round">
          <MenuItem className={styles.titlePlatform}> PLATFORM</MenuItem>
          <SubMenu
            title="Digital Talent Schoolarship"
            icon={<Image src={Logo} alt="" className={styles.img} />}
            className={styles.subMenuTitle}
          >
            <MenuItem
              icon={<i className="ri-pie-chart-line"></i>}
              className={styles.menuItem}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<i className="ri-history-line"></i>}
              className={styles.menuItem}
            >
              Riwayat Pelatihan
            </MenuItem>
            <MenuItem
              icon={<i className="ri-heart-3-line"></i>}
              className={styles.menuItem}
            >
              Bookmark
            </MenuItem>
            <MenuItem
              icon={<i className="ri-article-line"></i>}
              className={styles.menuItem}
            >
              Test Substansi
            </MenuItem>
            <MenuItem
              icon={<i className="ri-chat-smile-line"></i>}
              className={styles.menuItem}
            >
              Survey
            </MenuItem>
            <MenuItem
              icon={<i className="ri-lightbulb-line"></i>}
              className={styles.menuItem}
            >
              TRIVIA
            </MenuItem>
            <MenuItem
              icon={<i className="ri-menu-2-fill"></i>}
              className={styles.menuItem}
            >
              Artikel
            </MenuItem>
            <MenuItem
              icon={<i className="ri-survey-line"></i>}
              className={styles.menuItem}
            >
              Administrasi
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="SIMONAS"
            icon={<Image src={Simonas} alt="" />}
            className={styles.subMenuTitle}
          >
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
          <SubMenu
            title="Beasiswa"
            icon={<Image src={Beasiswa} alt="" />}
            className={styles.subMenuTitle}
          >
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
          <MenuItem className={styles.titleAkun}>AKUN</MenuItem>

          <MenuItem
            className={styles.akunMenu}
            icon={<i className="ri-user-line"></i>}
          >
            Profile
          </MenuItem>
          <MenuItem
            className={styles.akunMenu}
            icon={<i className="ri-settings-4-line"></i>}
          >
            Pengaturan
          </MenuItem>
          <MenuItem
            className={styles.akunMenu}
            icon={<i className="ri-logout-circle-line"></i>}
          >
            Logout
          </MenuItem>
        </Menu>
      </ProSidebar>
    </>
  );
};
export default Sidebar;
