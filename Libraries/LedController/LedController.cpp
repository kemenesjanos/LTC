 #include <Arduino.h>
 #include "LedController.h"

LedController::LedController(){
  _sr.set(_redPin, HIGH);
  _sr.set(_greenPin, HIGH);
  _sr.set(_bluePin, HIGH);
}

LedController::~LedController()
{

}

void LedController::setColor(bool red, bool green, bool blue){
  _sr.set(_redPin, red ? LOW : HIGH);
  _sr.set(_greenPin, green ? LOW : HIGH);
  _sr.set(_bluePin, blue ? LOW : HIGH);
}

void LedController::setColor(colors color){
  switch (color) {
  case Red:
    _sr.set(_redPin, HIGH);
    _sr.set(_greenPin, LOW);
    _sr.set(_bluePin, LOW);
    break;
  case Green:
    _sr.set(_redPin, LOW);
    _sr.set(_greenPin, HIGH);
    _sr.set(_bluePin, LOW);
    break;
  case Blue:
    _sr.set(_redPin, LOW);
    _sr.set(_greenPin, LOW);
    _sr.set(_bluePin, HIGH);
    break;
  case Yellow:
    _sr.set(_redPin, HIGH);
    _sr.set(_greenPin, HIGH);
    _sr.set(_bluePin, LOW);
    break;
  case Purple:
    _sr.set(_redPin, HIGH);
    _sr.set(_greenPin, LOW);
    _sr.set(_bluePin, HIGH);
    break;
  case LightBlue:
    _sr.set(_redPin, LOW);
    _sr.set(_greenPin, HIGH);
    _sr.set(_bluePin, HIGH);
    break;
  case White:
    _sr.set(_redPin, HIGH);
    _sr.set(_greenPin, HIGH);
    _sr.set(_bluePin, HIGH);
    break;
  case Nothing:
    _sr.set(_redPin, LOW);
    _sr.set(_greenPin, LOW);
    _sr.set(_bluePin, LOW);
    break;
  default:
    _sr.set(_redPin, LOW);
    _sr.set(_greenPin, LOW);
    _sr.set(_bluePin, LOW);
    break;
  };
}
