import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PaymentTabTableData = () => {
  return (
    <div className="md:col-span-3 w-full shadow shadow-black/30 border border-black/10 rounded p-3 flex flex-col gap-5">
      <h1 className="text-sm">Payment History</h1>
      <Table>
        <TableCaption>School payment history tracker</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Invoice Id</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>50,000</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">1/20/2026</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTabTableData;
