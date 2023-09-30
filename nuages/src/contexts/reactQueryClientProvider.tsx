import { createContext } from "react";
import {
    QueryClient,
    QueryClientProvider
} from 'react-query';



export interface ReactQueryClientProviderInterface {



}



export const ReactQueryClientContext = createContext<ReactQueryClientProviderInterface | null>(null);


export const ReactQueryClientProvider = ({ children }: any) => {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}



