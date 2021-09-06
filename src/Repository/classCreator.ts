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
#endif
`+ `
class `+ model.descriptionTabData.name + `{
  public:
    ` +
    model.descriptionTabData.name + `();
    `;

  if (model.methodsTabData.methods.filter(x => x.isPublic === true) !== undefined) {
    model.methodsTabData.methods.filter(x => x.isPublic === true).forEach(meth => {
      pre += createMethod(meth);
      pre +=
        `);
    `;
    });
  }


  pre +=
    `
    `;

  if (model.propertiesTabData.properties.filter(x => x.isPublic === true) !== undefined) {
    model.propertiesTabData.properties.filter(x => x.isPublic === true).forEach(pro => {
      pre += createProperty(pro);
      pre +=
        `;
    `;
    });
  }




  pre += `
  private:
    `;

  if (model.methodsTabData.methods.filter(x => x.isPublic === false) !== undefined) {
    model.methodsTabData.methods.filter(x => x.isPublic === false).forEach(meth => {
      pre += createMethod(meth);
      pre +=
          `);
        `;
    });
  }


  pre +=
    `
    `;

  if (model.propertiesTabData.properties.filter(x => x.isPublic === false) !== undefined) {
    model.propertiesTabData.properties.filter(x => x.isPublic === false).forEach(pro => {
      pre += createProperty(pro);
      pre +=
        `;
    `;
    });
  }
  
  pre+=  `
  
};

#endif`;


  return pre;
}

function createMethod(meth: Method): string {
  var res = meth.returnType + " " + meth.name + "(";
  meth.parameters.forEach(param => {
    res += createProperty(param);
    res += ", ";
  });
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

export function createCpp(model: Device): String {
  return "";
}
