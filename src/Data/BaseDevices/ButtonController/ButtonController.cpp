#include "ButtonController.h"

/**
	Megmondja, hogy az adott sorszámú gomb jelenleg megvan e nyomva, vagy nem.
	*@param serialNumber A gomb sorszáma, amely 1 és 5 között lehet.
	*@return Az értéke true (igaz), ha le van nyomva, ellenkező esetben false (hamis).
*/
bool ButtonController::isButtonPushed(int serialNumber = 1)
{
    if(serialNumber < 1 || serialNumber > 5){
        return false;
    }


    int pushedButton = -1;
    int value = analogRead(_inputPin);

    if (value < 10)
    {
        return false;
    }
    else if ( 1000 < value)
    {
        pushedButton = 1;
    }
    else if ( 500 < value && value < 1000)
    {
        pushedButton = 2;
    }
    else if ( 300 < value && value < 500)
    {
        pushedButton = 3;
    }
    else if ( 230 < value && value < 300)
    {
        pushedButton = 4;
    }
    else{
        pushedButton = 5;
    }

    return pushedButton == serialNumber;
}

/**
	Létrehoz egy példányt a ButtonController osztályból.

*/
ButtonController::ButtonController()
{
  pinMode(_inputPin,INPUT);
}

