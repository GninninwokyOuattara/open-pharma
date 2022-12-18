import { AiOutlineUnorderedList } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";

import { FaTasks } from "react-icons/fa";

const routes = [
  { path: "/dashboard", name: "Dashboard", icon: RxDashboard },
  {
    path: "/pharmacies",
    name: "Pharmacies List",
    icon: AiOutlineUnorderedList,
  },
  { path: "/pending-reviews", name: "Awaiting Reviews", icon: FaTasks },
];

export default routes;
