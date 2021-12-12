
#ifndef STEPPERSH_H
#define STEPPERSH_H

#include "../ShiftRegister74HC595-master/src/ShiftRegister74HC595.h"

// library interface description
class StepperSH {
  public:
    // constructors:
    StepperSH(int number_of_steps, int motor_sh_pin_1, int motor_sh_pin_2, int motor_sh_pin_3, int motor_sh_pin_4);

    // speed setter method:
    void setSpeed(int whatSpeed);

    // mover method:
    void step(int steps_to_move);

    int version(void);

  private:
    void stepMotor(int thisStep);

    int direction;            // Direction of rotation
    unsigned long step_delay; // delay between steps, in ms, based on speed
    int number_of_steps;      // total number of steps this motor can take
    int pin_count;            // how many pins are in use.
    int step_number;          // which step the motor is on

    // motor pin numbers:
    int motor_pin_1;
    int motor_pin_2;
    int motor_pin_3;
    int motor_pin_4;
    int motor_pin_5;          // Only 5 phase motor

    unsigned long last_step_time; // time stamp in us of when the last step was taken

    const uint8_t _serialDataPin = 9; // DS
    const uint8_t _clockPin = 10; // SHCP
    const uint8_t _latchPin = 8; // STCP
    ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);
    
};

#endif

