let bluetoothDevice = null;
let characteristic = null;

const SERVICE_UUID = '12345678-1234-1234-1234-1234567890ab';
const CHARACTERISTIC_UUID = '12345678-1234-1234-1234-1234567890ac';

async function connect() {
  try {
    if (!bluetoothDevice) {
      bluetoothDevice = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }]
      });
      bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
    }

    if (!bluetoothDevice.gatt.connected) {
      await bluetoothDevice.gatt.connect();
    }

    const server = bluetoothDevice.gatt;
    setStatus('Connexion GATT réussie');

    await new Promise(resolve => setTimeout(resolve, 200));

    const service = await server.getPrimaryService(SERVICE_UUID);
    characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    setStatus('✅ Connecté à ' + bluetoothDevice.name);
  } catch (error) {
    setStatus('❌ Erreur : ' + error.message);
  }
}

function onDisconnected(event) {
  setStatus('⚠️ Déconnecté, tentative de reconnexion...');
  reconnect();
}

async function reconnect() {
  if (!bluetoothDevice) return;
  try {
    await bluetoothDevice.gatt.connect();
    setStatus('✅ Reconnecté à ' + bluetoothDevice.name);
    const service = await bluetoothDevice.gatt.getPrimaryService(SERVICE_UUID);
    characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);
  } catch (error) {
    setStatus('❌ Reconnexion échouée : ' + error.message);
    setTimeout(reconnect, 5000);
  }
}

document.getElementById('connect').addEventListener('click', () => {
  connect();
});

window.sendDirection = async (direction) => {
  if (!characteristic) {
    setStatus('⚠️ Pas connecté');
    return;
  }

  const map = {
    UP:    { cmd: 'a', label: 'Avancer' },
    DOWN:  { cmd: 'r', label: 'Reculer' },
    LEFT:  { cmd: 'g', label: 'Gauche' },
    RIGHT: { cmd: 'd', label: 'Droite' },
    STOP:  { cmd: 's', label: 'Stop' }
  };

  const entry = map[direction] || map['STOP'];

  try {
    const data = new TextEncoder().encode(entry.cmd);
    await characteristic.writeValue(data);
    setStatus('📤 Commande envoyée : ' + entry.cmd);
    showCommand(entry.label);
  } catch (error) {
    setStatus('❌ Envoi échoué : ' + error.message);
  }
};

function setStatus(message) {
  document.getElementById('status').textContent = message;
}

function showCommand(label) {
  const el = document.getElementById('command');
  if (el) el.textContent = 'Commande : ' + label;
}
