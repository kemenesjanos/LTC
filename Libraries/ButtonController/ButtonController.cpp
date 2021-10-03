 #include <Arduino.h>
 #include "ButtonController.h"

ButtonController::ButtonController(){
  pinMode(_inputPin,INPUT);
}

bool ButtonController::isButtonPushed(int serial_number){

    if(serial_number < 1 || serial_number > 5){
        return false;
    }


    int pushedButton = -1;
    int value = analogRead(_inputPin);

    if (value < 10)
    {
        return false;
    }
    else if ( 1000 < value)
    {
        pushedButton = 1;
    }
    else if ( 500 < value && value < 1000)
    {
        pushedButton = 2;
    }
    else if ( 300 < value && value < 500)
    {
        pushedButton = 3;
    }
    else if ( 230 < value && value < 300)
    {
        pushedButton = 4;
    }
    else{
        pushedButton = 5;
    }

    return pushedButton == serial_number;
    
    
}

