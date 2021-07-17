import { DescriptionTabData } from "./descriptionTabData";
import {getNonce} from "../getNonce";
import { PropertiesTabData } from "./propertiesTabData";
import { MethodsTabData } from "./methodsTabData";
import { ClassTabData } from "./classTabData";

export class Device {
    id: string;
    descriptionTabData: DescriptionTabData;
    propertiesTabData: PropertiesTabData;
    methodsTabData: MethodsTabData;
    classTabData: ClassTabData;
    constructor() {
        this.descriptionTabData=new DescriptionTabData();
        this.propertiesTabData = new  PropertiesTabData();
        this.methodsTabData = new MethodsTabData();
        this.classTabData = new ClassTabData();
        this.id = getNonce();
    }
}