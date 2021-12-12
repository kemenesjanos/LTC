#ifndef PRINTER_H
#define PRINTER_H

#include <Arduino.h>

/**
Segítségével lehet kiírni a számítógépre.
*/
class Printer{
	public:

/**
	Kiírja az értéket a számítógépre. A kiírás után nem kezd új sort.
	*@param toPrint A paraméter amit kiír.

*/
		void print(String toPrint);
/**
	Kiírja az értéket a számítógépre. A kiírás után nem kezd új sort.
	*@param toPrint A paraméter amit kiír.

*/
		void print(int toPrint);
/**
	Kiírja az értéket a számítógépre. A kiírás után nem kezd új sort.
	*@param toPrint A paraméter amit kiír.

*/
		void print(bool toPrint);
/**
	Kiírja az értéket a számítógépre, a végén új sort kezd.
	*@param toPrint A kiirandó érték.

*/
		void println(String toPrint);
/**
	Kiírja az értéket a számítógépre, a végén új sort kezd.
	*@param toPrint A kiirandó érték.

*/
		void println(int toPrint);
/**
	Kiírja az értéket a számítógépre, a végén új sort kezd.
	*@param toPrint A kiirandó érték.

*/
		void println(bool toPrint);
/**
	Létrehoz egy példányt a Console osztályból.

*/
		Printer();

			
	private:


			
}; 

#endif