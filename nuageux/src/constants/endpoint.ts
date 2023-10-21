const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS;
const backendPort = import.meta.env.VITE_BACKEND_PORT;

if (!backendAddress || !backendPort) {
  throw new Error("VITE_BACKEND_ADDRESS or VITE_BACKEND_PORT is not set");
}

const backendUrl = backendAddress + ":" + backendPort;

export const administratorEndpoint = backendUrl + "/admin-api";
export const usersEndpoint = backendUrl + "/api";
