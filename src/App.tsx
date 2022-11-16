import { useCallback, useState } from "react";
import { generate as shortid } from "shortid";
import { Input, Button, Container, Row, Spacer } from "@nextui-org/react";

import { getQRCode } from "./util";

export const App = () => {
  const [value, setValue] = useState<string>("");
  const [qr, setQr] = useState<string>("");

  const generateQRCode = useCallback(() => {
    const qrValue = getQRCode(value);
    if (!qrValue) return;
    setQr(qrValue);
  }, [value, setQr]);

  const downloadFile = useCallback(() => {
    const elm = document.createElement("a");
    elm.href = qr;
    elm.download = shortid();
    elm.click();
  }, [qr]);

  return (
    <Container
      display="flex"
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Spacer y={6} />
      <Input
        clearable
        rounded
        placeholder="e.g https://dev.to"
        color="primary"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="lg"
      />
      <Spacer x={1} />
      <Button onClick={generateQRCode} shadow size="lg">
        Generate
      </Button>

      {qr && (
        <Row justify="center" align="center">
          <Spacer y={4} />
          <img src={qr} />
          <Button onClick={downloadFile} color="success" shadow size="lg">
            Download
          </Button>
        </Row>
      )}
    </Container>
  );
};
