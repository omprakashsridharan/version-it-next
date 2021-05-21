import {AppProps} from "next/app";
import {ChakraProvider} from "@chakra-ui/react"
import {Provider} from "next-auth/client";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider session={pageProps.session}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    )
}
