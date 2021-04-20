#ifndef bc
#define bc

#if (ARDUINO >= 100)
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif

#include <ShiftRegister74HC595.h>

class SwitchesControllerLib{
  public:
    SwitchesControllerLib();
    void setSwitch(int serial_number, const uint8_t val);
  private:
    const uint8_t _serialDataPin = 9; // DS
    const uint8_t _clockPin = 10; // SHCP
    const uint8_t _latchPin = 8; // STCP
    ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);
};

#endif
