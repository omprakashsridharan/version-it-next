import Layout from '../components/Layout'
import {signIn, signOut, useSession} from "next-auth/client"
import {Button, Center, Flex, Text} from "@chakra-ui/react";

const IndexPage = () => {
    const [session] = useSession()
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            {
                session ? (
                    <Center height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                bgGradient="linear(to-l, #7928CA,#FF0080)"
                                bgClip="text"
                                fontSize="6xl"
                                fontWeight="extrabold"
                            >Hello {session.user?.name}</Text>
                            <Button onClick={() => signOut()}>Sign out</Button>
                        </Flex>
                    </Center>
                    )
                    :
                    <Button onClick={() => signIn("github")}>Sign In</Button>
            }
        </Layout>
    )
}

export default IndexPage
