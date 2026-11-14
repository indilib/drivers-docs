---
title: Pegasus Falcon V2
categories: ["rotators"]
description: INDI driver for the Pegasus Astro Falcon Rotator V2.
thumbnail: ./pegasus-falconv2.webp
---

The Pegasus Astro **Falcon Rotator V2** is a low-profile camera field rotator. The INDI driver moves it to an angle, syncs its position, reverses its direction, runs a field derotation and sets up its WiFi, so the Pegasus Unity Platform is not needed. For the first Falcon, see the [Pegasus Falcon](/rotators/pegasus-astro/falcon/falcon) page; it uses a different driver.

## Features

- GoTo an absolute angle (0–360°), Abort
- Sync the reported angle to a known value
- Reverse direction
- Motor speed
- Cable limit on or off, with a warning when a move takes the long way round
- Field derotation in arcseconds per second
- Three preset positions
- WiFi hotspot and WiFi client settings, network scan
- Connection by USB or over WiFi (TCP)
- Firmware version and firmware reload

## Installation

The driver is part of INDI core and needs no extra dependencies. To run it on its own:

```shell
indiserver -v indi_falconv2_rotator
```

## Connection

**USB:** on the **Connection** tab select the port, or click **Scan Ports**; the driver prefers ports whose name contains `Falcon`.

**WiFi:** once the Falcon V2 is in your network (see [WiFi](#wifi)), select **Network** on the **Connection** tab. The address defaults to `falcon2.local`, the name the rotator announces in the network, and the port to 9999. The rotator asks for its **hotspot password** first, which you enter as **TCP Password** on the same tab; the factory password is `12345678`. With a wrong password the rotator closes the connection and the driver reports a failed login.

On connection the driver reads the firmware version, the motor speed, the cable limit and the WiFi settings.

## Driver Controls

### Main Control

- **Goto:** move the rotator to an angle. 0° is the home position, where the camera is level.
- **Abort Motion:** stop the rotator.
- **Sync:** if the reported angle is wrong, set it to the correct observed value. This also shifts the cable limit, see [Rotation range and cable limit](#rotation-range-and-cable-limit).
- **Reverse:** rotate in the opposite direction.
- **Derotation:** field derotation rate in **arcseconds per second**, −3600 to 3600; negative values rotate in reverse, 0 switches it off. Derotation is only needed on an alt-az mount. The rate is not saved in the configuration, so derotation never starts by itself when the driver connects; older configurations with a derotation interval are ignored.
- **Speed:** motor speed in steps per second, 10 to 4500. At 4500 the rotator turns about 2.25° per second.
- **Cable Limit:** keeps the rotation within the range described below. The rotator stores this setting itself. Only switch it off if your cables can follow any number of turns.
- **Firmware:** firmware version reported by the rotator.
- **Reload:** reboot the rotator and reload its firmware. The rotator does not answer while it restarts; reconnect afterwards.

### Presets

Up to three preset angles can be stored on the **Presets** tab. They are saved in the driver configuration; click a preset to move there.

### WiFi

The **WiFi** tab sets up the WiFi of the rotator. The rotator stores all of these settings itself.

- **Hotspot:** switch the hotspot of the rotator on or off.
- **Hotspot Credentials:** SSID and password of the hotspot. The password is also the login for TCP and for the web dashboard (user `admin`), so the driver copies it to **TCP Password** when you change it.
- **WiFi Channel:** hotspot channel, 1 to 11. Channels 1, 6 and 11 do not overlap.
- **Current WiFi:** the network the rotator is connected to, with its IP address and signal strength.
- **Scan Networks:** list the networks in range, each with its best signal. The WiFi radio is only on while the hotspot is enabled or the rotator is connected to a network.
- **WiFi Credentials** and **Connect to WiFi:** join a 2.4 GHz network. The rotator connects within a few seconds and keeps trying every 10 seconds; the driver reports the result after 10 seconds. It reconnects to this network after every restart.

> [!CAUTION]
> As long as the hotspot uses the factory password `12345678`, anyone in range can control the rotator over WiFi. The driver warns about this when you enable the hotspot. Change the password under **Hotspot Credentials**.

## Rotation range and cable limit

With **Cable Limit** enabled (the default), the rotator turns up to 220° clockwise and up to 220.1° anticlockwise from 0°. Every angle therefore has exactly one rotator position: angles from 0° to 220° lie on one side, angles from 220° to 360° on the other. A move whose short way would cross 220° goes the long way round instead:

| Move | Short way | Actual move |
|------|-----------|-------------|
| 240° → 220° | 20° | 340°, about 2.5 minutes |
| 210° → 347.8° | 138° | 222° |

To an observer this looks like an endless rotation. The driver warns in the log once such a move is clearly under way: *Rotator takes the long way round to 220.00 (340 instead of 20 degrees), because the short way would cross the cable limit.*

> [!WARNING]
> The limit applies to the **reported** angle. **Sync**, which Ekos uses after plate solving, therefore shifts the whole range on the rotator. Pegasus asks for cables that allow half a rotation, but after a sync a single move can turn the rotator by up to a full turn. Route the cables for a full turn, or keep the rotator angle close to the value it had when you routed them.

If the rotator loses power during a move, it reports the last synced angle afterwards instead of its real position. Sync it again, for example with plate solving.

## Operation

The angle reported by the driver is the mechanical rotation angle. It is not the [position angle](https://en.wikipedia.org/wiki/Position_angle) (PA) that plate solving reports. Clients such as Ekos map one to the other: once an image is solved, the PA is known and Ekos can turn the rotator to a requested PA.

A move counts as complete when the rotator has stopped near the target. If the rotator does not start, for example because the target is closer than its resolution, the driver reports the move as finished after 5 seconds. After **Abort Motion**, the rotator is reported as stopped right away.

## Troubleshooting

- **The rotator turns for minutes in one direction:** the move goes the long way round because of the cable limit; see [Rotation range and cable limit](#rotation-range-and-cable-limit).
- **The rotator turns back and forth in Ekos:** check that **Reverse** in the driver matches the rotator direction set in Ekos, that **Derotation** is 0, and that the position angle tolerance in Ekos is not tighter than the rotator can reach.
- **The angle is off after a power cycle:** move to the home position, check that the camera is level, and use **Sync**.
- **No connection over WiFi:** check **Current WiFi** over USB, and that the computer resolves `falcon2.local`; otherwise enter the IP address shown there. A failed login means that **TCP Password** is not the hotspot password.
- **Reload Firmware:** the connection drops while the rotator restarts. Disconnect and connect again.
