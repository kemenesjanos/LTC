#include "JoystickControllerLibrary.h"

JoystickControllerLib::JoystickControllerLib(){
  
}

bool JoystickControllerLib::isJoystickPushed(){
    return false;
}

int JoystickControllerLib::getJoystickXCoord(){
    return round((analogRead(_XCoordPin) - 517) / 100);
}

int JoystickControllerLib::getJoystickYCoord(){
    return round((analogRead(_YCoordPin) - 517) / 100);
}

