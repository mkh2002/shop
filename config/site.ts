import { PiBaby, PiCowboyHatLight, PiDress, PiHouse } from "react-icons/pi";
import {
  LuBox,
  LuCalendar,
  LuClipboardList,
  LuHome,
  LuPercent,
  LuTag,
  LuUsers,
} from "react-icons/lu";

type AdminSite = Array<{
  name: string;
  items: Array<{
    name: string;
    href: string;
    sign?: string;
    icon: any;
  }>;
}>;

export const adminSite: AdminSite = [
  {
    name: "general",
    items: [
      {
        name: "dashboard",
        href: "/admin/dashboard",
        icon: LuHome,
        sign: "This is the dashboard",
      },
      {
        name: "accounts",
        href: "/admin/accounts",
        icon: LuUsers,
        sign: "Management all account on this page",
      },
      {
        name: "product",
        href: "/admin/products",
        icon: LuBox,
        sign: "Management all product on this page",
      },
      {
        name: "categories",
        href: "/admin/categories",
        icon: LuTag,
        sign: "Management all categories on this page",
      },
      {
        name: "orders",
        href: "/admin/orders",
        icon: LuClipboardList,
        sign: "Check all orders on this page",
      },
    ],
  },
  {
    name: "other",
    items: [
      {
        name: "sales",
        href: "/admin/sales",
        icon: LuPercent,
      },
      {
        name: "events",
        href: "/admin/events",
        icon: LuCalendar,
      },
    ],
  },
];

export const site = [
  {
    label: "Home",
    href: "/",
    icon: PiHouse,
  },
  {
    label: "Collection",
    href: "/collection",
    icon: PiCowboyHatLight,
  },
  {
    label: "Product",
    href: "/product",
    icon: PiDress,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: PiBaby,
  },
];
