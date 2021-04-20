//Ha nincs definiálva az lc akkor...
#ifndef lc
//Definiálom
#define lc

#if (ARDUINO >= 100)
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif

enum colors {
  Red,
  Green,
  Blue,
  Yellow,
  Purple,
  LightBlue,
  White,
  Nothing
};

class LedControllerLib{
  public:
    LedControllerLib();
    void setColor(colors color);
    void setColor(bool red, bool green, bool blue);
  private:
    const uint8_t _redPin = 3;
    const uint8_t _greenPin = 2;
    const uint8_t _bluePin = 1;
  
};

#endif
