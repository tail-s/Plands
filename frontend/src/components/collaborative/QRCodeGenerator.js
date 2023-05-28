import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator(props) {
  return <QRCode value={props.initialUrl} />;
}

export default QRCodeGenerator;