#include <Arduino.h>
#include "JoystickController.h"

JoystickController::JoystickController(){
    pinMode(_XCoordPin, INPUT);
    pinMode(_YCoordPin, INPUT);
    pinMode(_SignalPin, INPUT);
}

bool JoystickController::isJoystickPushed(){
    bool res = digitalRead(_SignalPin) == LOW;
    return res;
}

int JoystickController::getJoystickXCoord(){
    int res = round((analogRead(_XCoordPin) - 517) / 100);
    return res;
}

int JoystickController::getJoystickYCoord(){
    int res = round((analogRead(_YCoordPin) - 517) / 100);
    return res;
}

