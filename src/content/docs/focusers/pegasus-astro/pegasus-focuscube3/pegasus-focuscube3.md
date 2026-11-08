---
title: Pegasus FocusCube 3
categories: ["focusers"]
description: INDI driver for the Pegasus Astro FocusCube 3 motor focuser.
thumbnail: ./pegasus-focuscube3.webp
---

The Pegasus Astro **FocusCube 3** is a motor focuser with a built-in temperature sensor. The INDI driver supports absolute and relative moves, sync, reverse, the backlash compensation of the firmware and the maximum motor speed. For the earlier FocusCube, see the [Pegasus FocusCube](/focusers/pegasus-astro/pegasus-focuscube/pegasus-focuscube) page.

## Features

- Absolute and relative moves, Abort
- Sync the position to a known value
- Reverse direction
- Backlash compensation in the firmware
- Maximum motor speed
- Temperature readout for temperature compensation in the client
- Firmware version

## Installation

The driver is part of INDI core and needs no extra dependencies. To run it on its own:

```shell
indiserver -v indi_pegasus_focuscube3
```

## Connection

Connect the FocusCube 3 by USB; the default baud rate is 115200. On the **Connection** tab select its port, or click **Scan Ports**; the driver prefers ports whose name contains `FocusCube`. The driver sends `##` and expects a reply containing `FC3`.

## Driver Controls

### Motion

- **Absolute Position:** move to a position in steps. The maximum position is 1317500.
- **Relative Position:** move in or out by a number of steps.
- **Abort Motion:** stop the focuser.
- **Firmware:** firmware version reported by the focuser.

A move is complete when the focuser has stopped at the target position. If it does not start, the driver reports the move as finished after 5 seconds.

### Settings and sensors

- **Max Position:** upper limit for moves.
- **Sync:** set the current position to a known value, for example 0 when the drawtube is fully in.
- **Reverse:** move in the opposite direction.
- **Backlash:** enable the compensation and set the backlash in steps. The value is stored in the focuser; the firmware applies it on every change of direction. When the firmware reports a backlash above 0, the driver shows the compensation as enabled.
- **MaxSpeed:** maximum motor speed, 100 to 1000 (default 400).
- **Temperature:** temperature from the built-in sensor, in °C. Ekos can use it for temperature compensation.

## Operation

- Set **Max Position** to the travel of your focuser, then use **Sync** to define the zero point.
- Determine the backlash once by hand: move outwards, then inwards in small steps until the star size starts to change, and enter the steps needed as **Backlash**.
- In Ekos, use either the backlash of the focuser or the AF Overscan of the focus module, not both.

## Troubleshooting

- If the driver cannot connect, check that no other program (for example Pegasus Unity) uses the port.
- If the focuser moves the wrong way, enable **Reverse** and sync the position again.
