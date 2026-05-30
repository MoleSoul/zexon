import type { Device } from "../schemas";

type Props = {
    devices: Device[]
}
const DevicesList = ({ devices }: Props) => {

    const getBatteryStatusColor = (device: Device) => {
        if (device.battery_percent > 50) return '#32be40';
        if (device.battery_percent < 10) return '#b81a1a';
        return '#d0bf26';
    }

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
                    {devices.map((device) => (
                        <tr key={device.uuid}>
                            <th scope="row">{device.uuid}</th>
                            <td style={{ color: getBatteryStatusColor(device) }}>{device.battery_percent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default DevicesList;