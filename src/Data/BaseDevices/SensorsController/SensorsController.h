#ifndef SENSORSCONTROLLER_H
#define SENSORSCONTROLLER_H

#include <Arduino.h>
#include "../ShiftRegister74HC595-master/src/ShiftRegister74HC595.h"

/**
Kezeli a csatlakoztatott szenzorokat.
*/
class SensorsController{
	public:

/**
	Létrehoz egy példányt a SensorsControllerből.

*/
		SensorsController();
/**
	Visszaadja az adott sorszámú szenzor által mért értéket.
	*@param serialNumber A szenzor azonosítója.
	*@return A szenzor által mért érték.
*/
		int getSensorValue(int serialNumber);

			
	private:
    const uint8_t _inputPin = A3;
    const uint8_t _serialDataPin = 9; // DS
    const uint8_t _clockPin = 10; // SHCP
    const uint8_t _latchPin = 8; // STCP
    ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);

			
}; 

#endif