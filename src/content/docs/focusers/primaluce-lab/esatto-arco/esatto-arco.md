---
title: Esatto Arco
categories: ["focusers", "rotators"]
description: INDI driver for a PrimaLuceLab ESATTO focuser with an ARCO camera rotator.
thumbnail: ./esatto-arco.webp
---

This driver controls a PrimaLuceLab **ESATTO** robotic focuser together with an **ARCO** camera rotator connected to it. The focuser and the rotator appear as one INDI device. For an ESATTO without a rotator, use the [Esatto](/focusers/primaluce-lab/esatto/esatto) driver.

## Features

- Focuser: absolute and relative moves, abort, backlash stored in the focuser, backlash measurement
- Rotator: GoTo by angle or by steps, sync, abort, reverse, calibration
- Motor temperature and optional external temperature probe
- 12 V and USB input voltage readout, motor speed, serial numbers and firmware version

## Installation

The driver is part of INDI core and needs no extra dependencies. To run it on its own:

```shell
indiserver -v indi_esattoarco_focus
```

## Connection

Connect the ESATTO by USB and select its port on the **Connection** tab. The default baud rate is 115200. The ARCO is powered through the ESATTO, so the ESATTO needs a 12 V supply of at least 1 A; USB power alone may not be enough to rotate.

The driver enables the ARCO when it connects. If the ARCO was disabled before, the driver warns that it has to be calibrated.

## Driver Controls

### Main Control

- **Absolute Position / Relative Position:** move the draw tube in steps.
- **Max. Position:** the travel measured by the last calibration. It is read from the focuser.
- **Motor Speed:** updated during a move.
- **Backlash:** **Start** begins a measurement. Move the focuser until the focus changes and press **Next**, move in the opposite direction until the focus changes again, then press **Next** to store the result in the focuser.

### Rotator

- **Angle:** the rotator angle in degrees.
- **Goto:** the rotator position in steps.
- **Sync:** set the current position to a given angle.
- **Reverse:** handled by the driver, not by the rotator firmware.
- **Calibrate:** starts the ARCO calibration.

### Environment

- **Temperature:** the motor sensor, and the external probe if one is connected. A value of -273.15 means there is no external probe.
- **Voltage in:** the 12 V and USB inputs.

## Operation

- Calibrate the ARCO after enabling it, and again if it was rotated mechanically relative to the focuser. The calibration makes a full 360° rotation, so make sure the cables can follow it before you start.
- The ARCO has a resolution of one arc second per step.

## Troubleshooting

- **The rotator does not move or clicks:** check the 12 V supply first. If the power is fine, the manual describes how to adjust the worm gear.
- **A warning that the ARCO has to be calibrated:** run **Calibrate** on the **Rotator** tab.
