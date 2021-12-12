#include "SensorsController.h"

/**
	Létrehoz egy példányt a SensorsControllerből.

*/
SensorsController::SensorsController()
{
    pinMode(_inputPin, INPUT);
}

/**
	Visszaadja az adott sorszámú szenzor által mért értéket.
	*@param serialNumber A szenzor azonosítója.
	*@return A szenzor által mért érték.
*/
int SensorsController::getSensorValue(int serialNumber)
{
    switch (serialNumber)
    {
    case 1:
        _sr.set(1, LOW);
        _sr.set(2, LOW);
        _sr.set(3, HIGH);
        break;
    case 2:
        _sr.set(1, LOW);
        _sr.set(2, HIGH);
        _sr.set(3, LOW);
        break;
    case 3:
        _sr.set(1, HIGH);
        _sr.set(2, LOW);
        _sr.set(3, LOW);
        break;
    default:
        return -1;
        break;
    }

    int res = analogRead(_inputPin);

    _sr.set(serialNumber, LOW);

    return res;
}

