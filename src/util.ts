import { toDataURL } from "qrcode";
import type { QRCodeToDataURLOptions } from "qrcode";

const options: QRCodeToDataURLOptions = {
  width: 400,
  margin: 2,
};

export const getQRCode = (value: string) => {
  let qrValue: string | undefined = undefined;

  toDataURL(value, options, (err, url) => {
    if (err) {
      console.error(err);
      return;
    }
    qrValue = url;
  });

  return qrValue;
};
