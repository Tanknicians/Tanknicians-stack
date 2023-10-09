import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { UserData } from "../redux/slices/users/userManagementSlice";
import { Button, Stack, Typography } from "@mui/material";
import QRCodeCanvas from "qrcode.react";
import { useRef } from "react";

function QRValue(tankId: number) {
  return `Tanknicians Tank ID: ${tankId}`;
}

function QRCodeFile(client: UserData, qrSymbol: number) {
  return `${client.firstName}-${client.lastName}-Tank${qrSymbol}QRCode.png`;
}

function QRCodeTextCanvas(qrCanvas: HTMLCanvasElement, qrSymbol: number) {
  // Create a new canvas for combining QR code and text
  const combinedCanvas = document.createElement("canvas");
  const combinedContext = combinedCanvas.getContext("2d");

  if (qrCanvas && combinedCanvas && combinedContext) {
    const text = `Tank ${qrSymbol}`;
    const fontSize = 16;
    const lineHeight = 20;
    const canvasWidth = qrCanvas.width;
    const canvasHeight = qrCanvas.height + lineHeight;

    combinedCanvas.width = canvasWidth;
    combinedCanvas.height = canvasHeight;

    // Draw QR code
    combinedContext.drawImage(qrCanvas, 0, 0);

    // Draw text background
    combinedContext.fillStyle = "white";
    combinedContext.fillRect(0, qrCanvas.height, canvasWidth, lineHeight);

    // Draw text and offset it vertically
    const offset = 10;
    combinedContext.font = `bold ${fontSize}px sans-serif`;
    combinedContext.fillStyle = "black";
    combinedContext.textAlign = "center";
    combinedContext.fillText(
      text,
      canvasWidth / 2,
      qrCanvas.height + lineHeight - offset,
    );
    return combinedCanvas;
  }
  return null;
}

export default function QRCodeCard({
  client,
  tankId,
  qrSymbol,
}: {
  client: UserData;
  tankId: number;
  qrSymbol: number;
}) {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const qrCanvas = qrCodeRef.current?.children[0] as HTMLCanvasElement;
    const combinedCanvas = QRCodeTextCanvas(qrCanvas, qrSymbol);

    if (combinedCanvas) {
      // Convert canvas to PNG data URL
      const pngUrl = combinedCanvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      // Trigger download
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = QRCodeFile(client, qrSymbol);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      <div ref={qrCodeRef}>
        <QRCodeCanvas
          value={QRValue(tankId)}
          level="H"
          size={125}
          includeMargin={true}
        />
        <Typography textAlign="center" variant="body1" gutterBottom>
          Tank {qrSymbol}
        </Typography>
      </div>
      <Button
        variant="contained"
        onClick={downloadQRCode}
        size="small"
        endIcon={<FileDownloadOutlinedIcon />}
      >
        Download QR Code
      </Button>
    </Stack>
  );
}
