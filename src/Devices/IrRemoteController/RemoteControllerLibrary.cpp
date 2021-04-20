#include "RemoteControllerLibrary.h"

RemoteControllerLib::RemoteControllerLib(){
  irrecv.enableIRIn();
}

uint32_t RemoteControllerLib::recivedHEX(){
  if(irrecv.decode(&results)){
    unsigned long res = results.value;
    irrecv.resume();
    return res;
  }

  return 0;
}

buttons RemoteControllerLib::recivedButton(){
  buttons res= None;
    if (irrecv.decode(&results)){
        if (results.value == 0XFFFFFFFF){
          results.value = _key_value;
        }

        switch(results.value){
          case 0xFFA25D:
          res = CHm;
          break;
          case 0xFF629D:
          res = CH;
          break;
          case 0xFFE21D:
          res = CHp;
          break;
          case 0xFF22DD:
          res = Prev;
          break;
          case 0xFF02FD:
          res = Next;
          break;  
          case 0xFFC23D:
          res = Play;
          break;               
          case 0xFFE01F:
          res = VolDown;
          break;  
          case 0xFFA857:
          res = VolUp;
          break;  
          case 0xFF906F:
          res = EQ;
          break;  
          case 0xFF6897:
          res = Zero;
          break;  
          case 0xFF9867:
          res = Hundred;
          break;
          case 0xFFB04F:
          res = TwoHundred;
          break;
          case 0xFF30CF:
          res = One;
          break;
          case 0xFF18E7:
          res = Two;
          break;
          case 0xFF7A85:
          res = Three;
          break;
          case 0xFF10EF:
          res = Four;
          break;
          case 0xFF38C7:
          res = Five;
          break;
          case 0xFF5AA5:
          res = Six;
          break;
          case 0xFF42BD:
          res = Seven;
          break;
          case 0xFF4AB5:
          res = Eight;
          break;
          case 0xFF52AD:
          res = Nine;
          break;
          default:
          res = None;
          break;
        }
        _key_value = res;
        irrecv.resume();
    }
    return res;
}