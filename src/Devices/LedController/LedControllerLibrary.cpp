//Mivel ugyanabban a mappában van, ezért ", ha pl. a library mappába tesszük, akkor <>.
#include "LedControllerLibrary.h"

LedControllerLib::LedControllerLib(){
  
}

void LedControllerLib::setColor(bool red, bool green, bool blue){
  digitalWrite(_redPin, red ? HIGH : LOW);
  digitalWrite(_greenPin, green ? HIGH : LOW);
  digitalWrite(_bluePin, blue ? HIGH : LOW);
}

void LedControllerLib::setColor(colors color){
  switch (color) {
  case Red:
    digitalWrite(_redPin, HIGH);
    digitalWrite(_greenPin, LOW);
    digitalWrite(_bluePin, LOW);
    break;
  case Green:
    digitalWrite(_redPin, LOW);
    digitalWrite(_greenPin, HIGH);
    digitalWrite(_bluePin, LOW);
    break;
  case Blue:
    digitalWrite(_redPin, LOW);
    digitalWrite(_greenPin, LOW);
    digitalWrite(_bluePin, HIGH);
    break;
  case Yellow:
    digitalWrite(_redPin, HIGH);
    digitalWrite(_greenPin, HIGH);
    digitalWrite(_bluePin, LOW);
    break;
  case Purple:
    digitalWrite(_redPin, HIGH);
    digitalWrite(_greenPin, LOW);
    digitalWrite(_bluePin, HIGH);
    break;
  case LightBlue:
    digitalWrite(_redPin, LOW);
    digitalWrite(_greenPin, HIGH);
    digitalWrite(_bluePin, HIGH);
    break;
  case White:
    digitalWrite(_redPin, HIGH);
    digitalWrite(_greenPin, HIGH);
    digitalWrite(_bluePin, HIGH);
    break;
  case Nothing:
    digitalWrite(_redPin, LOW);
    digitalWrite(_greenPin, LOW);
    digitalWrite(_bluePin, LOW);
    break;
  default:
    digitalWrite(_redPin, LOW);
    digitalWrite(_greenPin, LOW);
    digitalWrite(_bluePin, LOW);
    break;
  };
}
