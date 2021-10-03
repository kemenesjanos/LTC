#ifndef BUTTON_CONTROLLER_H
#define BUTTON_CONTROLLER_H

class ButtonController{
  public:
    ButtonController();
    bool isButtonPushed(int serial_number);
  private:
    const uint8_t _inputPin = A0;
};

#include "ButtonController.cpp"

#endif
