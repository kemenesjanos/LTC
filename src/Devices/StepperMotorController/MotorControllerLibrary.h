#ifndef sc
#define sc

#if (ARDUINO >= 100)
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif

#include "Stepper_shift/Stepper.h"

class MotorControllerLib{
  public:
    MotorControllerLib();
    void turnRight(int degree, int speed);
    void turnLeft(int degree, int speed);
    // Number of steps per internal motor revolution 
    const int STEPS_PER_REV = 32; 
    
    //  Amount of Gear Reduction
    const int GEAR_RED = 64;
    
    // Number of steps per geared output rotation
    const int STEPS_PER_OUT_REV = STEPS_PER_REV * GEAR_RED;
    
    // Define Variables
    
    // Number of Steps Required
    int StepsRequired;

    const int _in1_Sh = 4;
    const int _in2_Sh = 5;
    const int _in3_Sh = 6;
    const int _in4_Sh = 7;

    Stepper steppermotor(2048, 4, 5, 6, 7);
    
  private:
    
};

#endif
