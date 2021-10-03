#include <Arduino.h>
#include "MotorController.h"

MotorController::MotorController(){
}

void MotorController::turnRight(int degree, int speed){
    _steppermotor.setSpeed(speed);    
    _StepsRequired  =  (_STEPS_PER_OUT_REV / 360) * degree;
    _steppermotor.step(_StepsRequired);
}

void MotorController::turnLeft(int degree, int speed){
    _steppermotor.setSpeed(speed);
    _StepsRequired  =  - (_STEPS_PER_OUT_REV / 360) * degree;
    _steppermotor.step(_StepsRequired);
}