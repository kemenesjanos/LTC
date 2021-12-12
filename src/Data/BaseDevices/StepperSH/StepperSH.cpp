#include "StepperSH.h"

StepperSH::StepperSH(int number_of_steps, int motor_sh_pin_1, int motor_sh_pin_2,
                                      int motor_sh_pin_3, int motor_sh_pin_4)
{
  this->step_number = 0;    // which step the motor is on
  this->direction = 0;      // motor direction
  this->last_step_time = 0; // time stamp in us of the last step taken
  this->number_of_steps = number_of_steps; // total number of steps for this motor

  // Arduino pins for the motor control connection:
  this->motor_pin_1 = motor_sh_pin_1;
  this->motor_pin_2 = motor_sh_pin_2;
  this->motor_pin_3 = motor_sh_pin_3;
  this->motor_pin_4 = motor_sh_pin_4;

  // pin_count is used by the stepMotor() method:
  this->pin_count = 4;
}

/*
 * Sets the speed in revs per minute
 */
void StepperSH::setSpeed(int whatSpeed)
{
  this->step_delay = 60L * 1000L * 1000L / this->number_of_steps / whatSpeed;
}

/*
 * Moves the motor forward or backwards.
 */
void StepperSH::stepMotor(int thisStep)
{
  if (this->pin_count == 2) {
    switch (thisStep) {
      case 0:  // 01
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, HIGH);
      break;
      case 1:  // 11
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, HIGH);
      break;
      case 2:  // 10
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, LOW);
      break;
      case 3:  // 00
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, LOW);
      break;
    }
  }
  if (this->pin_count == 4) {
    switch (thisStep) {
      case 0:  // 1010
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, LOW);
        _sr.set(motor_pin_3, HIGH);
        _sr.set(motor_pin_4, LOW);
      break;
      case 1:  // 0110
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, HIGH);
        _sr.set(motor_pin_3, HIGH);
        _sr.set(motor_pin_4, LOW);
      break;
      case 2:  //0101
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, HIGH);
        _sr.set(motor_pin_3, LOW);
        _sr.set(motor_pin_4, HIGH);
      break;
      case 3:  //1001
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, LOW);
        _sr.set(motor_pin_3, LOW);
        _sr.set(motor_pin_4, HIGH);
      break;
    }
  }

  if (this->pin_count == 5) {
    switch (thisStep) {
      case 0:  // 01101
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, HIGH);
        _sr.set(motor_pin_3, HIGH);
        _sr.set(motor_pin_4, LOW);
        _sr.set(motor_pin_5, HIGH);
        break;
      case 1:  // 01001
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, HIGH);
        _sr.set(motor_pin_3, LOW);
        _sr.set(motor_pin_4, LOW);
        _sr.set(motor_pin_5, HIGH);
        break;
      case 2:  // 01011
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, HIGH);
        _sr.set(motor_pin_3, LOW);
        _sr.set(motor_pin_4, HIGH);
        _sr.set(motor_pin_5, HIGH);
        break;
      case 3:  // 01010
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, HIGH);
        _sr.set(motor_pin_3, LOW);
        _sr.set(motor_pin_4, HIGH);
        _sr.set(motor_pin_5, LOW);
        break;
      case 4:  // 11010
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, HIGH);
        _sr.set(motor_pin_3, LOW);
        _sr.set(motor_pin_4, HIGH);
        _sr.set(motor_pin_5, LOW);
        break;
      case 5:  // 10010
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, LOW);
        _sr.set(motor_pin_3, LOW);
        _sr.set(motor_pin_4, HIGH);
        _sr.set(motor_pin_5, LOW);
        break;
      case 6:  // 10110
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, LOW);
        _sr.set(motor_pin_3, HIGH);
        _sr.set(motor_pin_4, HIGH);
        _sr.set(motor_pin_5, LOW);
        break;
      case 7:  // 10100
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, LOW);
        _sr.set(motor_pin_3, HIGH);
        _sr.set(motor_pin_4, LOW);
        _sr.set(motor_pin_5, LOW);
        break;
      case 8:  // 10101
        _sr.set(motor_pin_1, HIGH);
        _sr.set(motor_pin_2, LOW);
        _sr.set(motor_pin_3, HIGH);
        _sr.set(motor_pin_4, LOW);
        _sr.set(motor_pin_5, HIGH);
        break;
      case 9:  // 00101
        _sr.set(motor_pin_1, LOW);
        _sr.set(motor_pin_2, LOW);
        _sr.set(motor_pin_3, HIGH);
        _sr.set(motor_pin_4, LOW);
        _sr.set(motor_pin_5, HIGH);
        break;
    }
  }
}

/*
 * Moves the motor steps_to_move steps.  If the number is negative,
 * the motor moves in the reverse direction.
 */
void StepperSH::step(int steps_to_move)
{
  int steps_left = abs(steps_to_move);  // how many steps to take

  // determine direction based on whether steps_to_mode is + or -:
  if (steps_to_move > 0) { this->direction = 1; }
  if (steps_to_move < 0) { this->direction = 0; }


  // decrement the number of steps, moving one step each time:
  while (steps_left > 0)
  {
    unsigned long now = micros();
    // move only if the appropriate delay has passed:
    if (now - this->last_step_time >= this->step_delay)
    {
      // get the timeStamp of when you stepped:
      this->last_step_time = now;
      // increment or decrement the step number,
      // depending on direction:
      if (this->direction == 1)
      {
        this->step_number++;
        if (this->step_number == this->number_of_steps) {
          this->step_number = 0;
        }
      }
      else
      {
        if (this->step_number == 0) {
          this->step_number = this->number_of_steps;
        }
        this->step_number--;
      }
      // decrement the steps left:
      steps_left--;
      // step the motor to step number 0, 1, ..., {3 or 10}
      if (this->pin_count == 5)
        stepMotor(this->step_number % 10);
      else
        stepMotor(this->step_number % 4);
    }
  }
}



/*
  version() returns the version of the library:
*/
int StepperSH::version(void)
{
  return 5;
}
