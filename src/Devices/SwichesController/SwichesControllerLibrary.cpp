#include "SwichesControllerLibrary.h"

SwitchesControllerLib::SwitchesControllerLib(){
  
}

void SwitchesControllerLib::setSwitch(int serial_number, const uint8_t val){
    if(serial_number > 7){
        return;
    }
    else if(serial_number == 7){
        _sr.set(8, val);
    }
    else
    {
        _sr.set(serial_number + 9, val);
    }
    
    
}