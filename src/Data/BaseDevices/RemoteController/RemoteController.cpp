#include "RemoteController.h"
#include <IRremote.h>

/**
	Létrehoz egy RemoteController példányt.

*/
RemoteController::RemoteController()
{
  Serial.begin(9600);
  IrReceiver.begin(_recvPin, ENABLE_LED_FEEDBACK);
}

/**
	Visszaadja az érzékelt kódot.
	*@return Az érzékelt kód.
*/
int RemoteController::recievedCode()
{
  IrReceiver.begin(_recvPin, ENABLE_LED_FEEDBACK);
  delay(100);
  if(IrReceiver.decode()){
    IrReceiver.begin(_recvPin, ENABLE_LED_FEEDBACK);
    int res = IrReceiver.decodedIRData.decodedRawData;
    IrReceiver.resume();
    return res;
  }
  return 0;
}

/**
	Visszaadja az érzékelt gomb nevét.
	*@return Az érzékelt gomb neve.
*/
String RemoteController::recivedButton()
{
  String res= "None";
  IrReceiver.begin(_recvPin, ENABLE_LED_FEEDBACK);
    delay(100);
    if (IrReceiver.decode()){
        if (IrReceiver.decodedIRData.decodedRawData == 0XFFFFFFFF){
          res = _keyValue;
        }

        switch(IrReceiver.decodedIRData.decodedRawData){
          case 0xBA45FF00:
          res = "CHm";
          break;
          case 0xB946FF00:
          res = "CH";
          break;
          case 0xB847FF00:
          res = "CHp";
          break;
          case 0xBB44FF00:
          res = "Prev";
          break;
          case 0xBF40FF00:
          res = "Next";
          break;  
          case 0xBC43FF00:
          res = "Play";
          break;               
          case 0xF807FF00:
          res = "VolDown";
          break;  
          case 0xEA15FF00:
          res = "VolUp";
          break;  
          case 0xF609FF00:
          res = "EQ";
          break;  
          case 0xE916FF00:
          res = "Zero";
          break;  
          case 0xE619FF00:
          res = "Hundred";
          break;
          case 0xF20DFF00:
          res = "TwoHundred";
          break;
          case 0xF30CFF00:
          res = "One";
          break;
          case 0xE718FF00:
          res = "Two";
          break;
          case 0xA15EFF00:
          res = "Three";
          break;
          case 0xF708FF00:
          res = "Four";
          break;
          case 0xE31CFF00:
          res = "Five";
          break;
          case 0xA55AFF00:
          res = "Six";
          break;
          case 0xBD42FF00:
          res = "Seven";
          break;
          case 0xAD52FF00:
          res = "Eight";
          break;
          case 0xB54AFF00:
          res = "Nine";
          break;
        }
        _keyValue = res;
        IrReceiver.resume();
    }
    return res;
}

