---
title: Pegasus Falcon V2
categories: ["rotators"]
description: INDI driver for the Pegasus Astro Falcon Rotator V2.
thumbnail: ./pegasus-falconv2.webp
---

The Pegasus Astro **Falcon Rotator V2** is a low-profile camera field rotator. The INDI driver moves it to an angle, syncs its position, reverses its direction and runs an experimental field derotation. For the first Falcon, see the [Pegasus Falcon](/rotators/pegasus-astro/falcon/falcon) page; it uses a different driver.

## Features

- GoTo an absolute angle (0–360°), Abort
- Sync the reported angle to a known value
- Reverse direction
- Motor speed
- Field derotation in arcseconds per second (experimental)
- Three preset positions
- Firmware version and firmware reload

## Installation

The driver is part of INDI core and needs no extra dependencies. To run it on its own:

```shell
indiserver -v indi_falconv2_rotator
```

## Connection

Connect the Falcon V2 by USB. On the **Connection** tab select its port, or click **Scan Ports**; the driver prefers ports whose name contains `Falcon`. On connection the driver reads the firmware version and the motor speed.

## Driver Controls

### Main Control

- **Goto:** move the rotator to an angle. 0° is the home position, where the camera is level.
- **Abort Motion:** stop the rotator.
- **Sync:** if the reported angle is wrong, set it to the correct observed value.
- **Reverse:** rotate in the opposite direction.
- **Derotation:** field derotation rate in **arcseconds per second**, −3600 to 3600; negative values rotate in reverse, 0 switches it off. This feature is experimental. The rate is not saved in the configuration, so derotation never starts by itself when the driver connects.
- **Speed:** motor speed in steps per second, 10 to 4500.
- **Firmware:** firmware version reported by the rotator.
- **Reload:** reboot the rotator and reload its firmware. The rotator does not answer while it restarts; reconnect afterwards.

### Presets

Up to three preset angles can be stored on the **Presets** tab. They are saved in the driver configuration; click a preset to move there.

## Operation

The angle reported by the driver is the mechanical rotation angle. It is not the [position angle](https://en.wikipedia.org/wiki/Position_angle) (PA) that plate solving reports. Clients such as Ekos map one to the other: once an image is solved, the PA is known and Ekos can turn the rotator to a requested PA.

A move counts as complete when the rotator has stopped near the target. If the rotator does not start, for example because the target is closer than its resolution, the driver reports the move as finished after 5 seconds.

## Troubleshooting

- **The rotator turns back and forth in Ekos:** check that **Reverse** in the driver matches the rotator direction set in Ekos, that **Derotation** is 0, and that the position angle tolerance in Ekos is not tighter than the rotator can reach.
- **The angle is off after a power cycle:** move to the home position, check that the camera is level, and use **Sync**.
- **Reload Firmware:** the connection drops while the rotator restarts. Disconnect and connect again.
