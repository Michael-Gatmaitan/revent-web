import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  // TableFooter,
  Table,
} from "@/components/ui/table";

const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <Table>
      <TableCaption>A list of transactions of in and out of items</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell className="text-right">{transaction.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter> */}
      {/*   <TableRow> */}
      {/*     <TableCell colSpan={3}>Total</TableCell> */}
      {/*     <TableCell className="text-right">$2,500.00</TableCell> */}
      {/*   </TableRow> */}
      {/* </TableFooter> */}
    </Table>
  );
};

export default TransactionTable;
