import { IconType } from "react-icons";
import { CgMenuLeftAlt, CgAbstract } from "react-icons/cg";

export type TSubMenu = {
  menuItem: string;
  href: string;
};

export type TMenu = {
  menuItem: string;
  href: string;
  subMenu: TSubMenu[];
  icon: IconType;
};

export type TMenuGroup = {
  title: string;
  menu: TMenu[];
  showGroupTitle: boolean;
};

export class Menu {
  static sideMenu: TMenuGroup[] = [
    {
      title: "Dashboard",
      showGroupTitle: false,
      menu: [
        {
          menuItem: "Home",
          href: "/employe/dashboard",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        // {
        //   menuItem: "Employee",
        //   href: "/",
        //   subMenu: [],
        //   icon: CgAbstract,
        // },
        // {
        //   menuItem: "Employer",
        //   href: "/",
        //   subMenu: [],
        //   icon: CgAbstract,
        // },
        // {
        //   menuItem: "Interviews",
        //   href: "/",
        //   subMenu: [],
        //   icon: CgMenuLeftAlt,
        // },
        {
          menuItem: "All Courses",
          href: "/employe/courses",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
      ],
    },
    // {
    //   title: "Page",
    //   showGroupTitle: true,
    //   menu: [
    //     {
    //       menuItem: "About",
    //       href: "/dashboard",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Profile",
    //       href: "/employer/profile/form",
    //       subMenu: [],
    //       icon: CgAbstract,
    //     },
    //     {
    //       menuItem: "Requirements",
    //       href: "/employer/Requirements",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Notifications",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Others",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Contact",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //   ],
    // },
    // {
    //   title: "Analytics",
    //   showGroupTitle: true,
    //   menu: [
    //     {
    //       menuItem: "Employee",
    //       href: "/dashboard",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Charts",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgAbstract,
    //     },
    //     {
    //       menuItem: "Cards",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Interviews",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Courses",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //   ],
    // },
  ];
}
