import React from "react";
import { Box, Badge, Image, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

import { propertyType } from "../types/propertyType";

type Props = {
  beneficiary: propertyType;
};

export const BeneficiaryCard: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <Link as={ReachLink} to={`/beneficiary/${props.beneficiary.id}`}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        style={{ margin: 10, boxShadow: "0px 0.5px 6px #00000020" }}
      >
        <Image
          src={props.beneficiary.imageUrl}
          alt={props.beneficiary.imageAlt}
        />
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={
                props.beneficiary.type === "Individual" ? "teal" : "blue"
              }
            >
              {props.beneficiary.type}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              from {props.beneficiary.start}
            </Box>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {props.beneficiary.title}
          </Box>
          <Box>
            {props.beneficiary.totalAmount}
            <Box as="span" color="gray.600" fontSize="sm">
              / {props.beneficiary.goal}
            </Box>
          </Box>

          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {props.beneficiary.contributors} contributors
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
