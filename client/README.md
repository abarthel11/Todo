# Todo App Client

## Running on Other Devices

To test the app from other devices on your network (phones, tablets, other computers):

### 1. Start the Server
```bash
cd ../server
npm start
```

### 2. Configure the Client
Edit `config/api.ts` and set:
- `USE_NETWORK: true`
- Update `NETWORK_URL` with your machine's IP address (currently 10.0.0.203)

### 3. Start the Client
```bash
npm start
```

### 4. Connect from Other Devices
- Scan the QR code shown in the terminal with Expo Go app
- Or manually enter the URL shown in the terminal

### Finding Your IP Address
- macOS: Run `ifconfig | grep "inet " | grep -v 127.0.0.1`
- Windows: Run `ipconfig` and look for IPv4 Address
- Linux: Run `ip addr show` or `hostname -I`

### Troubleshooting
- Make sure both devices are on the same network
- Check firewall settings - port 3000 needs to be accessible
- If using macOS, you may need to allow incoming connections when prompted