import { useState } from 'react'
import './App.css'
import type { Device } from './schemas';
import DevicesList from './components/DevicesList';
import DeviceAddForm from './components/DeviceAddForm';
import { getDevices } from './functions/api';

function App() {
  const [devices, setDevices] = useState<Device[]>([]);

  const handleDone = () => {
    getDevices().then((res) => {
      if (!res.success) {
        console.error('Faild to fetch Devices');
        return;
      }
      setDevices(res.data);
    })
  }

  return (
    <main id="main" aria-labelledby="main_heading">
      <h1 id="main_heading">Device Battery Check</h1>
      <DeviceAddForm onSuccess={handleDone} />
      <DevicesList devices={devices} />
    </main>
  )
}

export default App
