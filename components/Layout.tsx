import React, {ReactNode} from 'react'
import Head from 'next/head'
import {Box, Flex} from "@chakra-ui/react";
import Nav from "./Nav";

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({children, title = 'This is the default title'}: Props) => (
    <Box height={"100vh"}>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <Flex height={"100%"} flexDirection={"column"}>
            <Box >
                <Nav />
            </Box>
            <Box flex={"1"}>
                {children}
            </Box>
        </Flex>
    </Box>
)

export default Layout
