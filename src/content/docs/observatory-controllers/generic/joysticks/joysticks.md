---
title: Joystick
categories: ["observatory-controllers"]
description: Joystick
thumbnail: ./joysticks.webp
---

INDI (v >= 0.9.7) supports game pads under Linux for input control. The INDI joystick driver (indi_joystick) queries the controller and provide the following properties:

-   **Joysticks**: Each joystick displays a normalized magnitude [0 to 1] and an angle. The angle is measured counter clock wise starting from the right/east direction [0 to 360]. They are defined as JOYSTICK_# where # is the joystick number.
-   **Axes**: Each joystick has two or more axes. Each axis has a raw value and angle. The raw value ranges from -32767.0 to 32767.0 They are defined as AXIS_# where # is the axis number.
-   **Buttons**: Buttons are either on or off. They are defined as BUTTON_# where # is the button number.

To snoop on buttons, call IDSnoopDevice("Joystick", "JOYSTICK_BUTTONS") from your driver.

Currently, INDI EQMod and all LX200 based driver support joystick input for basic motion control, slew speed selection...etc. In order to use the joystick, you need to run the telescope & joystick drivers simultaneously. For example:

`$ indiserver indi_lx200gps indi_joystick`

Alternatively, if you running from KStars, simply select your telescope driver and the joystick driver (found under auxiliary category) before you click  _Start Service_.

Once you connect your telescope, you may then enable the joystick input in your  _Options_  tab. Then a new tab  _Joystick_  will be created where you can map your telescope functions to joystick input. You can check which controls on your game pad correspond to INDI standard property names by checking the  _Monitor_  tab in your joystick driver. For example, below is a screenshot showing JOYSTICK_1, in addition to AXIS_1 and AXIS_2 as being active. Those are the names you can set in the  _Joystick_  tab in your telescope driver.
