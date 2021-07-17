import {getNonce} from "../getNonce";

export class Method {
    name: String;
    description: String;
    id: String;
    constructor(name: String, description: String) {
        this.name = name;
        this.description = description;
        this.id = getNonce();
    }
}