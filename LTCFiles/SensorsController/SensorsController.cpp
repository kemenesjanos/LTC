#include <Arduino.h>
#include "SensorsController.h"

SensorsController::SensorsController(){
    pinMode(_inputPin, INPUT);
}

int SensorsController::getSensorValue(int serialNumber){
    switch (serialNumber)
    {
    case 1:
        _sr.set(1, HIGH);
        _sr.set(2, LOW);
        _sr.set(3, LOW);
        break;
    case 2:
        _sr.set(1, LOW);
        _sr.set(2, HIGH);
        _sr.set(3, LOW);
        break;
    case 3:
        _sr.set(1, LOW);
        _sr.set(2, LOW);
        _sr.set(3, HIGH);
        break;
    default:
        return -1;
        break;
    }

    int res = analogRead(_inputPin);

    _sr.set(serialNumber, LOW);

    return res;
}

