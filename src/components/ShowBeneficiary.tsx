import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import injectedConnector from "../core/connectors/InjectedConnector";
import {
  Box,
  Flex,
  Button,
  Badge,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { property } from "../beneficiary/property";
import { useCTBToken } from "../core/utils/useContribute";
import BigNumber from "bignumber.js";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { DonationType } from "../types/DonationType";
import Swal from "sweetalert2";

type ParamTypes = {
  id: string;
};

function ShowBeneficiary() {
  const { account, activate, deactivate } = useWeb3React();
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [donationAddress, setDonationAddress] =
    useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<number>(15);
  const CTBToken = useCTBToken();
  const { id } = useParams<ParamTypes>();
  const beneficiary = property[parseInt(id, 10)];

  const connectWallet = () => {
    activate(injectedConnector);
  };

  const donate = () => {
    if (account && CTBToken && donationAddress) {
      CTBToken.Donation(donationAddress, amount).then(
        (res: { hash: string }) => {
          console.log(res);
          Swal.fire({
            title: "<strong>Transaction Confirmed</strong>",
            icon: "info",
            html:
              "<p>Your donation transaction hash is,</p>" +
              `<p><u><a href="//ropsten.etherscan.io/tx/${
                res.hash
              }">${res.hash.substring(0, 10)}...${res.hash.substring(
                res.hash.length - 6
              )}</a></u></p> ` +
              "<p>check out with etherscan link!</p>",
            showCancelButton: true,
            focusConfirm: false,
          });
        }
      );
    }
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
        setBalance(balance);
      });
    }
  }, [account, CTBToken]);

  useEffect(() => {
    if (account && CTBToken) {
      CTBToken.getDonationList().then((res: DonationType[]) => {
        setDonationAddress(res[parseInt(id)][7].toString());
      });
    }
  });

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
            height: 350,
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
            {donationAddress && (
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {`${donationAddress
                  .toString()
                  .substring(0, 15)}...${donationAddress.substring(
                  donationAddress.length - 10
                )}`}
              </Box>
            )}
          </Box>
          <NumberInput
            defaultValue={15}
            max={1000}
            marginLeft={18}
            size="lg"
            width={340}
            onChange={(valueString) => {
              if (valueString.length === 0) {
                setAmount(0);
              } else {
                setAmount(parseFloat(valueString));
              }
            }}
            value={amount}
            precision={2}
            step={0.1}
            clampValueOnBlur={false}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper
                bg="green.200"
                _active={{ bg: "green.300" }}
                children="+"
              />
              <NumberDecrementStepper
                bg="pink.200"
                _active={{ bg: "pink.300" }}
                children="-"
              />
            </NumberInputStepper>
          </NumberInput>
          <Flex
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              size="lg"
              onClick={donate}
              colorScheme="teal"
              variant="ghost"
              style={{ justifySelf: "center", top: 40, bottom: 0 }}
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
