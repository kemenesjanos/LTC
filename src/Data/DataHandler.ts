import {Device} from "../Models/deviceData";
import * as vscode from "vscode";
import { Uri } from "vscode";

export class DataHandler {

    uri: Uri;
    constructor(uri: Uri) {
        this.uri=uri;
    }
    public saveData(dev: Device) {
        let fs = require("fs");
        fs.writeFile(vscode.Uri.joinPath(this.uri,"src", "alma.txt"),Buffer.from("alma"));
        vscode.window.showInformationMessage('elvileg!');
		
    }

    public getData(): Device {
        return new Device();
    }
}