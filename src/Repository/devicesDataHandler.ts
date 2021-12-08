import { on } from "node:events";
import { Device } from "../Models/deviceData";
import { DevicesData } from "../Models/devicesData";
import { Method } from "../Models/method";
import { Parameter } from "../Models/parameter";
import { Property } from "../Models/property";

export class DevicesDataHandler {
    devicesData: DevicesData;
    constructor(devicesData: DevicesData) {
        this.devicesData = devicesData;
    }



    /**
     * addDevice
     */
    public addDevice(newDevice: Device): boolean {
        var l = this.devicesData.devices.length;
        var r = this.devicesData.devices.push(newDevice);
        return (r === l + 1);
    }

    /**
     * addDevice
     */
     public addDeviceAtIndex(newDevice: Device, index: number): boolean {
        var l = this.devicesData.devices.length;
        this.devicesData.devices.splice(index,0,newDevice);
        return (this.devicesData.devices.length === l + 1);
    }

    /**
     * removeDevice
     */
    public removeDevice(removeDeviceId: string): boolean {
        let tmp = this.devicesData.devices.find(x => x.id === removeDeviceId);
        if(tmp?.isProtected){
            return false;
        }
        let r = this.devicesData.devices.length;
        this.devicesData.devices = this.devicesData.devices.filter(dev => dev.id !== removeDeviceId);
        return r === this.devicesData.devices.length +1;
    }

    /**
     * getDevices
     */
    public getDevices(): Array<Device> {
        return this.devicesData.devices;
    }

    /**
     * updateDevice
     */
    public updateDevice(oldId: string, newDevice: Device): boolean {
        if(newDevice.isProtected){
            return false;
        }
        var i = this.devicesData.devices.indexOf(this.devicesData.devices.filter( x => x.id === oldId)[0]);
        if (this.removeDevice(oldId)) {
            return this.addDeviceAtIndex(newDevice, i);
        }
        else {
            return false;
        }
    }

    /**
     * addProperty
     */
    public addProperty(deviceId: string): boolean {
        let tmp = this.devicesData.devices.find(x => x.id === deviceId);
        if(tmp?.isProtected){
            return false;
        }
        if (this.devicesData.devices.find(x => x.id === deviceId)) {
            this.devicesData.devices.find(x => x.id === deviceId)?.propertiesTabData.properties.push(new Property("New Property"));
            return true;
        }
        return false;
    }

    /**
     * removeProperty
     */
    public removeProperty(propertyId: string, deviceId: string): boolean {
        let tmp = this.devicesData.devices.find(x => x.id === deviceId);
        if(tmp?.isProtected){
            return false;
        }
        var dev = this.devicesData.devices.findIndex(x => x.id === deviceId);
        if (dev !== -1) {
            var prop = this.devicesData.devices[dev].propertiesTabData.properties.findIndex(x => x.id === propertyId);
            if (prop !== -1) {
                this.devicesData.devices[dev].propertiesTabData.properties.splice(prop, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * addMethod
     */
    public addMethod(deviceId: string): boolean {
        let tmp = this.devicesData.devices.find(x => x.id === deviceId);
        if(tmp?.isProtected){
            return false;
        }
        if (this.devicesData.devices.find(x => x.id === deviceId)) {
            this.devicesData.devices.find(x => x.id === deviceId)?.methodsTabData.methods.push(new Method("NewMethod", "Description"));
            return true;
        }
        return false;
    }

    /**
     * removeMethod
     */
    public removeMethod(methodId: string, deviceId: string): boolean {

        let tmp = this.devicesData.devices.find(x => x.id === deviceId);
        if(tmp?.isProtected){
            return false;
        }

        var dev = this.devicesData.devices.findIndex(x => x.id === deviceId);
        if (dev !== -1) {
            var prop = this.devicesData.devices[dev].methodsTabData.methods.findIndex(x => x.id === methodId);
            if (prop !== -1) {
                this.devicesData.devices[dev].methodsTabData.methods.splice(prop, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * addParameter
     */
    public addParameter(deviceId: string, methodId: string): boolean {
        let tmp = this.devicesData.devices.find(x => x.id === deviceId);
        if(tmp?.isProtected){
            return false;
        }
        if (this.devicesData.devices.find(x => x.id === deviceId)) {
            if (this.devicesData.devices.find(x => x.id === deviceId)?.methodsTabData.methods.find(y=> y.id === methodId)) {
                this.devicesData.devices.find(x => x.id === deviceId)?.methodsTabData.methods.find(y=> y.id === methodId)?.parameters.push(new Parameter());
            return true;
            }
        }
        return false;
    }

    /**
     * removeParameter
     */
    public removeParameter(paramId: string, methodId: string, deviceId: string): boolean {

        let tmp = this.devicesData.devices.find(x => x.id === deviceId);
        if(tmp?.isProtected){
            return false;
        }

        var dev = this.devicesData.devices.findIndex(x => x.id === deviceId);
        if (dev !== -1) {
            var method = this.devicesData.devices[dev].methodsTabData.methods.findIndex(x => x.id === methodId);
            if (method !== -1) {
                var param = this.devicesData.devices[dev].methodsTabData.methods[method].parameters.findIndex(x => x.id===paramId);
                if(param !== -1){
                    this.devicesData.devices[dev].methodsTabData.methods[method].parameters.splice(param, 1);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * validateModel
     */
    public static validateModel(dev: Device) : string {
        var res = "Invalid: \n";
        if (dev.isProtected) {
            res += "Protected device.\n";
        }
        if(this.validTitle(dev.descriptionTabData.name) || dev.descriptionTabData.name === "")
        {
            res += "Device name in DESCRIPTION.\n";
        }

        dev.methodsTabData.methods.forEach(method => {
           if(!method.name  || this.validTitle(method.name.toString()) || method.name === ""){
               res += "Method name in METHODS ("+method.name+").\n";
           }
           method.parameters.forEach(param => {
               if(!param.name  || this.validTitle(param.name.toString()) || param.name === ""){
                res += "Method's parameter name in METHODS ("+method.name+"/"+param.name+").\n";
               }

               if(param.initialValue  && this.validTitle(param.initialValue.toString())){
                res += "Initial parameter initial value in METHODS ("+method.name+"/"+param.name+").\n";
            }
           });
        });

        dev.propertiesTabData.properties.forEach(prop => {
            if( !prop.name || this.validTitle(prop.name.toString())){
                res += "Property name in PROPERTIES ("+prop.name+").\n";
            }

            if( prop.initialValue && this.validTitle(prop.initialValue.toString())){
                res += "initial value in PROPERTIES ("+prop.name+").\n";
            }
        });

        if(res === "Invalid: \n"){
            return "";
        }

        return res;
            
    }

    private static validTitle(str: string) : boolean {
        return str.includes(" ") || str.includes("\\n") || str.includes("\\t") || str.includes("\"");
    }


}