#ifndef MOTOR_CONTROLLER_H
#define MOTOR_CONTROLLER_H

#include "../Stepper_shift/Stepper.h"

class MotorController{
  public:
    MotorController();
    void turnRight(int degree, int speed);
    void turnLeft(int degree, int speed);
    
    
  private:
    // Number of steps per internal motor revolution 
    const int _STEPS_PER_REV = 32; 
    
    //  Amount of Gear Reduction
    const int _GEAR_RED = 64;
    
    // Number of steps per geared output rotation
    const int _STEPS_PER_OUT_REV = _STEPS_PER_REV * _GEAR_RED;
    
    // Define Variables
    
    // Number of Steps Required
    int _StepsRequired;

    const int _in1_Sh = 4;
    const int _in2_Sh = 6;
    const int _in3_Sh = 5;
    const int _in4_Sh = 7;

    //4, 5, 6, 7
    //8, 10, 9, 11
    // in1, in3, in2, in4
    Stepper _steppermotor = Stepper(_STEPS_PER_REV, _in1_Sh, _in2_Sh, _in3_Sh, _in4_Sh);
};

#include "MotorController.cpp"

#endif
