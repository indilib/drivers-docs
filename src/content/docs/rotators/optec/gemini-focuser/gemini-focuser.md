---
title: Optec Gemini Focusing Rotator
categories: ["rotator"]
description: Optec Gemini Focusing Rotator
thumbnail: ./gemini-focuser.webp
---

## Features

Optec's Gemini Focusing Rotator is a low-profile yet heavy duty focuser/rotator that operates by way of a rotating drawtube. It operates as both a focuser and rotator as an absolute device to guarantee repeatability of positioning. Very fine-grained control is possible, with the focuser providing a resolution of 0.11 microns per step and the rotator operating at 600 steps per degree. The integrated temperture compensation capability allows the user to account for temperture varation during the imaging session without a need to focus. The Gemini can be operated over IP via ethernet connection or through a serial port.

More information is available on the Optec website  [here](http://optecinc.com/astronomy/catalog/gemini/19750.htm).

### Main Control Tab (Focuser)

-   **Connection**: Controls the driver connection to the Gemini.
-   **Direction**: Focus IN or Focus OUT. IN decreases ticks count, OUT increases ticks count.
-   **Relative Position**: Set the number of steps from the current absolute position to move. Click "Set" to apply the change.
-   **Absolute Position**: Set the number of absolute steps. Click "Set" to apply the change.
-   **Abort Motion:**  Aborts movement of the focuser (not the rotator).
-   **Temperature:**  Current temperature measured by the Gemini temperture compensation probe.
-   **Goto:**  Causes the focuser to go to the center of travel or home itself. Center of travel for the Gemini is 57600 ticks. If homing the Gemini focuser home itself then return to the position from which it started (e.g. 41000 ticks).

![gemini main control](https://indilib.org/images/gemini_main_control.png)

### Presets Tab (Focuser)

You may set pre-defined presets for common focuser positions in the  _Presets_  tab.

-   Preset Positions: You may set up to 3 preset positions. When you make a change, the new values will be saved in the driver's configuration file and are loaded automatically in subsequent uses.
-   Preset GOTO: Click any preset to go to that position

![gemini presets](https://indilib.org/images/gemini_presets.png)

### Rotator Tab

-   **Goto:**  Allows control of the rotator postion by setting the position in absolute ticks. Home is 45000 ticks. Click "Set" to apply the change.
-   **Angle**: Allows setting the rotator position by setting the desired position angle. 360.00 degrees is home. Click "Set" to apply the change.
-   **Abort Motion:** Aborts movement of the rotator (not the focuser).
-   **Goto:** Causes the rotator to go to the center of travel or home itself. Center of travel for the Gemini rotator is 107999 ticks. If homing the Gemini rotator home itself to 45000 ticks (360.00 degrees) and stay there.
-   Backlash Compensation Settings: Allows for control of the backlash compensation capability in the rotator.
-   **Reverse:**  Reverses the direction of position angle change requests.

![gemini rotator](https://indilib.org/images/gemini_rotator.png)