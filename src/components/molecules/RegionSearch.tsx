import { Regions } from "@/@types/Region"
import { Flex, Text, Box, Divider, HStack, Tag, Button, TagLabel } from "@chakra-ui/react"
import { ReactNode, useState } from "react"

const RegionSearchTitle = (region: string | undefined) => {


}

export const RegionSearch = (): React.JSX.Element => {
    const [region, setRegion] = useState<string | undefined>(undefined)
    //TODO: Finish design of round button and colors of tags
    const regionTitle = () => {
        if (region) {
            return (<Flex alignItems={"center"}>
                <Button borderRadius={"50%"} backgroundColor={"transparent"} onClick={() => setRegion(undefined)}>&lt;</Button>
                <Text fontWeight={"bold"}>{region}</Text>
            </Flex>)
        } else {
            return <Box><Text fontWeight={"bold"}>Region</Text></Box>
        }
    }
    return (
        <Flex height={"40px"} alignItems={"center"}>
            {regionTitle()}
            <Divider marginX={6} height={"70%"} orientation="vertical" />
            <HStack spacing={4}>
                {Regions.map((regionName) => (regionName !== region &&
                    <Button variant={"unstyled"} onClick={() => setRegion(regionName)}>

                        <Tag
                            size={"md"}
                            key={regionName}
                            borderRadius='full'
                            variant='solid'
                            colorScheme='gray'
                        >
                            <TagLabel>{regionName}</TagLabel>
                        </Tag>
                    </Button>

                ))}
            </HStack>
        </Flex>
    )
}