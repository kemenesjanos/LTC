#ifndef JOYSTICKCONTROLLER_H
#define JOYSTICKCONTROLLER_H

#include <Arduino.h>
/**
Segítségével kezelhető a csatlakoztatható joystick.
*/
class JoystickController{
	public:

/**
	Visssza adja, hogy a joystick le van-e nyomva.
	*@return Az visszaadott érték true (igaz), ha a joystick megvan nyomva, ellenkező esetben false (hamis).
*/
		bool isPushed();
/**
	Vissza adja a joystick X koordinátájának értékét.
	*@return Az érték -5 és 5 közötti érték. A -5 a teljesen balra, az 5 a teljesen jobbra, a 0 a nyugalmi állapotban lévő értéke.
*/
		int getXCoord();
/**
	Vissza adja a joystick Y koordinátájának értékét.
	*@return Az érték -5 és 5 közötti érték. A -5 a teljesen le, az 5 a teljesen fel, a 0 a nyugalmi állapotban lévő értéke.
*/
		int getYCoord();
/**
	Létrehoz egy példányt a JoystickController-ből.

*/
		JoystickController();

			
	private:
    const int8_t _XCoordPin = A1;
    const int8_t _YCoordPin = A2;
    const int8_t _SignalPin = 0;

			
}; 

#endif