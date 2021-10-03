import {getNonce} from "../getNonce";

export class Property implements PublicOrPrivate{
    name: String;
    description: String = "";
    type: String = "String";
    initialValue: any;
    isPublic: boolean = true;
    id: String;
    constructor(name: String) {
        this.name = name;
        this.id = getNonce();
    }
    
}