import { DescriptionTabData } from "./descriptionTabData";
import {getNonce} from "../getNonce"

export class Device {
    id: string;
    descriptionTabData: DescriptionTabData;
    constructor() {
        this.descriptionTabData=new DescriptionTabData();
        this.id = getNonce();
    }
}