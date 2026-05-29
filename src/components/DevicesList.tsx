import type { Device } from "../schemas";

type Props = {
    devices: Device[]
}
const DevicesList = ({ devices }: Props) => {


//v pripade ze by bolo viacero zaznamom s rovnakym uuid bez pouzitia index ako key
const uuidCounts: Record<string, number> = {};
const uniqueDevices = devices.map((d) => {
    const count = uuidCounts[d.uuid] || 0;
    uuidCounts[d.uuid] = count + 1;    
    return {...d,id: count === 0 ? d.uuid : `${d.uuid}_${count}`};
});

    return (
        <div
            id="devices_table"
            role="region"
            aria-labelledby="devices_caption"
            tabIndex={0}
        >
            <table>
                <caption id="devices_caption">
                    Device Battery Status
                </caption>
                <thead>
                    <tr>
                        <th scope="col">UUID</th>
                        <th scope="col">Battery (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueDevices.map((device) => (
                        <tr key={device.id}>
                            <th scope="row">{device.uuid}</th>
                            <td>{device.battery_percent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default DevicesList;