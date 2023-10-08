import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { UserData } from '../redux/slices/users/userManagementSlice';
import { Button, Stack, Typography } from '@mui/material';
import QRCodeCanvas from 'qrcode.react';
import { useRef } from 'react';

function QRValue(tankId: number) {
  return `Tanknicians Tank ID: ${tankId}`;
}

function QRCodeFile(client: UserData, qrSymbol: number) {
  return `${client.firstName}-${client.lastName}-Tank${qrSymbol}QRCode.png`;
}

export default function QRCodeCard({
  client,
  tankId,
  qrSymbol
}: {
  client: UserData;
  tankId: number;
  qrSymbol: number;
}) {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = qrCodeRef.current?.children[0] as HTMLCanvasElement;
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
      <div ref={qrCodeRef}>
        <QRCodeCanvas
          value={QRValue(tankId)}
          level='H'
          size={125}
          includeMargin={true}
        />
      </div>
      <Typography variant='body1' gutterBottom>
        Tank {qrSymbol}
      </Typography>
      <Button
        variant='contained'
        onClick={downloadQRCode}
        size='small'
        endIcon={<FileDownloadOutlinedIcon />}
      >
        Download QR Code
      </Button>
    </Stack>
  );
}
