import { VotingContractContext } from "@/providers/VotingContractProvider";
import TableProposals from "@/components/TableProposals";
import TableVoters from "@/components/TableVoters";

import {
    Flex,
    Heading,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import WorkflowStatusInfo from "@/components/WorkflowStatusInfo";
import MainLayout from "@/layouts/MainLayout";

const Index = () => {
    const themeColor = useColorModeValue("blue.700", "orange.300");
    const { isVoter, isOwner, owner } = useContext(VotingContractContext);

    return (
        <MainLayout>
            <Flex
                ml={{ base: "1vh", lg: "5vh", xl: "10vh", "2xl": "15vh" }}
                mr={{ base: "1vh", lg: "5vh", xl: "10vh", "2xl": "15vh" }}
                gap={10}
                flexDirection={{ base: "column", md: "row" }}
                align={"stretch"}
                justify={"space-evenly"}
            >
                {isVoter || isOwner ? (
                    <>
                        <WorkflowStatusInfo />
                        <Tabs w={{base: "100%", lg:"95%"}}>
                            <TabList>
                                <Tab>Proposals</Tab>
                                <Tab>Voters</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <TableProposals />
                                </TabPanel>
                                <TabPanel>
                                    <TableVoters />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </>
                ) : (
                    <Stack>
                        <Heading color={themeColor}>
                            You are not a member of the organisation.
                        </Heading>
                        <Text>
                            Consequently you can not access to the private;
                            information
                        </Text>
                        <Text>
                            (owner : {owner})
                        </Text>
                    </Stack>
                )}
            </Flex>
        </MainLayout>
    );
};

export default Index;
