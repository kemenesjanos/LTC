#ifndef SERVOMOTORCONTROLLER_H
#define SERVOMOTORCONTROLLER_H

#include <Servo.h>
#include <Arduino.h>
/**
Segítségével lehet irányítani a szervó motort.
*/
class ServoMotorController{
	public:

/**
	Beállítja a szervó motort a megadott pozícióba.
	*@param position A beállítandó pozíció. 0 és 180 közötti szám.

*/
		void setPosition(int position);

/**
    Lekérdezi a szervó motor pozívióját. (0-180).
    @return A szervó aktuális pozíciója.
*/
		int getPosition();
/**
	Létrehoz egy ServoMotorController példányt.

*/
		ServoMotorController();

			
	private:
        Servo _myServo;
        int _attachPin = 3;
			
}; 

#endif