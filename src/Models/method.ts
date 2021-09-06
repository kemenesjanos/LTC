import {getNonce} from "../getNonce";
import { Parameter } from "./parameter";

export class Method {
    name: String;
    description: String = "";
    returnType: String = "void";
    returnDescription: String = "";
    parameters: Parameter[] = [];

    id: String;
    constructor(name: String, description: String) {
        this.name = name;
        this.description = description;
        this.id = getNonce();
    }
}