import { Device } from "../Models/deviceData";
import { Method } from "../Models/method";
import { Parameter } from "../Models/parameter";
import { Property } from "../Models/property";
import { MethodsTabData } from "../Models/TabDatas/methodsTabData";

export function createHeader(model: Device): string {
  var pre = `#ifndef `+
    model.descriptionTabData.name.toUpperCase() + "_H" +
    `\n#define `+
    model.descriptionTabData.name.toUpperCase() + "_H\n\n";

  if (model.descriptionTabData.type !== "Nothing") {

    if (model.descriptionTabData.type === "I2C") {
      pre += `\n#include "I2cController.h"\n\n`;;
    }
    else if (model.descriptionTabData.type === "Switch") {
      pre += `\n#include "../SwichesController/SwichesController.h"\n\n`;
    }
    else if (model.descriptionTabData.type === "Sensor") {
      pre += `\n#include "../SensorsController/SensorsController.h"\n\n`;
    }
  }



  pre += comment(model, "Device")
    +
    `\nclass ` + model.descriptionTabData.name + `{`;

  pre += createHeaderBlock(true, model);
  pre += createHeaderBlock(false, model);

  pre += `\n}; \n\n#include "` + model.descriptionTabData.name + `.cpp"\n\n#endif`;


  return pre;
}

function createMethod(meth: Method, isCpp: boolean, modelsName: string): string {
  var res = "";
  if (meth.returnType !== "constructor") {
    res += meth.returnType + " ";
  }

  if (isCpp) {
    res += modelsName + "::";
  }

  if(meth.returnType === "constructor"){
    res += modelsName;
  }
  else{
    res += meth.name;
  }
  res += "(";
  if(meth.parameters.length !== 0){
    for (var i = 0; i < meth.parameters.length-1; i++) {
      res += createProperty(meth.parameters[i], isCpp);
      res += ", ";
    }
    res += createProperty(meth.parameters[meth.parameters.length-1], isCpp);
  }
  

  res += ")";
  if (!isCpp) {
    res += `;`;
  }

  res += "\n";
  return res;
}

function createProperty(param: Property | Parameter, isCpp: boolean): string {
  var res = param.type + " " + param.name;
  if (param.initialValue !== "" && isCpp) {
    res += " = ";
    if (param.type === "String") {
      res += `"` + param.initialValue + `"`;
    }
    else if (param.type === "char") {
      res += `'` + param.initialValue + `'`;
    }
    else {
      res += param.initialValue;
    }
  }

  return res;
}

function comment(obj: Device | Method | Property, type: string): string {

  if (type === "Device") {
    return "/**\n" + (obj as Device).descriptionTabData.shortDescription + "\n*/";
  }
  else if (type === "Method") {
    var tmp = "/**\n";

    tmp += "\t" + (obj as Method).description;
    tmp += "\n";

    (obj as Method).parameters.forEach(param => {
      tmp += "\t*@param " + param.name;
      tmp += " " + param.description + "\n";

    });

    if ((obj as Method).returnType !== "void" && (obj as Method).returnType !== "constructor") {
      tmp += "\t*@return " + (obj as Method).returnDescription;
    }

    tmp += "\n*/";

    return tmp;
  }
  else {
    return "nem jó";
  }

}


function createHeaderBlock(isPublic: boolean, model: Device): string {
  var pre = `\n\t`;

  pre += isPublic ? "public:\n\n" : "private:\n\n";

  if (model.methodsTabData.methods.filter(x => x.isPublic === isPublic)) {
    model.methodsTabData.methods.filter(x => x.isPublic === isPublic).forEach(meth => {
      pre += comment(meth, "Method");

      pre += "\n\t\t" + createMethod(meth, false, model.descriptionTabData.name);
    });
  }


  pre += `\n\t\t\t`;

  if (model.propertiesTabData.properties.filter(x => x.isPublic === isPublic)) {
    model.propertiesTabData.properties.filter(x => x.isPublic === isPublic).forEach(pro => {
      pre += "\n/**" + pro.description + "*/ \n\t\t";
      pre += createProperty(pro,false);
      pre += `;\n\t\t`;
    });
  }

  return pre;
}

export function createCpp(model: Device, currentCppText?: string): string {

  if(currentCppText){
    setMethodsBody(model.methodsTabData, currentCppText,model.descriptionTabData.name);
  }
  
  

  var res = "#include <Arduino.h>\n";
  res += `#include "` + model.descriptionTabData.name + `.h"\n\n`;

  model.methodsTabData.methods.forEach(meth => {
    res += createMethod(meth, true, model.descriptionTabData.name);
    res += "{\n"+meth.body+"\n}\n\n";
    
  });

  return res;
}


//Save all methods body
export function setMethodsBody(methodsTabData: MethodsTabData, text: string, modelsName: string) {
  methodsTabData.methods.forEach(method => {
    method.body = getMethodBody(method,text,modelsName);
  });
}

function getMethodBody(method: Method, text: string, modelsName: string) : string {
  var tmpMethod = createMethod(method, true, modelsName);
  tmpMethod = tmpMethod.substring(0,tmpMethod.length-1);



  var pos = text.indexOf(tmpMethod, 1);
  if (pos === -1) {
    return "";
  }

  //pos after the method and a {
  pos += tmpMethod.length;
  var beginpos = pos;
  var opCount = 0;
  var isEnd = false;
  while (!isEnd) {
    if(text[pos] === "}")
    {
      if(opCount > 1){
        opCount--;
        pos++;
      }
      else{
        isEnd = true;
      }
    }
    else if (text[pos] === "{") {
      if(opCount === 0){
        beginpos = pos +3 ;
      }
      opCount++;
      pos++;
    }
    else{
      pos++;
    }
  }
  let res = text.slice(beginpos,pos - 1);
  return res;
}

