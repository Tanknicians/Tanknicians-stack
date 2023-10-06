import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { UserData } from '../redux/slices/users/userManagementSlice';
import { Button, Stack, Typography } from '@mui/material';
import QRCodeCanvas from 'qrcode.react';

function QRValue(tankId: number) {
  return `Tanknicians Tank ID: ${tankId}`;
}

function IDValue(tankId: number, qrSymbol: number) {
  return `${tankId}${qrSymbol}`;
}

function QRCodeFile(client: UserData, qrSymbol: number) {
  return `${client.firstName}-${client.lastName}-Tank${qrSymbol}QRCode.png`;
}

export default function QRCodeCard({
  client,
  tankId,
  qrSymbol
}: { client: UserData; tankId: number; qrSymbol: number }) {
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById(
      IDValue(tankId, qrSymbol)
    ) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = QRCodeFile(client, qrSymbol);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Stack justifyContent='center' alignItems='center'>
      <QRCodeCanvas
        id={IDValue(tankId, qrSymbol)}
        value={QRValue(tankId)}
        level='H'
        size={125}
        includeMargin={true}
      />
      <Typography variant='body1' gutterBottom>
        Tank {qrSymbol}
      </Typography>
      <Button
        variant='contained'
        onClick={downloadQRCode}
        endIcon={<FileDownloadOutlinedIcon />}
      >
        Download QR Code
      </Button>
    </Stack>
  );
}
