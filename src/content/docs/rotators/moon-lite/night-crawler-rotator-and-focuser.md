---
title: Nightcrawler
category: rotator
description: Nightcrawler
thumbnail: /images/rotators/night-crawler-rotator-and-focuser/night-crawler-rotator-and-focuser.webp
---

## Features

MoonLite’s NiteCrawler models are a fully electronic focuser that uses fly by wire control technology for very accurate positioning in both focus and rotation. The patented design is intended for remote automation of large heavy imaging instruments providing extreme position accuracy that is repeatable down to .26 Microns. You can control the focuser absolute & relative position, in addition to the rotator position and angle and auxiliary focuser, if one is attached. All motors are fully controllable from within the driver.

![features](/images/rotators/night-crawler-rotator-and-focuser/features.webp)

### Main Control Tab

- **Direction**: Focus IN or Focus OUT. IN decreases ticks count, OUT increases ticks count.
- **Relative Position**: Set the number of steps from the current absolute position to move.
- **Absolute Position**: Set the number of absolute steps.
- **Sync**: Set the current focus position as the entered position.
- **Temperature & Voltage**: read out of the built in temperature sensor or the external temperature probe.

### Presets

You may set pre-defined presets for common focuser positions in the Presets tab.

- Preset Positions: You may set up to 3 preset positions. When you make a change, the new values will be saved in the driver's configuration file and are loaded automatically in subsequent uses.
- Preset GOTO: Click any preset to go to that position

## Operation

The INDI NightCrawer driver provides complete functionality for all the features supported by MoonLite including relative and absolute positioning, temperature readout, rotator control, auxiliary control, preset and configuration parameters.

![NightCrawler Rotator](/images/rotators/night-crawler-rotator-and-focuser/rotator.webp)

### Rotator Control
The rotator position can be controlled via either setting the absolute ticks count or angle. To change the current absolute position to a new position without moving the rotator, use Sync to set the new desired position. Once Sync is set, the current absolute position shall report the synced ticks. Depending on your specific NightCrawler model, each has specific maximum steps (ticks):

- WR25 374,920 steps per revolution
- WR30 444,080 steps per revolution
- WR35 505,960 steps per revolution

![NightCrawler Settings](/images/rotators/night-crawler-rotator-and-focuser/settings.webp)

### Limit Switches

Limit switches indicate when you close to the limit to motors range of motion. When the limit switch state is <font color="green">Green</font>, then the motor is not close to the limit switch, and when it turns <font color="red">Red</font>, then it is close to the switch limit:

- **Rotator Home**: Switch actuated when rotator is close to the home position.
- **Focus Out Limit**: Switch actuated when focuser is nearly fully extended out.
- **Focus In Limit**: Switch actuated when focuser is nearly fully retracted.

### Homing

Nightcrawler supports homing the focuser, rotator, and auxiliary axis in the Settings tab. To select which axis to home, check the desired axes in the Home Select property. Once done, click Start to initiate the process. Homing returns all motors to their zero home position. Depending on the current position of the rotator and focuser, it might take up to 10 minutes before such process is complete. While homing is active, you cannot issue any commands and must wait until the process is over.
