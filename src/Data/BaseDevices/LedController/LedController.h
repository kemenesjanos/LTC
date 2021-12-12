#ifndef LEDCONTROLLER_H
#define LEDCONTROLLER_H

#include <Arduino.h>

#include "../ShiftRegister74HC595-master/src/ShiftRegister74HC595.h"
/**
Irányítja a beépített ledet.
*/
class LedController{
	public:

/**
	Beállítja a piros, zöld és a kék fényeket.
	*@param red Ha true akkor világítani fog a piros szín.
	*@param green Ha true akkor világítani fog a zöld szín.
	*@param blue Ha true akkor világítani fog a kék szín.

*/
		void setColor(bool red, bool green, bool blue);
/**
	Létrehoz egy példányt a LedController osztályból.

*/
		LedController();

			
	private:
    const int _serialDataPin = 9; // DS
    const int _clockPin = 10; // SHCP
    const int _latchPin = 8; // STCP
    ShiftRegister74HC595<2> _sr = ShiftRegister74HC595<2>(_serialDataPin, _clockPin, _latchPin);
    const int _redPin = 15;
    const int _greenPin = 13;
    const int _bluePin = 14;

			
}; 

#endif