#ifndef STEPPERMOTORCONTROLLER_H
#define STEPPERMOTORCONTROLLER_H

#include <StepperSH.h>

/**
Irányítja a léptető motort.
*/
class StepperMotorController{
	public:

                StepperMotorController();
/**
	Jobbra fordítja a motort a megadott szöggel és a megadott sebességgel.
	*@param degree A fordítási szög fokban megadva.
	*@param speed A motor sebessége. Ennyi teljes kört tesz meg 1 perc alatt. Azaz ha 60, akkor 1 másodperc alatt fordúl körbe.

*/
		void turnRight(int degree, int speed);
/**
	Balra fordítja a motort a megadott szöggel és a megadott sebességgel.
	*@param degree A fordítási szög fokban megadva.
	*@param speed A motor sebessége. Ennyi teljes kört tesz meg 1 perc alatt. Azaz ha 60, akkor 1 másodperc alatt fordúl körbe.

*/
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
        const int _in2_Sh = 5;
        const int _in3_Sh = 6;
        const int _in4_Sh = 7;

        //4, 5, 6, 7
        //8, 10, 9, 11
        // in1, in3, in2, in4
        StepperSH _steppermotor = StepperSH(_STEPS_PER_REV, _in1_Sh, _in2_Sh, _in3_Sh, _in4_Sh);

			
}; 

#endif