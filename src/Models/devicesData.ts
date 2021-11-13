import { truncate } from "node:fs";
import { Device } from "./deviceData";
import { Method } from "./method";
import { Parameter } from "./parameter";

export class DevicesData {
    devices: Array<Device>;
    constructor() {
        var ledController = new Device();
        ledController.descriptionTabData.name= "Led";
        ledController.descriptionTabData.shortDescription = "Irányítja a beépített ledet.";
        ledController.descriptionTabData.description = "A beépített RGB led piros (red), zöld (green) és kék (blue) ledeket tartalmaz, ezeket tudod be és ki kapcsolni.";
        ledController.descriptionTabData.type = "Nothing";
        ledController.descriptionTabData.example = " Piros: Led.setColor(true,false,false);";
        ledController.isProtected = true;
        var setColor = new Method("setColor", "Beállítja a piros, zöld és a kék fényeket.");
        setColor.returnType = "void";

        var pRed = new Parameter();
        pRed.description = "Legyen bekapcsolva a piros szín?";
        pRed.type = "bool";
        pRed.initialValue = "false";

        var pGreen = new Parameter();
        pGreen.description = "Legyen bekapcsolva a zöld szín?";
        pGreen.type = "bool";
        pGreen.initialValue = "false";

        var pBlue = new Parameter();
        pBlue.description = "Legyen bekapcsolva a kék szín?";
        pBlue.type = "bool";
        pBlue.initialValue = "false";

        setColor.parameters.push(pRed);
        setColor.parameters.push(pGreen);
        setColor.parameters.push(pBlue);

        ledController.methodsTabData.methods.push(setColor);
        this.devices= 
        [
            ledController,
        ];
    }
}