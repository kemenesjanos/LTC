#ifndef REMOTE_CONTROLLER_H
#define REMOTE_CONTROLLER_H

#include <IRremote.h>


class RemoteController{
  public:
    RemoteController();
    uint32_t recivedHEX();
    String recivedButton();
  private:
    const int _recvPin = 4;
    String _key_value = "None";
    String _res;
};

#include "RemoteController.cpp"

#endif
