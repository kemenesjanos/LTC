#ifndef SWITCHES_CONTROLLER_H
#define SWITCHES_CONTROLLER_H

#include "../ShiftRegister74HC595-master/src/ShiftRegister74HC595.h"

class SwitchesController{
  public:
    SwitchesController();
    void setSwitch(int serial_number, const uint8_t val);
  private:
    const uint8_t _serialDataPin = 9; // DS
    const uint8_t _clockPin = 10; // SHCP
    const uint8_t _latchPin = 8; // STCP
    ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);
};

#include "SwichesController.cpp"

#endif
