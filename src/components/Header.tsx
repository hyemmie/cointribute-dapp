import React, { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import {
  Button,
  Spacer,
  Box,
  Text,
  Badge,
  Flex,
  Image,
  Link,
} from "@chakra-ui/react";
import Logo from "../images/cointribute-logo.png";

function Header(props: {
  account: string | undefined;
  tokenBalance: string | undefined;
  connectHandler: () => void;
}) {
  return (
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
        <Link as={ReachLink} to={`/main`}>
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
        {props.account ? (
          <>
            <Box ml="3">
              <Text fontWeight="bold">CTB Balance</Text>
              <Text fontSize="sm">
                {props.tokenBalance ? `${props.tokenBalance} ` : "Checking"}
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
              {props.account && (
                <Text fontSize="sm">
                  {`${props.account.substring(
                    0,
                    6
                  )}...${props.account.substring(props.account.length - 4)}`}
                </Text>
              )}
            </Box>
          </>
        ) : (
          <Button
            onClick={props.connectHandler}
            colorScheme="teal"
            variant="ghost"
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
    </header>
  );
}

export default Header;
