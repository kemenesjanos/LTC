import {getNonce} from "../getNonce";

export class Property {
    name: String;
    description: String = "";
    type: String = "";
    initialValue: any;

    id: String;
    constructor(name: String) {
        this.name = name;
        this.id = getNonce();
    }
}