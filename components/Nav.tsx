import {Avatar, Flex, Text} from "@chakra-ui/react";
import {useSession} from "next-auth/client";

const Nav = () => {
    const [session] = useSession()
    return (
        <Flex p={"2"} justifyContent={"space-between"} background={"blue.100"}>
            <Text
                bgGradient="linear(to-l, #33aa88,#3a8afe)"
                bgClip="text"
                fontSize="4xl"
                fontWeight="extrabold"
            >
                Version IT
            </Text>
            <Avatar name={session?.user?.name || "user"} src={session?.user?.image || ""} />
        </Flex>
    )
}

export default Nav;
