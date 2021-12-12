#include "SwitchesController.h"

/**
	Létrehoz egy példányt a SwitchesControllerből.

*/
SwitchesController::SwitchesController()
{

}

/**
	Be vagy kikapcsolja az adott sorszámú kapcsolót.
	*@param serialNumber A kapcsoló sorszáma. 1 és 4 közötti érték lehet.
	*@param val A beállítandó érték. Be (true) vagy ki (false).

*/
void SwitchesController::setSwitch(int serialNumber, bool val)
{
    if(serialNumber > 4 || serialNumber < 1){
        return;
    }
    else
    {
        _sr.set(serialNumber + 8, val ? HIGH : LOW);
    }
}

