import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import "/styles/globals.css";
import "/styles/carousel.css";
import "@fontsource/plus-jakarta-sans";
import theme from "../theme";
import { Provider } from "react-redux";
import store from "../app/store";
import NextNProgress from "nextjs-progressbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebase";

function MyApp({ Component, pageProps }) {
    const [user, loading, error] = useAuthState(auth);

    if (loading)
        return (
            <ChakraProvider theme={theme}>
                <Center h="100vh">
                    <Spinner />
                </Center>
            </ChakraProvider>
        );

    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <NextNProgress />
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    );
}

export default MyApp;
