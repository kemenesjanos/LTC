//Ha nincs definiálva az lc akkor...
#ifndef LED_CONTROLLER_H
//Definiálom
#define LED_CONTROLLER_H


#include "../ShiftRegister74HC595-master/src/ShiftRegister74HC595.h"

enum colors {
  Red,
  Green,
  Blue,
  Yellow,
  Purple,
  LightBlue,
  White,
  Nothing
};

class LedController{
  private:
    const uint8_t _serialDataPin = 9; // DS
    const uint8_t _clockPin = 10; // SHCP
    const uint8_t _latchPin = 8; // STCP
    ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);
    const uint8_t _redPin = 15;
    const uint8_t _greenPin = 13;
    const uint8_t _bluePin = 14;
  public:
    LedController();
    ~LedController();
    void setColor(colors color);
    void setColor(bool red, bool green, bool blue);
};

#include "LedController.cpp"

#endif
