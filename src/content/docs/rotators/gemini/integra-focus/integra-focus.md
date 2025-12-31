---
title: GTD Integra85 Focusing Rotator
categories: ["rotators"]
description: GTD Integra85 Focusing Rotator
thumbnail: ./integra-focus.webp
---

## Features

The Integra 85 is a focusing rotator. It has a clear aperture of 85 mm, a backfocus of 69 mm, and a travel of 10 mm. The focusing function of the Integra85 is based on 3 fine pitch leadscrews running in special low friction nuts that provide high loading capacity up to 8 kg with a travel of 10 mm in 188600 0.05 micron steps. The rotator is using a traditional wormwheel, the 360 degrees is divided up in 61802 steps. The focuser has an autocalibration feature.

![20171120 screen1](https://indilib.org/images/20171120-screen1.png)

### Main Control tab

-   **Direction**: Focus IN or Focus OUT. IN decreases ticks count, OUT increases ticks count.
-   **Relative Position**: Set the number of steps from the current absolute position to move.
-   **Absolute Position**: Set the number of absolute steps.
-   **Abort Motion**: Stop any focus motor movement.
-   **Sensors**: Reading of the focuser temperature sensor.

### Presets tab

You may set pre-defined presets for common focuser positions in the  _Presets_  tab.

-   Preset Positions: You may set up to 3 preset positions. When you make a change, the new values will be saved in the driver's configuration file and are loaded automatically in subsequent uses.
-   Preset GOTO: Click any preset to go to that position

### Settings tab

-   **Max position**: The focuser and rotator maximum travel in steps.
-   **Home at Center**: This autocalibrates the focuser using a homing sensor and places the focuser in the center position at 94300 steps.

![20171120 screen6](https://indilib.org/images/20171120-screen6.png)

### Rotator tab

The rotator position can be controlled via either setting the absolute ticks count or angle. To change the current absolute position to a new position without moving the rotator, use  _Sync_  to set the new desired position. Once Sync is set, the current absolute position shall report the synced ticks.

-   **Goto (Angle)**: Rotate to the specified angle.
-   **Abort Motion**: Stop any rotator motor movement.
-   **Sync**: Synchronise the current position as the specified angle.
-   **Reverse**: Reverse angle direction.
-   **Goto (Ticks)**: Rotate to the specified tick count.