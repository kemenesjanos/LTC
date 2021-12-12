#include "LedController.h"

/**
	Beállítja a piros, zöld és a kék fényeket.
	*@param red Ha true akkor világítani fog a piros szín.
	*@param green Ha true akkor világítani fog a zöld szín.
	*@param blue Ha true akkor világítani fog a kék szín.

*/
void LedController::setColor(bool red, bool green, bool blue)
{
  _sr.set(_redPin, red ? LOW : HIGH);
  _sr.set(_greenPin, green ? LOW : HIGH);
  _sr.set(_bluePin, blue ? LOW : HIGH);
}

/**
	Létrehoz egy példányt a LedController osztályból.

*/
LedController::LedController()
{
  _sr.set(_redPin, HIGH);
  _sr.set(_greenPin, HIGH);
  _sr.set(_bluePin, HIGH);
}

