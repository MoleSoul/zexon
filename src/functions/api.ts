import type { Device } from "../schemas"

const url = "http://localhost:3001/api" // pre funkcnost so server.js

export type ApiResponse<T = void> = 
    | { success: true; data: T }
    | { success: false; error: string };

export const addDevice = async (device: Device): Promise<ApiResponse> => {
    try {
        const res = await fetch(`${url}/ping`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(device)
        });

        if (!res.ok) {
            return { success: false, error: `Server returned status: ${res.status}` };
        }

        return { success: true, data: undefined };
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return { success: false, error: errorMessage };
    }
}

export const getDevices = async (): Promise<ApiResponse<Device[]>> => {
    try {
        const res = await fetch(`${url}/devices`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            return { success: false, error: `Server returned status: ${res.status}` };
        }

        const data: Device[] = await res.json();
        return { success: true, data };
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return { success: false, error: errorMessage };
    }
}