import {getNonce} from "../getNonce";

export class Parameter{
    type: String = "";
    name: String = "";
    description: String = "";
    initialValue: any;
    
    id: String;
    constructor() {
        this.id = getNonce();
        this.type = "String";
    }
    
}