import { on } from "node:events";
import { Device } from "../Models/deviceData";
import { DevicesData } from "../Models/devicesData";
import { Property } from "../Models/property";

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

    /**
     * addProperty
     */
     public addProperty(deviceId: string) : boolean {
         if(this.devicesData.devices.find(x => x.id === deviceId) !== undefined){
            this.devicesData.devices.find(x => x.id === deviceId)?.propertiesTabData.properties.push(new Property("New Property", "New Property Description"));
            return true;
         }
         return false;
    }

    /**
     * removeProperty
     */
     public removeProperty(propertyId: string, deviceId: string) : boolean {

        var dev = this.devicesData.devices.findIndex(x => x.id===deviceId);
        if (dev !== -1) {
            var prop = this.devicesData.devices[dev].propertiesTabData.properties.findIndex(x => x.id === propertyId);
            if (prop !== -1) {
                this.devicesData.devices[dev].propertiesTabData.properties.splice(prop,1);
                return true;
            }
        }
        return false;
   }
}