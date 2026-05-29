import { useEffect, useState, type SubmitEventHandler } from "react";
import { validateDevice, type Device } from "../schemas";
import { addDevice } from "../functions/api";

type Props = {
    onSuccess: () => void
}

const DeviceAddForm = ({ onSuccess }: Props) => {
    const [newDevice, setNewDevice] = useState<Device>({ uuid: '', battery_percent: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ path: string, message: string }[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (!isSuccess) return;
        const t = setTimeout(() => {
            setIsSuccess(false);
        }, 3000)

        return () => {
            clearTimeout(t);
        }
    }, [isSuccess])

    const handleChangeUuid = (uuid: string) => {
        setNewDevice(prev => ({ ...prev, uuid: uuid }));
    }

    const handleChangeBattery = (percentage: number) => {
        setNewDevice(prev => ({ ...prev, battery_percent: percentage }));
    }

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();
        handleSave();
    }

    //v pripade React < 19 by som pouzil aj useCallback
    const handleSave = () => {
        setErrors([]);
        const validation = validateDevice(newDevice);

        if (!validation.success) {
            setErrors(validation.error.issues.map((issue) => ({ path: issue.path[0] as string, message: issue.message })));
            return;
        }

        setLoading(true);
        addDevice(newDevice).then((res) => {
            if (!res.success) {
                if (res.error) {
                    setErrors([{ path: 'API Error: ', message: res.error }]);
                    return;
                }
            }
            setNewDevice({ battery_percent: 0, uuid: '' });
            setIsSuccess(true);
            onSuccess();
        }).catch(() => {
            setErrors([{ path: 'API', message: 'Unhandled API Error' }])
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div id="add_device" aria-labelledby="add_device_title">
            <h2 id="add_device_title">Add a New Device</h2>

            <form id="add_device_form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="device_uuid">Device UUID</label>
                    <input
                        type="text"
                        value={newDevice.uuid}
                        id="device_uuid"
                        placeholder="uuid"
                        onChange={(e) => handleChangeUuid(e.target.value)}
                        aria-required="true"
                    />
                </div>

                <div className="field">
                    <label htmlFor="device_battery">Battery Percentage 0-100</label>
                    <input
                        type="number"
                        id="device_battery"
                        value={newDevice.battery_percent}
                        placeholder="percentage"
                        min={0}
                        max={100}
                        onChange={(e) => handleChangeBattery(parseInt(e.target.value))}
                        aria-required="true"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </button>

                {errors.length > 0 && (
                    <div role="alert" aria-live="assertive">
                        {errors.map((err, index) => (
                            <p className="error" key={`error${index}`}>
                                {err.message}
                            </p>
                        ))}
                    </div>
                )}

                 {isSuccess && (
                    <div role="alert" aria-live="assertive">
                        <p className="success">Device Saved</p>
                    </div>
                )}
            </form>
        </div>
    )

}

export default DeviceAddForm;