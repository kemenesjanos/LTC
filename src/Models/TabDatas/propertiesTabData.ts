import { Property } from "../property";

export class PropertiesTabData {
    properties: Property[];
    constructor() {
        this.properties = [new Property("ALMA", "Alma leírás")];
    }
}