#ifndef sc
#define sc

#if (ARDUINO >= 100)
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif

#include <ShiftRegister74HC595.h>

class SensorsControllerLib{
  public:
    SensorsControllerLib();
    int getSensorValue(int serialNumber);
  private:
    const uint8_t _inputPin = A3;
    const uint8_t _serialDataPin = 9; // DS
    const uint8_t _clockPin = 10; // SHCP
    const uint8_t _latchPin = 8; // STCP
    ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);
};

#endif
