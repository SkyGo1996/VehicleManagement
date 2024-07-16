export enum VehicleType {
  "Sedan" = "Sedan",
  "SUV" = "SUV",
  "Scooter" = "Scooter",
  "Van" = "Van",
  "Truck" = "Truck",
}
export enum VehicleLockStatus {
  "Lock" = "Lock",
  "Unlock" = "Unlock",
}
export enum VehicleStatus {
  "Parking" = "Parking",
  "Moving" = "Moving",
  "Idling" = "Idling",
  "Towing" = "Towing",
}

export interface Vehicle {
  vehicleID: string;
  type: VehicleType;
  lockStatus: VehicleLockStatus;
  speed: number;
  batteryLevel: number;
  status: VehicleStatus;
  location: string;
  lastUpdated: Date;
}
