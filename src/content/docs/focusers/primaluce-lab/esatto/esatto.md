---
title: Esatto
categories: ["focusers"]
description: INDI driver for the PrimaLuceLab ESATTO robotic focusers.
thumbnail: ./esatto.webp
---

> [!WARNING]
> The Esatto focuser requires a 12V power input. USB alone is not enough: without 12V power, the focuser will not work correctly.

The PrimaLuceLab **ESATTO** is a family of robotic focusers with 2", 3" and 4" draw tubes and the low-profile 2" LP and 3.5" LP versions. This driver controls an ESATTO without a rotator. For an ESATTO with an ARCO rotator, use the [Esatto Arco](/focusers/primaluce-lab/esatto-arco/esatto-arco) driver.

## Features

- Absolute and relative moves, abort
- Backlash value stored in the focuser
- Motor temperature and optional external temperature probe
- 12 V and USB input voltage readout
- Serial number and firmware version

## Installation

The driver is part of INDI core and needs no extra dependencies. To run it on its own:

```shell
indiserver -v indi_esatto_focus
```

## Connection

Connect the focuser by USB and select its port on the **Connection** tab. The default baud rate is 115200.

## Driver Controls

### Main Control

- **Absolute Position / Relative Position:** move the draw tube in steps.
- **Max. Position:** the travel measured by the last calibration. It is read from the focuser and cannot be changed.
- **Backlash:** the value is stored in the focuser and read on connection.

### Options

- **Calibrate:** **Start** sets a new zero position at the focuser's inner sensor, as the ESATTO web interface does. Move the focuser fully in first: the driver only starts the calibration while the sensor is active, the focuser is in the inner half of its travel and not moving. It takes a few seconds; moves are refused until it is done. The calibration shows **Ok** only if the focuser counted it as complete, otherwise it shows an error. **Abort** stops the motor, but the zero position is no longer valid afterwards. Moves are then refused until a calibration has completed, started here or from the ESATTO web interface.

### Environment

- **Temperature:** the motor sensor, and the external probe if one is connected. A value of -273.15 means there is no external probe.
- **Voltage in:** the 12 V and USB inputs.

## Operation

- Every ESATTO is calibrated in the factory. The calibration on the **Options** tab only sets the zero position again (tested with an ESATTO 2" LP); a full calibration of the travel needs the PLAY software or the Virtual HandPad.
- PrimaLuceLab expects small changes of the step position after many autofocus runs on the Crayford-style 2", 3" and 4" models. If the focus position drifts by more than half of the travel, they recommend a new calibration. This is not backlash, and it does not require backlash compensation.

## Troubleshooting

- **Moves are refused with "The focuser reports a running calibration":** a calibration started from the web interface or the hand pad is still running, or one was aborted: the focuser keeps reporting it for about a minute. Wait, then calibrate again if it was aborted.
- **Moves are refused with "The position is not valid after an incomplete calibration":** a calibration was aborted or did not complete, so the zero position is off. Calibrate the focuser from the ESATTO web interface, which also works away from the sensor, or with **Calibrate** on the **Options** tab if the focuser is still fully in at its sensor. Afterwards it moves normally. The lock is kept only while the driver runs: restarting the driver lifts it, but does not correct the position.
- **Calibrate is refused with "moves are locked after an incomplete calibration":** the focuser is not at its sensor and cannot be moved there from the driver. Calibrate it from the ESATTO web interface.
- **A move in to a position close to the inner end stops at 0:** when moving in, the firmware first moves past the target by its backlash and then back. For a target closer to the inner end than that (about 816 steps on an ESATTO 2" LP, about 1900 on an ESATTO 2"), it goes to 0 instead. Approach such positions from 0 outward.
- **A warning about the 12 V supply:** check the 12 V power supply (at least 1 A). Without it the focuser does not work correctly, even if USB is connected.
- **The external temperature stays at -273.15:** the optional probe is not connected or not detected.
