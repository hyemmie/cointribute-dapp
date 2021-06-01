import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import injectedConnector from "../core/connectors/InjectedConnector";
import { Heading, Box, Flex, Button, Image, Badge } from "@chakra-ui/react";
import { property } from "../beneficiary/property";
import { BeneficiaryCard } from "./BeneficiaryCard";
import { useCTBToken } from "../core/utils/useContribute";
import BigNumber from "bignumber.js";
import Header from "./Header";
import { useParams } from "react-router-dom";

type ParamTypes = {
  id: string;
};

function ShowBeneficiary() {
  const { account, activate, deactivate } = useWeb3React();
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const CTBToken = useCTBToken();
  const { id } = useParams<ParamTypes>();
  const beneficiary = property[parseInt(id, 10)];

  const connectWallet = () => {
    activate(injectedConnector);
  };

  useEffect(() => {
    connectWallet();
    return () => {
      deactivate();
    };
  }, []);

  useEffect(() => {
    if (account) {
      setUserAccount(account);
    }
  }, [account]);

  useEffect(() => {
    if (account && CTBToken) {
      CTBToken.balanceOf(account).then((res: BigNumber) => {
        const balance = res.toString();
        console.log(balance);
        setBalance(balance);
      });
    }
  }, [account, CTBToken]);

  return (
    <div
      style={{
        width: "100%",
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <Header
        account={userAccount}
        tokenBalance={balance}
        connectHandler={connectWallet}
      />

      <Flex
        style={{
          marginTop: 10,
          paddingTop: 50,
          paddingLeft: 30,
          paddingRight: 30,
          marginBottom: 100,
          justifyContent: "center",
        }}
      >
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          style={{
            width: 500,
            height: 200,
            margin: 10,
            boxShadow: "0px 0.5px 6px #00000020",
          }}
        >
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge
                borderRadius="full"
                px="2"
                colorScheme={
                  beneficiary.type === "Individual" ? "teal" : "blue"
                }
              >
                {beneficiary.type}
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                from {beneficiary.start}
              </Box>
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {beneficiary.title}
            </Box>
            <Box>
              {beneficiary.totalAmount}
              <Box as="span" color="gray.600" fontSize="sm">
                / {beneficiary.goal}
              </Box>
            </Box>

            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {beneficiary.contributors} contributors
            </Box>
          </Box>
          <Flex
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              size="lg"
              onClick={() => {}}
              colorScheme="teal"
              variant="ghost"
              style={{ justifySelf: "center", bottom: 20 }}
            >
              Donate
            </Button>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
export default ShowBeneficiary;
