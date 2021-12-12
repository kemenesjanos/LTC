#include "ServoMotorController.h"
ServoMotorController::ServoMotorController()
{
    pinMode(3,OUTPUT);
    
    _myServo.attach(3);
}

void ServoMotorController::setPosition(int position)
{
    _myServo.write(position);
}

int ServoMotorController::getPosition()
{
    return _myServo.read();
}



