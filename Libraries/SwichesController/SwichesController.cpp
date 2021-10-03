#include <Arduino.h>
#include "SwichesController.h"

SwitchesController::SwitchesController(){
  
}

void SwitchesController::setSwitch(int serial_number, const uint8_t val){
    if(serial_number > 4 || serial_number < 1){
        return;
    }
    else
    {
        _sr.set(serial_number + 8, val);
    }
    
    
}