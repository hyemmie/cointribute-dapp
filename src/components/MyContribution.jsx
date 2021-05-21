import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableCaption,
} from "@chakra-ui/react";

export function MyContribution() {
  return (
    <Table variant="simple">
      <TableCaption>My contribution list</TableCaption>
      <Thead>
        <Tr>
          <Th>Beneficiary</Th>
          <Th>Last Contribute</Th>
          <Th isNumeric>Contribute Amount (CTB)</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Beneficiary 1 (0xaaaa...aaaa)</Td>
          <Td> 2021.05.21 </Td>
          <Td isNumeric>25.4</Td>
        </Tr>
        <Tr>
          <Td>Beneficiary 2 (0xbbbb...bbbb)</Td>
          <Td>2021.05.20</Td>
          <Td isNumeric>30.48</Td>
        </Tr>
        <Tr>
          <Td>Beneficiary 3 (0xcccc...cccc)</Td>
          <Td>2021.05.20</Td>
          <Td isNumeric>0.91444</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
