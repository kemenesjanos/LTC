#ifndef DISTANCECONTROLLER_H
#define DISTANCECONTROLLER_H

#include <Arduino.h>
/**
Kezeli a távolságmérő szenzort.
*/
class DistanceController{
	public:

/**
	Eredményül visszaadja a szenzortól való távolságot.
	*@return A mért távolság cm-ben.
*/
		int getDistance();
/**
	Létrehoz egy példányt a DistanceControllerből.

*/
		DistanceController();

			
	private:
        const int _trigPin = 6;
        const int _echoPin = 5;
        long _duration;
        int _distance;

			
}; 

#endif