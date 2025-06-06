const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const bluetoothController = require('./bluetooth/controller');

// Chargement des variables d'environnement
dotenv.config();

// Configuration de l'application Express
const app = express();
app.use(cors());
app.use(express.json());

// Création du serveur HTTP
const server = http.createServer(app);

// Configuration de Socket.io pour la communication en temps réel
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Route API basique pour tester
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', bluetoothConnected: bluetoothController.isConnected() });
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Nouvelle connexion client:', socket.id);
  
  // Informer le client de l'état actuel de la connexion Bluetooth
  socket.emit('bluetooth_status', { connected: bluetoothController.isConnected() });

  // Événement pour scanner les appareils Bluetooth
  socket.on('scan_devices', async () => {
    console.log('Scanning for Bluetooth devices...');
    try {
      const devices = await bluetoothController.scanDevices();
      socket.emit('device_list', devices);
    } catch (error) {
      socket.emit('bluetooth_error', { message: error.message });
    }
  });

  // Événement pour se connecter à un appareil Bluetooth
  socket.on('connect_device', async (deviceId) => {
    console.log(`Connecting to device: ${deviceId}`);
    try {
      await bluetoothController.connectDevice(deviceId);
      socket.emit('bluetooth_status', { connected: true, deviceId });
      io.emit('bluetooth_status', { connected: true, deviceId });
    } catch (error) {
      socket.emit('bluetooth_error', { message: error.message });
    }
  });

  // Événement pour déconnecter l'appareil Bluetooth
  socket.on('disconnect_device', async () => {
    console.log('Disconnecting from device');
    try {
      await bluetoothController.disconnectDevice();
      socket.emit('bluetooth_status', { connected: false });
      io.emit('bluetooth_status', { connected: false });
    } catch (error) {
      socket.emit('bluetooth_error', { message: error.message });
    }
  });

  // Événement pour envoyer des commandes à la voiture
  socket.on('car_command', async (data) => {
    console.log('Received car command:', data);
    try {
      await bluetoothController.sendCommand(data);
    } catch (error) {
      socket.emit('bluetooth_error', { message: error.message });
    }
  });

  // Déconnexion du client
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  bluetoothController.initialize();
});

// Gestion de l'arrêt propre du serveur
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  bluetoothController.cleanup();
  process.exit(0);
});