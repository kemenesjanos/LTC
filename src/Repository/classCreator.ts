import { Device } from "../Models/deviceData";
import { Method } from "../Models/method";
import { Parameter } from "../Models/parameter";
import { Property } from "../Models/property";

export function createHeader(model: Device): string {
  var pre = `
#ifndef `+
    model.id +
    `
#define `+
    model.id +
    `

#if (ARDUINO >= 100)
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif\n\n`;

  if (model.descriptionTabData.type !== "Nothing") {

    if (model.descriptionTabData.type === "I2C") {
      pre += `\n#include "I2cController.h"\n\n`;;
    }
    else if (model.descriptionTabData.type === "Switch") {
      pre += `\n#include "SwitchController.h"\n\n`;
    }
    else if (model.descriptionTabData.type === "Sensor") {
      pre += `\n#include "SensorController.h"\n\n`;
    }
    else if (model.descriptionTabData.type === "Nothing") {

    }
  }



  pre += comment(model, "Device")
    +
    `\nclass ` + model.descriptionTabData.name + `{`;

  pre += createBlock(true, model);
  pre += createBlock(false, model);

  pre += `\n\n}; \n\n#endif`;


  return pre;
}

function createMethod(meth: Method, isCpp: Boolean, modelsName: string = ""): string {
  var res = "";
  if (meth.returnType !== "concructor") {
    res += meth.returnType + " ";
  }

  if (isCpp) {
    res += modelsName + "::";
  }
  res += meth.name + "(";
  meth.parameters.forEach(param => {
    res += createProperty(param);
    res += ", ";
  });
  res += ")";
  if (!isCpp) {
    res += `;`;
  }

  res += "\n";
  return res;
}

function createProperty(param: Property | Parameter): string {
  var res = param.type + " " + param.name;
  if (param.initialValue !== "") {
    res += " = ";
    if (param.type === "string") {
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

    if ((obj as Method).returnType !== "void") {
      tmp += "\t*@return " + (obj as Method).returnDescription;
    }

    tmp += "\n*/";

    return tmp;
  }
  else {
    return "nem jó";
  }

}


function createBlock(isPublic: boolean, model: Device): string {
  var pre = `\n\t`;

  pre += isPublic ? "public:\n\n" : "private:\n\n";

  if (model.methodsTabData.methods.filter(x => x.isPublic === isPublic) !== undefined) {
    model.methodsTabData.methods.filter(x => x.isPublic === isPublic).forEach(meth => {
      pre += comment(meth, "Method");

      pre += "\n\t" + createMethod(meth, false);
    });
  }


  pre += `\n\t\t`;

  if (model.propertiesTabData.properties.filter(x => x.isPublic === isPublic) !== undefined) {
    model.propertiesTabData.properties.filter(x => x.isPublic === isPublic).forEach(pro => {
      pre += "\n/**" + pro.description + "*/ \n\t";
      pre += createProperty(pro);
      pre += `;\n\t`;
    });
  }

  return pre;
}

export function createCpp(model: Device): string {

  var res = "#include " + model.descriptionTabData.name + ".h\n\n";

  model.methodsTabData.methods.forEach(meth => {
    res += createMethod(meth, true, model.descriptionTabData.name);
    res += "{\n\n}\n\n";
  });

  return res;
}

