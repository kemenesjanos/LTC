import { Device } from "../Models/deviceData";
import { Method } from "../Models/method";

export function createHeader(model: Device) : String {
    var pre = `
    #ifndef `+
    model.id +
    `
    #define`+
    model.id +
    `
    
    #if (ARDUINO >= 100)
      #include "Arduino.h"
    #else
      #include "WProgram.h"
    #endif`;

    var classPart=`

    class `+ model.descriptionTabData.name +`{
      public:
      ` + 
    model.descriptionTabData.name + `();
    `;

    model.methodsTabData.methods.forEach(meth => {
      classPart.concat(createMethod(meth));
    });
    
    classPart.concat(`);
  private:
  `+
  `
  
};

#endif`);

    
    return pre;
}

function createMethod(meth:Method) : string {
  var res = meth.returnType + " " + meth.name + "(";
  meth.parameters.forEach(param => {
    res.concat(param.type.toString(), " ", param.name.toString());
  });
return res;
}

export function createCpp(model: Device) : String {
    return "";
}
