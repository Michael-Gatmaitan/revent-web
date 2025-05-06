"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "sonner";
import createApolloClient from "@/lib/apollo-client";
import { CREATE_ITEM, DEDUCT_ITEM } from "@/lib/gql";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IGeneralData {
  productID: number;
  selectedQuantity: number;
  itemName: string;
  itemNumber: string;
  discount: number;
  unitPrice: string;
  stock: number;
  imageURL: string;
  description: string;
}

interface IGeneralWholeData {
  data: IGeneralData[];
  revent: boolean;
  type: "in" | "out" | "";
  customerID: number;
}

export default function ScannerPage() {
  const [pause, setPause] = useState(false);

  // Create functions for IN and OUT
  // This is where we gonna call APIs to handle IN and OUT

  const handleScan = (qrdata: string) => {
    setPause(true);

    try {
      const recievedData = JSON.parse(qrdata);
      console.log("RECIEVED DATA: ", recievedData);

      const { revent, data, type }: IGeneralWholeData = recievedData;

      console.log(revent);

      if (!revent) throw new Error("QR Code not valid");

      const client = createApolloClient();

      if (type === "out") {
        const { customerID } = recievedData;

        // Call api inside loop
        data.forEach(async (item) => {
          const result = await client.mutate({
            mutation: DEDUCT_ITEM,
            variables: {
              productID: item.productID,
              quantity: item.selectedQuantity,
              customerID,
            },
          });

          console.log(result);
        });

        toast("Item successfully deducted and sales created");
      } else if (type === "in") {
        // Call api inside loop

        data.forEach(async (item) => {
          const {
            itemNumber,
            itemName,
            discount,
            stock,
            unitPrice,
            imageURL,
            description,
          } = item;
          const result = await client.mutate({
            mutation: CREATE_ITEM,
            variables: {
              itemNumber: parseInt(itemNumber),
              itemName,
              discount,
              stock,
              unitPrice,
              imageURL,
              description,
            },
          });

          console.log(result);
        });

        toast("Item successfully created");
      }
    } catch (error) {
      console.log(`Error occured: ${error}`);
    } finally {
      console.log("Scan performed");
    }
  };

  return (
    <div className="w-[100%] h-full grid items-center justify-center">
      <div className="grid align-center w-min h-min">
        <div className="grid mb-4">
          <div className="text-xl font-bold">Qr Code Scanner</div>
          <div>Use this scanner for in and out</div>
        </div>
        <div>
          <div className="rounded-md overflow-hidden">
            <Scanner
              formats={[
                "qr_code",
                "micro_qr_code",
                "rm_qr_code",
                "maxi_code",
                "pdf417",
                "aztec",
                "data_matrix",
                "matrix_codes",
                "dx_film_edge",
                "databar",
                "databar_expanded",
                "codabar",
                "code_39",
                "code_93",
                "code_128",
                "ean_8",
                "ean_13",
                "itf",
                "linear_codes",
                "upc_a",
                "upc_e",
              ]}
              onScan={(detectedCodes) => {
                handleScan(detectedCodes[0].rawValue);
              }}
              onError={(error) => {
                console.log(`onError: ${error}'`);
              }}
              styles={{ container: { height: "400px", width: "400px" } }}
              components={{
                // audio: true,
                onOff: true,
                // torch: true,
                zoom: true,
                // finder: true,
                // tracker: getTracker(),
              }}
              allowMultiple={true}
              scanDelay={2000}
              paused={pause}
            />
          </div>
        </div>
      </div>

      {/* <div>Use this to scan QR of In and Out</div> */}
    </div>
  );
}
