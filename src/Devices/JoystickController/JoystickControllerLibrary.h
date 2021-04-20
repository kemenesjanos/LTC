#ifndef jc
#define jc

#if (ARDUINO >= 100)
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif

class JoystickControllerLib{
  public:
    JoystickControllerLib();
    bool isJoystickPushed();
    int getJoystickXCoord();
    int getJoystickYCoord();
  private:
    const uint8_t _XCoordPin = A1;
    const uint8_t _YCoordPin = A2;
  
};

#endif
