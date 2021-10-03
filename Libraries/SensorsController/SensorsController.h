#ifndef SENSORS_CONTROLLER_H
#define SENSORS_CONTROLLER_H

#include "../ShiftRegister74HC595-master/src/ShiftRegister74HC595.h"

class SensorsController{
  public:
    SensorsController();
    int getSensorValue(int serialNumber);
  private:
    const uint8_t _inputPin = A3;
    const uint8_t _serialDataPin = 9; // DS
    const uint8_t _clockPin = 10; // SHCP
    const uint8_t _latchPin = 8; // STCP
    ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);
};

#include "SensorsController.cpp"

#endif
