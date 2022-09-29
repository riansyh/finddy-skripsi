import { ChakraProvider } from "@chakra-ui/react";
import "/styles/globals.css";
import "/styles/carousel.css";
import "@fontsource/plus-jakarta-sans";
import theme from "../theme";
import { Provider } from "react-redux";
import store from "../app/store";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    );
}

export default MyApp;
