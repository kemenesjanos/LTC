
#include <Arduino.h>
#include "ButtonController/ButtonController.h"

ButtonController asd;

void setup(){
    Serial.begin(9600);
    asd.isButtonPushed(1);
}

void loop(){
    //asd.sendMessage("JÉÉÉÉJ");
    Serial.println("Nos");
    //String tmp = asd.receiveMessage();
    //delay(200);
    //Serial.println(tmp);
    delay(2000);
}