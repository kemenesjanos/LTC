import { on } from "node:events";
import { Device } from "../Models/deviceData";
import { DevicesData } from "../Models/devicesData";

export class DevicesDataHandler {
    devicesData: DevicesData;
    constructor(devicesData: DevicesData) {
        this.devicesData= devicesData;
    }

    /**
     * addDevice
     */
    public addDevice(newDevice: Device) : boolean {
        var l = this.devicesData.devices.length;
        var r = this.devicesData.devices.push(newDevice);
        return (r === l+1);
    }

    /**
     * removeDevice
     */
    public removeDevice(removeDeviceId: string) : boolean {
        var r = this.devicesData.devices = this.devicesData.devices.filter(dev => dev.id !== removeDeviceId);
        return typeof r === typeof Device;
    }

    /**
     * getDevices
     */
    public getDevices() : Array<Device>{
        return this.devicesData.devices;
    }

    /**
     * updateDevice
     */
    public updateDevice(oldId: string, newDevice: Device) : boolean {
        if(this.removeDevice(oldId)){
            return this.addDevice(newDevice);
        }
        else{
            return false;
        }
    }
}