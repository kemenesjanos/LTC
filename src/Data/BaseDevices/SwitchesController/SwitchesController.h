#ifndef SWITCHESCONTROLLER_H
#define SWITCHESCONTROLLER_H

#include <Arduino.h>
#include "../ShiftRegister74HC595-master/src/ShiftRegister74HC595.h"

/**
A kapcsolókat kezeli.
*/
class SwitchesController{
	public:

/**
	Létrehoz egy példányt a SwitchesControllerből.

*/
		SwitchesController();
/**
	Be vagy kikapcsolja az adott sorszámú kapcsolót.
	*@param serialNumber A kapcsoló sorszáma. 1 és 4 közötti érték lehet.
	*@param val A beállítandó érték. Be (true) vagy ki (false).

*/
		void setSwitch(int serialNumber, bool val);

			
	private:
        const uint8_t _serialDataPin = 9; // DS
        const uint8_t _clockPin = 10; // SHCP
        const uint8_t _latchPin = 8; // STCP
        ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);

			
}; 

#endif