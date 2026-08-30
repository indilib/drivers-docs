---
title: Proxisky UMi
categories: ["mounts"]
description: Vendor-specific control for Proxisky UMi mounts (UMi17X, UMi20S and relatives), built on LX200 OnStep.
thumbnail: ./umi.webp
---

## Overview

[Proxisky](https://www.proxisky.com) UMi mounts (UMi17X, UMi20S and relatives) are compact
strain-wave star trackers / GoTo mounts. They run **OnStep-derived firmware**, so all standard
telescope behavior — slewing, tracking, guiding, parking, alignment, meridian flips, and the
focuser/rotator interfaces — is exactly OnStep's and is handled by INDI's `LX200 OnStep` driver.

`indi_lx200_proxisky` is a thin subclass of `LX200 OnStep`. It adds only the vendor-specific
commands that Proxisky layered on top of OnStep and that stock OnStep does not implement: travel
limits, the anti-collision system, servo PID gains, and a handful of board settings.

> [!NOTE]
> If you are looking for how to slew, track or guide, the standard OnStep driver documentation
> applies unchanged. This page covers only what the Proxisky layer adds on top.

## Features

Everything below appears on one of four **Proxisky** tabs in the INDI Control Panel. Each control
is published **only if the mount answers the corresponding query**, so the panel reflects what your
particular model and firmware actually support.

-   **Model / firmware** report, e.g. `UMi20S|1.0.6`
-   **RA travel limits** — left/right rotation limits in degrees, plus an enable switch
-   **Dec travel limits** — CCW/CW limits in degrees, plus an enable switch
-   **Anti-collision (ACS)** — enable, per-axis sensitivity thresholds, collision counters, counter reset
-   **Servo PID gains** — four gains per axis (angle Kp/Ki, speed Kp/Ki) for RA/Azm and Dec/Alt
-   **Supervised GOTO** — enable plus a tolerance in degrees
-   **Supervised Home** and **Dec second home** enable switches
-   **Status LED** on/off
-   **Auto tracking** and **power-loss memory** switches
-   **ASIAIR homing** compatibility behavior

## Installation

The driver ships with INDI core - there is nothing extra to build and no dependencies beyond INDI
itself. No additional udev rules are needed; UMi mounts present themselves through a standard
USB-serial adapter.

```shell
indiserver -v indi_lx200_proxisky
```

In KStars/Ekos, choose **Proxisky › UMi** in the profile editor.

> [!IMPORTANT]
> The `Proxisky › UMi` catalogue entry previously launched the generic `LX200 OnStep` driver under
> the device name `LX200 OnStep`. It now launches `indi_lx200_proxisky` under the device name
> `Proxisky UMi`. Since INDI keys saved settings by device name, existing users need to re-select
> the port and re-save their configuration and park position on first connect. Nothing is deleted,
> and selecting `LX200 OnStep` manually still works, but exposes no vendor controls.

## Configuration

### Connection

Serial at **9600 baud, 8N1** is the default and matches what the mount uses; leave the baud rate
unchanged unless you have a specific reason to alter it. TCP/IP is also supported, inherited from
`LX200 OnStep`, for network-attached mounts.

Connect as usual from the **Main Control** tab. Vendor detection runs once during connect and adds
roughly a second on serial.

### The Proxisky tabs

| Tab | Contents |
|---|---|
| **Proxisky Settings** | Model, Status LED, Auto Tracking, Power-loss Memory, ASIAIR Homing, Supervised Home, Dec Second Home |
| **Proxisky Limits** | RA and Dec travel limits and their enable switches |
| **Proxisky ACS** | Anti-collision enable, sensitivity, collision counters, counter reset |
| **Proxisky Advanced** | Supervised GOTO and tolerance, RA/Azm and Dec/Alt PID gains |

> [!WARNING]
> The travel-limit fields (Left/Right, CCW/CW) use the vendor's own terms, taken directly from the
> Proxisky Windows tool. Nothing in the protocol maps them to East/West or to any sky direction, and
> the mapping may differ between mount models and between EQ and Alt-Az configurations. Determine
> empirically which way each limit points before relying on it, with the mount somewhere safe and
> nothing attached that can collide.

### Value ranges

The driver enforces the same ranges as the vendor's own tool:

| Setting | Range |
|---|---|
| RA limits (left, right) | 1 – 180° |
| Dec limits (CCW, CW) | 90 – 200° |
| ACS threshold, RA | 10 – 59999 |
| ACS threshold, Dec | 100 – 59999 |
| Supervised GOTO tolerance | 5 – 30° |
| PID angle Kp/Ki, speed Kp | 11 – 1999 |
| PID speed Ki | 11 – 80 |

These come from the vendor tool's validation, not the firmware - an in-range value can still be
refused by the mount. Every write is read back and verified: if the mount refuses or stores
something different, the property turns red (`Alert`) and the log explains what the mount actually
holds.

## Usage & Tips

### Settings that need a power cycle

Some settings are stored immediately but only take effect at the next power-up. For these the
property still turns green (`Ok`) since the write itself succeeded, and the log message notes that
a power cycle is required.

**Needs a power cycle:** Status LED, Auto Tracking, both PID vectors.

**Effective immediately:** Power-loss Memory, ASIAIR Homing, Supervised Home, Dec Second Home,
Supervised GOTO, RA/Dec limit enables, ACS enable and thresholds.

### PID gains

Changing PID gains is a genuine servo-tuning operation and can leave the mount unable to track if
set incorrectly. Write down the existing values before changing them.

-   The driver refuses to write while the mount is moving - the commit command restarts the axis,
    so writes are only accepted with the mount idle or parked.
-   After a commit, the axis restart makes the mount briefly report all four gains as zero (roughly
    70 ms). The driver waits this out before verifying, so this does not show up as a mismatch.

Gains take effect after a power cycle.

### If a control is missing

Most of this protocol has no capability query - the only way to find out whether a mount supports a
feature is to ask for its current value and see whether anything comes back. Detection runs once,
at connect, with one retry per query.

> [!TIP]
> If a control you expect is absent, disconnect and reconnect to re-run detection. The log records
> every feature that stayed silent at `Warning` level. If a control is consistently absent across
> reconnects, your mount or firmware genuinely does not have it.

### Supervised Home may be refused

On at least some UMi20S firmware, the mount answers the Supervised Home query (so the control is
published) but refuses every attempt to change it. This is expected: the driver reports the refusal
and reverts the switch to what the mount still holds - there is nothing to fix on the INDI side.

### Simulation mode

Simulation mode exposes no Proxisky properties, by design - every vendor property mirrors a value
read back from real hardware, and there is nothing to read in simulation. You get the standard
OnStep simulated telescope and nothing else.

### Do not mix up the two drivers

A UMi will connect and work under the generic `LX200 OnStep` driver, but with none of the vendor
controls and no indication in the UI that they exist. If your Proxisky tabs are missing entirely,
check which driver your profile actually selected. Conversely, do not select `Proxisky UMi` for a
non-Proxisky OnStep mount - the vendor commands are meaningless to stock OnStep firmware.

### Logging

To see the raw vendor exchange, enable debug output on the **Options** tab, or:

```shell
indi_setprop 'Proxisky UMi.DEBUG.ENABLE=On'
indi_setprop 'Proxisky UMi.DEBUG_LEVEL.DBG_DEBUG=On'
```

Note that `indiserver -v` does not relay driver messages to its own output - they go to connected
clients. Read them in the KStars INDI log window, or with a client such as `indi_getprop`.

## Tested Against

| | |
|---|---|
| Mount | Proxisky UMi20S |
| Firmware | 1.0.6 |
| Transport | Serial, 9600 8N1 |

All 19 vendor properties, every write path, the refusal and out-of-range paths, and connect /
reconnect / disconnect were exercised against this hardware. TCP transport and models other than the
UMi20S are supported by the same code but have not been tested on hardware.

## Issues

There are no known bugs for this driver. If you found a bug, please report it at INDI's GitHub
[Issues](https://github.com/indilib/indi/issues) page.
