"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import createApolloClient from "@/lib/apollo-client";
import { GET_CUSTOMERS } from "@/lib/gql";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  resetData,
  selectItemData,
  selectSelectedCustomerID,
  selectWholeData,
  setCustomerID,
} from "@/lib/features/orderSlice";
import QrDialog from "./qr-dialog";

const OutDialog = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const itemData = useAppSelector(selectItemData);
  const selectedCustomerID = useAppSelector(selectSelectedCustomerID);
  const dispatch = useAppDispatch();
  const wholeData = useAppSelector(selectWholeData);

  useEffect(() => {
    const client = createApolloClient();

    const getCustomers = async () => {
      const { data, loading, error } = await client.query({
        query: GET_CUSTOMERS,
      });

      console.log(loading);

      if (error) {
        console.error("Something went wrong: ", error.message);
        return;
      }

      if (data.customers) {
        setCustomers(data.customers);
        console.log(data.customers);
      }
    };

    getCustomers();
  }, []);

  const handleSubmitOut = () => {
    dispatch(resetData());
    console.log("Item OUT submitted and has been reset");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-2 right-2 flex gap-2">
          Check out <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Proceed Item-OUT</DialogTitle>
          <DialogDescription>
            After choosing a customer, the qr code will automatically generate
            affter proceeding to the next step
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Customer
            </Label>
            <Select
              disabled={!itemData.length}
              value={selectedCustomerID ? selectedCustomerID.toString() : ""}
              onValueChange={(val) => {
                dispatch(setCustomerID(parseInt(val)));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => {
                  return (
                    <SelectItem
                      value={`${customer.customerID}`}
                      key={customer.customerID}
                    >
                      {customer.fullName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {itemData.length ? (
            <div className="grid grid-cols-4 items-center gap-4">
              {itemData.map((item) => (
                <div key={item.productID}>{item.itemName}</div>
              ))}
            </div>
          ) : (
            <div className="text-center text-destructive">
              Please select items first.
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild disabled={selectedCustomerID === null}>
            <Button
              type="submit"
              onClick={handleSubmitOut}
              disabled={!itemData.length}
            >
              Generate QR Code
            </Button>
          </DialogClose>
          <QrDialog data={wholeData} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OutDialog;
