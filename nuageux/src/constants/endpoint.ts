const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS;
// const backendPort = import.meta.env.VITE_BACKEND_PORT;

if (!backendAddress) {
  throw new Error("VITE_BACKEND_ADDRESS is not set");
}

// const backendUrl = backendAddress + ":" + backendPort;

export const administratorEndpoint = backendAddress + "/admin-api";
export const usersEndpoint = backendAddress + "/api";
