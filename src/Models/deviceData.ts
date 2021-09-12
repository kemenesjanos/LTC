import { DescriptionTabData } from "./TabDatas/descriptionTabData";
import {getNonce} from "../getNonce";
import { PropertiesTabData } from "./TabDatas/propertiesTabData";
import { MethodsTabData } from "./TabDatas/methodsTabData";
import { ClassTabData } from "./TabDatas/classTabData";

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