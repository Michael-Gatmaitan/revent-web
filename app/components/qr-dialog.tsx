"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

const QrDialog = ({ data }) => {
  console.log("Data from QRCode generator: ", data);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View qrcode</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate QR Code</DialogTitle>
          <DialogDescription>
            Go to <Link href="/qr">/qr</Link> to scan qrcodes
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center">
          <QRCodeSVG value={JSON.stringify(data)} width={250} height={250} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrDialog;
