---
title: IKun Focuser
categories: ["focusers"]
description: INDI driver for EFucoser electronic focuser (ESP8266/Arduino Nano, ULN2003/STEP-DIR)
thumbnail: ./ikun-focuser.webp
---

## Overview

IKun Focuser is the native INDI driver for the open-hardware EFucoser electronic
focuser controller. It supports the following hardware combinations:

| Controller | Minimum Firmware | Motor Driver | Connection |
|---|---|---|---|
| ESP8266 | 1005 | STEP/DIR | USB serial, TCP |
| ESP8266 | 1103 | ULN2003 | USB serial, TCP |
| Arduino Nano | 1201 | ULN2003 | USB serial |

## Features

- Absolute and relative positioning
- Abort and position synchronization
- Configurable maximum travel
- Direction reversal
- Motor hold control
- Temperature reporting (DS18B20)
- Firmware and controller identification
- Serial (9600-8-N-1) and raw TCP (port 4030) connections via INDI plugins

## Installation

When included in an INDI release, install the package containing INDI core
drivers. To test before release:

```bash
indiserver -vv indi_ikun_focuser
```

## Connection

### Serial
1. Connect the controller via USB.
2. Select the port in the Connection tab.
3. Baud rate is fixed at 9600.

### TCP (ESP8266 only)
1. Connect to the controller's Wi-Fi AP (`Focuser-<chipid>`, password `012345678`).
2. Select TCP, enter `192.168.4.1` and port `4030`.

## Ekos Usage

1. Add **IKun Focuser** to an Ekos profile.
2. Open the control panel and select Serial or TCP.
3. Configure max travel, speed, acceleration, reverse, and hold.
4. Verify movement with small step counts before autofocus runs.

## Troubleshooting

**Connection fails:** Verify serial port / TCP address, firmware version, and
`dialout` group membership.

**Motor does not move:** Confirm external 12V power, shared ground, and correct
firmware for your motor driver type. Reduce speed if stalling.

**Position drift:** Enable Motor Hold. Toggle Reverse if direction is wrong.

## Support

Firmware, wiring, protocol, and issue tracking:
[https://github.com/Indigo2233/EFocusor](https://github.com/Indigo2233/EFocusor)
