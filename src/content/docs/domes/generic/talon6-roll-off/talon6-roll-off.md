---
title: Talon6 Roll Off
categories: ["domes"]
description: Talon6
thumbnail: ./talon6-roll-off.webp
---

## Features

Talon6 is a roll off roof control system for observatories automation. It has been used by several observatiories like e.g.  [E-eye](https://www.entreencinasyestrellas.es/)  in Spain that hosts more than 55 observatories with Talon6 Roll Off Roof solutions.

INDI driver has been tested with Talon6 **firmware version 3.07 only**. Please report any issue with other firmware version.

Version 2.0 (03-05-2019):

1.  Better integration with Dome parent class. No additional features.

Version 1.0 (21-04-2019):

1.  Enable / Disable Safety Conditions
2.  Sync absolute position (number of ticks)
3.  Roof Go To (open / close perc)
4.  Monitor Sensors and Conditions

Version 0.2 :

1.  Added Firmware version

Version 0.1, basic features only:

1.  Serial connection to the device
2.  Read Talon6 status data from device
3.  Park and UnPark the roof that corrisponds to Open and Close the roof.
4.  Stop roof motion

To Do:

1.  Roof control by snooped devices (mount / weather / scheduler)
2.  Internet down sensor

The Talon6 client application (currently available on Windows only) allows to set up the device e.g. manage timers and conditions for closing, motor setup, roof calibration etc.

This driver will not implement those features, you should use the client application for that.

## Operation

There are four tabs to control your device:

### Connection

![Talon6Connection](https://indilib.org/images/Talon6Connection.png)

Talon6 connects through  **Serial**  port only. Also, use  **9600**  as connection speed.

In the image above, a persistent port mapping has been used even though standard tty link works fine.

Once you have entered the connection parameters, press  **S****ave** under **Options**  tab.

### Main Control

![Talon6MainControl](https://indilib.org/images/Talon6MainControl.png)

You can open the roof by pressing  **UnPark** and close the roof pressing  **Park**. Note that Park behavior is affected by the Safety Conditions switch, see _Options_ below.

**Abort**  will stop the roof motion.

**GoTo**  will open the roof to the percentage inserted. 0% corrisponds to a fully closed position (0 absolute ticks), and 100% to a fully open position.

A different behavior could be enforced setting the maximum ticks to a lower value. Before using GoTo, input the correct ticks value in **Roof Max Travel** under _Options_  tab.

**Read**  will force a read on the device status data otherwise they are regularly updated.

Device status data:

1.  **Roof Status**  shows the actual roof status (OPEN, CLOSED, OPENING, CLOSING, ERROR).
2.  **Last Action**  lists the last action performed by the roof (_none_,  _open by user_,  _close by user_,  _go to by user_,  _calibrate by user_,  _close due to cloud- rain condition_,  _close due to power down_,  _close due to communication lost_,  _close due to internet lost,_  _close due to timeout expired_,  _close by management_,  _close by automation_, _stop -- motor stalled_, _emergency stop_,  _Order the mount to park_).
3.  **Current Position Ticks:** is the absolute position in roof encoder ticks.
4.  **Current position %:**  is the absolute position in percentage 0%-100%.
5.  **Power supply**  is the tension supplied in Volts.
6.  **Closing Timer**. When the countdown reaches zero value the controller will order to park the mount and close the roof (it has to be set on the client application).
7.  **Power lost timer**. If the power is not is restored before the time specified in the text window the controller will order to park the mount and close the roof. This feature works if you have a UPS system. Of course, the sensor has to be connected before the UPS
8.  **Weather Condition Timer**  if a weather condition alert is triggered and remains active for the time specified, the controller will order to park the mount and close the roof. Waiting for the specified time can prevent a premature closing due to some momentary instability, as a group of loose clouds, etc..
9.  **Firmware Version:** the Talon6 firmware version read from the device.

### Options

![Talon6Options](https://indilib.org/images/Talon6Options.png)

In this tab you can find configuration features for your device.

**Polling**: time interval in ms to poll data from the device.

**Max Roof Travel**: allows to set the max travel of the roof as device encoder ticks. It is recommended that the first time you use this driver, you manually fully open the roof and read the ticks number corrisponding to that position and enter it here. This syncs the absolute encoder ticks to 100%. You can then use **GoTo**  in _Main_  _Control_ to partially open the roof.

Only 100% is synced to a position. 0% always corrisponds to 0 ticks.

**Safety Conditions:**  it is strongly recommended to always leave Safety Conditions enabled when using the observatory in automated or unattended  mode! Also, test all conditions yourself before using.

Disabling Safety Conditions allows to control manually the roof. E.g. closing the roof without waiting for mount to park. This can obviously damage your equipment and you take full responsibility for using it.

Talon6 user manual describes how the Safety Condition affects the behavior of the roof motion, please refer to it for further information.

### Sensor and Switches

![Talon6Sensors](https://indilib.org/images/Talon6Sensors.png)

Sensors and Switches tab reports the status of sensors and switches from the device.

As an example, in the image above, the mount is parked (MaP) and the roof is closed (RCL).

Refer to the Talon6 user manual for a description of sensors, switches and conditions.