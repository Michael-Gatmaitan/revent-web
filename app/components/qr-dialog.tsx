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
import { selectWholeData } from "@/lib/features/orderSlice";
import { useAppSelector } from "@/lib/hook";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

const QrDialog = () => {
  const wholeData = useAppSelector(selectWholeData);

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
          <QRCodeSVG
            value={JSON.stringify(wholeData)}
            width={250}
            height={250}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrDialog;
