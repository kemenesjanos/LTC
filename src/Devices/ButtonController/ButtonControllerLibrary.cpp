#include "ButtonControllerLibrary.h"

ButtonControllerLib::ButtonControllerLib(){
  
}

bool ButtonControllerLib::isButtonPushed(int serial_number){

    if(serial_number < 0 || serial_number > 4){
        return false;
    }


    int pushedButton = -1;
    int value = analogRead(_inputPin);

    if (value < 10)
    {
        return false;
    }
    else if ( 10 < value && value < 10)
    {
        pushedButton = 0;
    }
    else if ( 10 < value && value < 10)
    {
        pushedButton = 1;
    }
    else if ( 10 < value && value < 10)
    {
        pushedButton = 2;
    }
    else if ( 10 < value && value < 10)
    {
        pushedButton = 3;
    }
    else{
        pushedButton = 4;
    }

    return pushedButton == serial_number;
    
    
}

