import { RxDashboard } from "react-icons/rx";

import { FaTasks } from "react-icons/fa";
import { MdOutlineLocalPharmacy } from "react-icons/md";

const routes = [
  { path: "/dashboard", name: "Dashboard", icon: RxDashboard },
  {
    path: "/pharmacies",
    name: "Pharmacies List",
    icon: MdOutlineLocalPharmacy,
  },
  { path: "/pending-reviews", name: "Awaiting Reviews", icon: FaTasks },
];

export default routes;
