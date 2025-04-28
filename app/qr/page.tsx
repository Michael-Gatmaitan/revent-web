"use client";

import { useState } from "react";
import {
  Scanner,
  useDevices,
  outline,
  boundingBox,
  centerText,
} from "@yudiel/react-qr-scanner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

// const styles = {
//   container: {
//     width: 400,
//     margin: "auto",
//   },
//   controls: {
//     marginBottom: 8,
//   },
// };

export default function ScannerPage() {
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [tracker, setTracker] = useState<string | undefined>("centerText");
  const [pause, setPause] = useState(false);

  const devices = useDevices();

  function getTracker() {
    switch (tracker) {
      case "outline":
        return outline;
      case "boundingBox":
        return boundingBox;
      case "centerText":
        return centerText;
      default:
        return undefined;
    }
  }

  // Create functions for IN and OUT

  const handleScan = async (data: string) => {
    setPause(true);
    try {
      console.log(data);
      // Call process
      // if (in or out)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-[100%] h-full grid content-center bg-red-500">
      {/* <div> */}
      {/*   <select onChange={(e) => setDeviceId(e.target.value)}> */}
      {/*     <option value={undefined}>Select a device</option> */}
      {/*     {devices.map((device, index) => ( */}
      {/*       <option key={index} value={device.deviceId}> */}
      {/*         {device.label} */}
      {/*       </option> */}
      {/*     ))} */}
      {/*   </select> */}
      {/*   <select */}
      {/*     style={{ marginLeft: 5 }} */}
      {/*     onChange={(e) => setTracker(e.target.value)} */}
      {/*   > */}
      {/*     <option value="centerText">Center Text</option> */}
      {/*     <option value="outline">Outline</option> */}
      {/*     <option value="boundingBox">Bounding Box</option> */}
      {/*     <option value={undefined}>No Tracker</option> */}
      {/*   </select> */}
      {/* </div> */}

      <Select
        onValueChange={(val) => {
          console.log(val);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a device" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Devices</SelectLabel>
            {devices.map((device, index) => (
              <SelectItem value={device.deviceId} key={index}>
                {device.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        {/* <SelectTrigger> */}
        {/* <SelectValue placeholder="" */}
        {/* </SelectTrigger> */}
        <SelectContent>
          <SelectGroup>
            <SelectItem value="centerText">Center text</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="boundingBox">Bounding Box</SelectItem>
            <SelectItem value="noTracker">No tracker</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

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
        // constraints={{
        //   deviceId: deviceId,
        // }}
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
          finder: true,
          // tracker: getTracker(),
        }}
        allowMultiple={true}
        scanDelay={2000}
        paused={pause}
      />

      <div>Use this to scan QR of In and Out</div>
    </Card>
  );
}
