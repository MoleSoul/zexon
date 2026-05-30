import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));

app.use(express.json());

const devices = [];

app.get('/api/devices', (req, res) => {
    res.status(200).json(devices);
});

app.post('/api/ping', (req, res) => {
    const { uuid, battery_percent } = req.body;

    if (!uuid || battery_percent === undefined) {
        return res.status(400).send();
    }

    //kedze neukladame timestamp kvoli historii mozme rovno aktualizovat
    const existingDevice = devices.find(device => device.uuid === uuid);

    if (existingDevice) {
        existingDevice.battery_percent = battery_percent;
        console.log("Device updated:", existingDevice);
        return res.status(204).send();
    }

    const newDevice = {
        uuid: uuid,
        battery_percent: battery_percent,
    };

    devices.push(newDevice);
    console.log("New device added:", newDevice);

    res.status(201).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});