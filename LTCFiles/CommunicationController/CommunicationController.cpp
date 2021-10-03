// #include <Arduino.h>
// #include "CommunicationController.h"


// CommunicationController::CommunicationController(){
//    _radio.begin();
//   // _radio.openReadingPipe(1, _address);
//   // _radio.openWritingPipe(_address);
//   //_radio.setPALevel(RF24_PA_MIN);
//   //_radio.stopListening();
// }

// // WirelessComController::WirelessComController(){
  
// // }

// void CommunicationController::sendMessage(const char message[]){
//   _radio.stopListening();
//   _radio.write(&message, sizeof(message));
// }

// String CommunicationController::receiveMessage(){
//   _radio.startListening();
//   char text[32] = "";
//   while (!_radio.available());
//   _radio.read(&text, sizeof(text));
//   return text;
// }