import { RxDashboard } from "react-icons/rx";

import { GiChoice } from "react-icons/gi";
import { RiFileList3Fill } from "react-icons/ri";

const routes = [
  { path: "/dashboard", name: "Dashboard", icon: RxDashboard },
  {
    path: "/pharmacies",
    name: "Pharmacies List",
    icon: RiFileList3Fill,
  },
  { path: "/pending-reviews", name: "Awaiting Reviews", icon: GiChoice },
];

export default routes;
