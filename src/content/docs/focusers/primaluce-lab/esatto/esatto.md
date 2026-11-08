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

### Environment

- **Temperature:** the motor sensor, and the external probe if one is connected. A value of -273.15 means there is no external probe.
- **Voltage in:** the 12 V and USB inputs.

## Operation

- Every ESATTO is calibrated in the factory. The driver does not start a calibration; use the PLAY software or the Virtual HandPad from PrimaLuceLab.
- PrimaLuceLab expects small changes of the step position after many autofocus runs on the Crayford-style 2", 3" and 4" models. If the focus position drifts by more than half of the travel, they recommend a new calibration. This is not backlash, and it does not require backlash compensation.

## Troubleshooting

- **A warning about the 12 V supply:** check the 12 V power supply (at least 1 A). Without it the focuser does not work correctly, even if USB is connected.
- **The external temperature stays at -273.15:** the optional probe is not connected or not detected.
