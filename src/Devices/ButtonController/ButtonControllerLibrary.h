#ifndef bc
#define bc

#if (ARDUINO >= 100)
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif

class ButtonControllerLib{
  public:
    ButtonControllerLib();
    bool isButtonPushed(int serial_number);
  private:
    const uint8_t _inputPin = A0;
};

#endif
