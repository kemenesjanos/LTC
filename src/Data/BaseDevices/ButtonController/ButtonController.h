#ifndef BUTTONCONTROLLER_H
#define BUTTONCONTROLLER_H

#include <Arduino.h>
/**
Kezeli a beépített gombokat.
*/
class ButtonController{
	public:

/**
	Megmondja, hogy az adott sorszámú gomb jelenleg megvan e nyomva, vagy nem.
	*@param serialNumber A gomb sorszáma, amely 1 és 5 között lehet.
	*@return Az értéke true (igaz), ha le van nyomva, ellenkező esetben false (hamis).
*/
		bool isButtonPushed(int serialNumber);
/**
	Létrehoz egy példányt a ButtonController osztályból.

*/
		ButtonController();

			
	private:
    const uint8_t _inputPin = A0;

}; 

#endif