import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import injectedConnector from "../core/connectors/InjectedConnector";
import {
  Button,
  Heading,
  Spacer,
  Box,
  Text,
  Badge,
  Flex,
  Image,
  Link,
} from "@chakra-ui/react";
import Logo from "../images/cointribute-logo.png";
import { property } from "../beneficiary/property";
import { BeneficiaryCard } from "./BeneficiaryCard";
import { MyContribution } from "./MyContribution";
import { useCTBToken } from "../core/utils/useContribute";
import BigNumber from "bignumber.js";

function Index() {
  const { account, activate, deactivate } = useWeb3React();
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const CTBToken = useCTBToken();

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
      <header
        style={{
          width: "100%",
          height: 80,
          top: 0,
          boxShadow: "0px 1px 6px #00000029",
          paddingLeft: 40,
          paddingRight: 40,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <Flex justify="space-between" align="center">
          <Link href="localhost:3000/main">
            <Image
              src={Logo}
              alt={"Contribute"}
              style={{
                width: 250,
                height: "auto",
              }}
            />
          </Link>
          <Spacer />
          {userAccount ? (
            <>
              <Box ml="3">
                <Text fontWeight="bold">CTB Balance</Text>
                <Text fontSize="sm">
                  {balance ? `${balance} ` : "Checking"}
                  CTB
                </Text>
              </Box>
              <Box ml="3">
                <Text fontWeight="bold">
                  User Address
                  <Badge ml="1" colorScheme="teal">
                    Connected
                  </Badge>
                </Text>
                {userAccount && (
                  <Text fontSize="sm">
                    {`${userAccount.substring(0, 6)}...${userAccount.substring(
                      userAccount.length - 4
                    )}`}
                  </Text>
                )}
              </Box>
            </>
          ) : (
            <Button onClick={connectWallet} colorScheme="teal" variant="ghost">
              Connect Wallet
            </Button>
          )}
        </Flex>
      </header>
      {userAccount && (
        <Box
          maxW="70%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          style={{
            marginLeft: "15%",
            marginTop: 50,
            boxShadow: "0px 0.5px 6px #00000029",
          }}
        >
          <MyContribution />
        </Box>
      )}
      <Heading
        size="mb"
        style={{
          marginLeft: 40,
          marginTop: 20,
          display: "inline-flex",
        }}
      >
        Beneficiary List
      </Heading>
      <Flex
        style={{
          marginTop: 10,
          paddingLeft: 30,
          paddingRight: 30,
          marginBottom: 100,
        }}
      >
        {property?.map((beneficiary, _index) => {
          return BeneficiaryCard(beneficiary);
        })}
      </Flex>
    </div>
  );
}

export default Index;
