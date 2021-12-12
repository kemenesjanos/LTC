#include "Printer.h"

/**
	Kiírja az értéket a számítógépre. A kiírás után nem kezd új sort.
	*@param toPrint A paraméter amit kiír.

*/void Printer::print(String toPrint)
{
	Serial.begin(9600);
    Serial.print(toPrint);
}

/**
	Kiírja az értéket a számítógépre. A kiírás után nem kezd új sort.
	*@param toPrint A paraméter amit kiír.

*/void Printer::print(int toPrint)
{
	Serial.begin(9600);
    Serial.print(toPrint);
}

/**
	Kiírja az értéket a számítógépre. A kiírás után nem kezd új sort.
	*@param toPrint A paraméter amit kiír.

*/void Printer::print(bool toPrint)
{
	Serial.begin(9600);
    Serial.print(toPrint);
}

/**
	Kiírja az értéket a számítógépre, a végén új sort kezd.
	*@param toPrint A kiirandó érték.

*/void Printer::println(String toPrint)
{
	Serial.begin(9600);
    Serial.println(toPrint);
}

/**
	Kiírja az értéket a számítógépre, a végén új sort kezd.
	*@param toPrint A kiirandó érték.

*/void Printer::println(int toPrint)
{
	Serial.begin(9600);
    Serial.println(toPrint);
}

/**
	Kiírja az értéket a számítógépre, a végén új sort kezd.
	*@param toPrint A kiirandó érték.

*/void Printer::println(bool toPrint)
{
	Serial.begin(9600);
    Serial.println(toPrint);
}

/**
	Létrehoz egy példányt a Console osztályból.

*/Printer::Printer()
{

}

