#ifndef REMOTECONTROLLER_H
#define REMOTECONTROLLER_H

#include <Arduino.h>


/**
Segítségével használható a távirányító.
*/
class RemoteController{
	public:

/**
	Létrehoz egy RemoteController példányt.

*/
		RemoteController();
/**
	Visszaadja az érzékelt kódot.
	*@return Az érzékelt kód.
*/
		int recievedCode();
/**
	Visszaadja az érzékelt gomb nevét.
	*@return Az érzékelt gomb neve.
*/
		String recivedButton();

			
	private:
    const int _recvPin = 4;

			
/**Tárolja az előző megnyomott értéket.*/ 
		String _keyValue = "None";
		
}; 

#endif