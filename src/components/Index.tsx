import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import injectedConnector from "../core/connectors/InjectedConnector";
import { Heading, Box, Flex } from "@chakra-ui/react";
import { property } from "../beneficiary/property";
import { BeneficiaryCard } from "./BeneficiaryCard";
import { MyContribution } from "./MyContribution";
import { useCTBToken } from "../core/utils/useContribute";
import BigNumber from "bignumber.js";
import Header from "./Header";

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
      <Header
        account={userAccount}
        tokenBalance={balance}
        connectHandler={connectWallet}
      />
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
          return <BeneficiaryCard beneficiary={beneficiary} />;
        })}
      </Flex>
    </div>
  );
}

export default Index;
