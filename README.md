# LTC README

This is the LTC (Learn To Code) VSCode extension for programming education.

## Features

You can handle and create new arduino libraries with Devices setting panel. You can add descriptions to every method, and parameter. In the Device search panel there will be the summery about your components.
During the programming, your descriptions will guide the user through your methods. 

## Images

<img src="images/DeviceHandlerPage.png" width="800">
<img src="images/MainPage.png" width="800">
<img src="images/Device.jpg" width="800">

## Example - Reversing radar

In this example the task is to implement a reversing radar.
The built in rgb led lights up red if the measured distance is less then 20 cm and green otherwise.

<img src="images/Example.png" width="800">


## Requirements

This extension depends on the arduino and the cpp vscode extensions.

## Extension Settings

This extension contributes the following settings:

* `LTC.addArduinoLibrariesPath`: modify the Arduino Libraries Path
* `LTC.addArduinoProjectsPath`: modify the Arduino Projects Path

## Known Issues

Sometimes the Devices or the LTC buttons cause the extension to reload.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release.
