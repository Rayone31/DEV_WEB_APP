let bluetoothDevice;
let characteristic;

const SERVICE_UUID = '12345678-1234-1234-1234-1234567890ab';
const CHARACTERISTIC_UUID = '12345678-1234-1234-1234-1234567890ac';

document.getElementById('connect').addEventListener('click', async () => {
  setStatus('Recherche de l\'appareil...');
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }]
    });
    setStatus('Appareil sélectionné : ' + bluetoothDevice.name);

    const server = await bluetoothDevice.gatt.connect();
    setStatus('Connexion GATT réussie');

    const service = await server.getPrimaryService(SERVICE_UUID);
    setStatus('Service trouvé');

    characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);
    setStatus('Bluetooth connecté à ' + bluetoothDevice.name + ' !');
  } catch (error) {
    setStatus('Erreur de connexion Bluetooth : ' + error);
    console.error(error);
  }
});

function sendDirection(direction) {
  if (!characteristic) {
    setStatus('Pas connecté en Bluetooth');
    return;
  }
  let cmd = '';
  switch (direction) {
    case 'UP': cmd = 'a'; break;
    case 'DOWN': cmd = 'r'; break;
    case 'LEFT': cmd = 'g'; break;
    case 'RIGHT': cmd = 'd'; break;
    case 'STOP': cmd = 's'; break;
    default: cmd = 's';
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(cmd);
  characteristic.writeValue(data)
    .then(() => setStatus('Commande envoyée : ' + cmd))
    .catch(err => {
      setStatus('Erreur d\'envoi : ' + err);
      console.error(err);
    });
}

function setStatus(msg) {
  document.getElementById('status').textContent = msg;
}

window.sendDirection = sendDirection;