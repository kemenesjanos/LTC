#include "DistanceController.h"

/**
	Eredményül visszaadja a szenzortól való távolságot.
	*@return A mért távolság cm-ben.
*/
int DistanceController::getDistance()
{
    // Clears the trigPin
    digitalWrite(_trigPin, LOW);
    delayMicroseconds(2);
    // Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(_trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(_trigPin, LOW);
    // Reads the echoPin, returns the sound wave travel time in microseconds
    _duration = pulseIn(_echoPin, HIGH);
    // Calculating the distance
    _distance= _duration*0.034/2;
    return _distance;
}

/**
	Létrehoz egy példányt a DistanceControllerből.

*/
DistanceController::DistanceController()
{
    pinMode(_trigPin, OUTPUT); // Sets the trigPin as an Output
    pinMode(_echoPin, INPUT); // Sets the echoPin as an Input
    // Serial.begin(9600); // Starts the serial communication
}

