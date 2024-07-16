import {
  Vehicle,
  VehicleLockStatus,
  VehicleStatus,
  VehicleType,
} from "../../types/vehicle";

export const VEHICLES_DUMMY: Vehicle[] = [
  {
    vehicleID: "123456",
    type: VehicleType.Scooter,
    lockStatus: VehicleLockStatus.Lock,
    speed: 10,
    batteryLevel: 10,
    status: VehicleStatus.Moving,
    location: "23,44.221",
    lastUpdated: new Date(),
  },
  {
    vehicleID: "123457",
    type: VehicleType.SUV,
    lockStatus: VehicleLockStatus.Unlock,
    speed: 20,
    batteryLevel: 10,
    status: VehicleStatus.Idling,
    location: "55.33,57",
    lastUpdated: new Date(),
  },
];
