#include "StepperMotorController.h"
#include "../StepperSH/StepperSH.h"

StepperMotorController::StepperMotorController()
{

}

/**
	Jobbra fordítja a motort a megadott szöggel és a megadott sebességgel.
	*@param degree A fordítási szög fokban megadva.
	*@param speed A motor sebessége. Ennyi teljes kört tesz meg 1 perc alatt. Azaz ha 60, akkor 1 másodperc alatt fordúl körbe.

*/
void StepperMotorController::turnRight(int degree, int speed)
{
    _steppermotor.setSpeed(speed);    
    _StepsRequired  =  (_STEPS_PER_OUT_REV / 360) * degree;
    _steppermotor.step(_StepsRequired);
}

/**
	Balra fordítja a motort a megadott szöggel és a megadott sebességgel.
	*@param degree A fordítási szög fokban megadva.
	*@param speed A motor sebessége. Ennyi teljes kört tesz meg 1 perc alatt. Azaz ha 60, akkor 1 másodperc alatt fordúl körbe.

*/
void StepperMotorController::turnLeft(int degree, int speed)
{
    _steppermotor.setSpeed(speed);
    _StepsRequired  =  - (_STEPS_PER_OUT_REV / 360) * degree;
    _steppermotor.step(_StepsRequired);
}

