import { React } from 'react'
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import useFirebaseAuth from '../feature/hook/useFirebaseAuth';
import theme from "../theme";

export function withPublic(Component) {
    return function WithPublic(props) {
        useFirebaseAuth();
        const authUser = useSelector((state) => state.authUser);
        const router = useRouter();

        if (authUser.uid) {
            router.replace('/')
            return <ChakraProvider theme={theme}>
                <Center h="100vh">
                    <Spinner />
                </Center>
            </ChakraProvider>
        }

        return <Component authUser={authUser} {...props} />
    }
}

export function withProtected(Component) {
    return function WithProtected(props) {
        useFirebaseAuth();
        const authUser = useSelector((state) => state.authUser);
        const router = useRouter();

        if (!authUser.uid) {
            if (!authUser?.isComplete) { router.push("/register/lengkapi-data") } else { router.replace('/login') }

            return <ChakraProvider theme={theme}>
                <Center h="100vh">
                    <Spinner />
                </Center>
            </ChakraProvider>
        }

        return <Component authUser={authUser} {...props} />
    }
}