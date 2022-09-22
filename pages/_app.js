import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/plus-jakarta-sans";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
