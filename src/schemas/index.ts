import * as z from "zod"; 
 
export const DeviceSchema = z.object({ 
  uuid: z.string().min(1, "UUID cannot be empty"),
  battery_percent: z.number().min(0).max(100)
});

export type Device = z.infer<typeof DeviceSchema>;

export const validateDevice = (device:unknown) => DeviceSchema.safeParse(device);