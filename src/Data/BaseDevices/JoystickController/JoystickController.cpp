#include "JoystickController.h"

/**
	Létrehoz egy példányt a JoystickController-ből.

*/
JoystickController::JoystickController()
{
    pinMode(_XCoordPin, INPUT);
    pinMode(_YCoordPin, INPUT);
    pinMode(_SignalPin, INPUT);
}

/**
	Visssza adja, hogy a joystick le van-e nyomva.
	*@return Az visszaadott érték true (igaz), ha a joystick megvan nyomva, ellenkező esetben false (hamis).
*/
bool JoystickController::isPushed()
{
    bool res = digitalRead(_SignalPin) == LOW;
    return res;
}

/**
	Vissza adja a joystick X koordinátájának értékét.
	*@return Az érték -5 és 5 közötti érték. A -5 a teljesen balra, az 5 a teljesen jobbra, a 0 a nyugalmi állapotban lévő értéke.
*/
int JoystickController::getXCoord()
{
    int res = round((analogRead(_XCoordPin) - 517) / 100);
    return res;
}

/**
	Vissza adja a joystick Y koordinátájának értékét.
	*@return Az érték -5 és 5 közötti érték. A -5 a teljesen le, az 5 a teljesen fel, a 0 a nyugalmi állapotban lévő értéke.
*/
int JoystickController::getYCoord()
{
    int res = round((analogRead(_YCoordPin) - 517) / 100);
    return res;
}



