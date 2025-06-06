let bluetoothDevice;
let characteristic;

const SERVICE_UUID = '12345678-1234-1234-1234-1234567890ab'; // Remplace avec le UUID du service BLE
const CHARACTERISTIC_UUID = '12345678-1234-1234-1234-1234567890ac'; // Et ici le UUID de la caractéristique

document.getElementById('connect').addEventListener('click', async () => {
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }]
    });

    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    alert('Bluetooth connecté !');
  } catch (error) {
    console.error('Erreur de connexion Bluetooth :', error);
  }
});

function sendDirection(direction) {
  console.log('Direction envoyée :', direction);

  if (characteristic) {
    const encoder = new TextEncoder();
    const data = encoder.encode(direction);
    characteristic.writeValue(data).catch(err => {
      console.error('Erreur d\'envoi :', err);
    });
  } else {
    console.warn('Pas connecté en Bluetooth');
  }
}

document.getElementById('haut').onclick = () => sendDirection('UP');
document.getElementById('bas').onclick = () => sendDirection('DOWN');
document.getElementById('gauche').onclick = () => sendDirection('LEFT');
document.getElementById('droite').onclick = () => sendDirection('RIGHT');
