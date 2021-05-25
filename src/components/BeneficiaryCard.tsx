import React from "react";
import { Box, Badge, Image } from "@chakra-ui/react";
import { propertyType } from "../types/propertyType";

export function BeneficiaryCard(props: propertyType) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      style={{ margin: 10, boxShadow: "0px 0.5px 6px #00000020" }}
    >
      <Image src={props.imageUrl} alt={props.imageAlt} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={props.type === "Individual" ? "teal" : "blue"}
          >
            {props.type}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            from {props.start}
          </Box>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.title}
        </Box>
        <Box>
          {props.totalAmount}
          <Box as="span" color="gray.600" fontSize="sm">
            / {props.goal}
          </Box>
        </Box>

        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {props.contributors} contributors
        </Box>
      </Box>
    </Box>
  );
}
