---
title: DeepSkyDad AF3
categories: ["focusers"]
description: DeepSkyDad AF3
thumbnail: ./deep-sky-dad-af3.webp
---

## Features

DeepSkyDad AF3 is based on customer feedback and our experience with AF1/AF2. It contains newer technology, boasting a stealth drive feature for minimal noise and vibration. Apart from the smoother motion, it also provides more accurate movement with microstepping down to 1/256. Enclosure was also optimized for easier assembly, but of course retained backward compatibility with every existing adapter. AF3 is also ASCOM/INDI compatible, just like AF1 and AF2.

### Main Control Tab

-   **Direction**: Focus IN or Focus OUT. IN decreases ticks count, OUT increases ticks count. Selecting this controls the direction of the  **Relative Position**  property below.
-   **Relative Position**: Set the number of steps from the current absolute position to move.
-   **Absolute Position**: Set the number of absolute steps.
-   **Sync**: Set the current focus position as the entered position.
-   **Reverse Motion**: reverse direction of the motor, if focus in/focus out are reversed in relation to the focuser physical movement(depends on how the autofocuser is mounted).
-   **Max. movement**: maximum position change in a single movement (in steps).

![](https://indilib.org/media/com_mtree/images/listings/o/208.png)![](https://stellarmate.com/media/com_mtree/images/listings/o/208.png)

### Presets

You may set pre-defined presets for common focuser positions in the  _Presets_  tab.

-   Preset Positions: You may set up to 3 preset positions. When you make a change, the new values will be saved in the driver's configuration file and are loaded automatically in subsequent uses.
-   Preset GOTO: Click any preset to go to that position

## Connection

Connect to the focuser using a micro USB cable. The connection type is serial and by default the port is set to /dev/ttyACM0. The default baud rate is 115200. If you change the default port, save the changes by going to the  **Options**  tab and click  _Save_  configuration.

## Operation

After establishing connection to the focuser, you can use the focuser control in the INDI control panel directly to move and sync the focuser. Alternatively, the focuser can be used in any INDI compatible autofocusing application.

## Options

The options tab provides several settings to tune the operation and performance of the focuser:

-   **Step size**  - supports step sizes from 1 to 1/256. For most applications, step size of 1/2 or 1/4 should suffice.
-   **Speed mode**  - speed of the motor, available options: Very slow, Slow, Medium, Fast and Very fast. Defaults to Slow.
-   **Settle buffer**  - if your focuser has any play, this can affect the autofocuser performance. SGPro for example goes aways from current position and than starts traversing back. When it changes focus direction (traverse back), focuser play can cause FOV to jiggle just a bit, which causes enlongated stars on the next exposure. Settle buffer option returns IsMoving as TRUE for specified time after focuser reaches target position, letting it to settle a bit. This only works well from SGPro version 3.0.0 beta and later.
-   **Move current multiplier (%)**  - % of the maximum motor current used during the movement
-   **Hold current multiplier (%)**  - % of the move motor current, used when motor is not moving (Used equation: I_hold = Hold_current_multi_% * I_move * 0.8)