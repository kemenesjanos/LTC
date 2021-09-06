import { Device } from "../Models/deviceData";
import { Method } from "../Models/method";

export function createHeader(model: Device) : string {
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
`+`
class `+ model.descriptionTabData.name +`{
  public:
  ` + 
model.descriptionTabData.name + `();
  `;

    model.methodsTabData.methods.forEach(meth => {
      pre += createMethod(meth);
      pre +=
`);
  `;
    });

    pre += `
  private:
  `+
  `
  
};

#endif`;

    
    return pre;
}

function createMethod(meth:Method) : string {
  var res = meth.returnType + " " + meth.name + "(";
  meth.parameters.forEach(param => {
    res += param.type + " " + param.name;
    res += ", ";
  });
return res;
}

export function createCpp(model: Device) : String {
    return "";
}
