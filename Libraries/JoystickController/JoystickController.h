#ifndef JOYSTICK_CONTROLLER_LIBRARY_H
#define JOYSTICK_CONTROLLER_LIBRARY_H

class JoystickController{
  public:
    JoystickController();
    bool isJoystickPushed();
    int getJoystickXCoord();
    int getJoystickYCoord();
  private:
    const int8_t _XCoordPin = A1;
    const int8_t _YCoordPin = A2;
    const int8_t _SignalPin = 0;
  
};

#include "JoystickController.cpp"

#endif
