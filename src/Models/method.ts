import {getNonce} from "../getNonce";
import { Parameter } from "./parameter";

export class Method implements PublicOrPrivate{
    name: String;
    description: String = "";
    returnType: String = "void";
    returnDescription: String = "";
    parameters: Parameter[] = [];
    isPublic: boolean = true;
    body: String = "";

    id: String;
    constructor(name: String, description: String) {
        this.name = name;
        this.description = description;
        this.id = getNonce();
    }
    
}