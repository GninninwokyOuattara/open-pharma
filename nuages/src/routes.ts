import { AiOutlineUnorderedList } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";

import { FaTasks } from "react-icons/fa";

const routes = [
  { path: "/", name: "home", icon: RxDashboard },
  { path: "/pharmacies", name: "about", icon: AiOutlineUnorderedList },
  { path: "/pending-reviews", name: "contact", icon: FaTasks },
];

export default routes;
