---
title: Baader SteelDrive
categories: ["focusers"]
description: Baader SteelDrive
thumbnail: ./baader-steeldrive.webp
---
## Features

The Baader Steeldrive motorfocus allows precise remote operation of the Steeltrack focuser. The transmission is performed by a belt system. You can control the focuser absolute & relative positions. You can set the temperature calibration and coefficient settings and enable/disable temperature compensation accordingly.


### Main Control Tab

-   Port: Set the name of the RS 232 port. The speed is fixed to 9600 baud.
-   Direction: Focus IN or Focus OUT.
-   Focus Speed: Set Focus speed 350 to 1000.
-   Focus Timer: Move the focuser at the current speed in the current direction for the specified time in milliseconds.
-   Relative Position: Set the number of steps from the current absolute position to move.
-   Absolute Position: Set the number of absolute steps.
-   Temperature: read out of the built in temperature sensor or the external temperature probe.

### Options

-   Acceleration Ramp.
-   Temperature Settings: Set # of samples and coefficient.

### Presets

You may set pre-defined presets for common focuser positions in the  _Presets_  tab.

-   Preset Positions: You may set up to 3 preset positions. When you make a change, the new values will be saved in the driver's configuration file and are loaded automatically in subsequent uses.
-   Preset GOTO: Click any preset to go to that position

## Operation

The INDI Baader SteelDrive driver provides complete functionality for all the features supported by Baader SteelDrive including relative and absolute positioning, temperature readout, preset and configuration parameters.