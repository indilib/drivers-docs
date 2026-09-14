---
title: OAPA
categories: ["auxiliaries"]
description: INDI driver for OAPA, the open-source motorised polar alignment platform, with automatic correction in Ekos.
thumbnail: ./oapa.webp
---

OAPA (Open Automatic Polar Alignment) is an open-source motorised polar alignment platform. Two stepper motors turn the azimuth and altitude adjusters of an equatorial mount, so the polar alignment can be corrected without touching the knobs. The reference controller is an ESP32 board (FYSETC E4 with two TMC2209 drivers) running the open OAPA firmware. Any controller that speaks the same serial protocol works with this driver.

The driver implements the INDI **PAC (Polar Alignment Correction)** interface, so the Ekos Polar Alignment Assistant can measure the error and move the platform until the error is below the threshold you choose.

## Features

- Relative corrections in degrees on azimuth and altitude; both axes move in one command when they share the same speed
- Automatic correction loop in Ekos (KStars 3.8.2 or newer)
- A move is reported complete only when the platform is idle at the commanded target
- Abort (firmware 1.2.1 or newer)
- Speed per axis (50 to 3000 motor steps/s)
- Motor run and hold current per axis, sent on every connection because the controller forgets them at power-off
- Direction reverse per axis
- Platform position readout in degrees
- Safety: moves are refused until the platform is calibrated; a move that stalls, times out or stops short of its target is stopped and reported as an error

## Requirements

- INDI 2.2.0 or newer
- OAPA firmware **1.2.1 or newer** (1.2.2 recommended). Older firmware connects, but speed and Abort are ignored and the driver logs a warning.
- For automatic correction: KStars 3.8.2 or newer. The feature is marked preliminary in KStars.

## Installation

The driver is part of INDI core and needs no extra dependencies. Connect the controller by USB; it appears as `/dev/ttyUSB0` or `/dev/ttyACM0`.

To run it on its own:

```shell
indiserver -v indi_oapa
```

## Configuration

1. In the Ekos profile editor, select **OAPA** under Auxiliary.
2. In the INDI Control Panel, choose the port on the **Connection** tab and click **Connect**. The board resets when the port opens; the driver waits for it.
3. Set **Calibration** (steps per arcminute) for both axes. Until you do, every correction is refused. See [Calibration](#calibration) below.
4. Check the directions once, as described in [Direction check](#direction-check).

| Property | Meaning |
|----------|---------|
| Manual Adjustment | Relative move in **degrees**, range ±10. AZ positive = East, ALT positive = North. Example: `0.5` |
| Abort Motion | Stop both axes |
| Position | Platform position in degrees since power-on |
| Speed | Motor speed per axis in steps/s (default 1000) |
| Run Current (Motor tab) | Motor run current per axis in mA (default 600) |
| Hold Current (Motor tab) | Hold current per axis, in % of run current (default 25) |
| Azimuth / Altitude Reverse | Invert an axis if it moves the wrong way |
| Calibration | Motor steps per arcminute of correction, per axis |
| Firmware | Firmware version reported by the controller |

> [!NOTE]
> Manual Adjustment is in degrees, not steps. A value such as `1000` is out of range and is rejected.

## Calibration

Steps per arcminute depend on your mechanics. Typical values range from about 15 to about 1000. To measure one axis:

1. Run the Ekos Polar Alignment Assistant and note the error on that axis.
2. With a rough calibration value set, enter a known move in **Manual Adjustment**, for example `0.1` degrees.
3. Refresh the solution and note how much the error actually changed.
4. New value = old value × requested change ÷ measured change.

## Direction check

Before the first automatic run, enter `0.1` in the azimuth element of **Manual Adjustment** and confirm that the polar axis moves East. Then enter `0.1` in the altitude element and confirm that it moves North. If an axis goes the other way, enable the reverse switch for that axis.

## Automatic correction in Ekos

1. Open the **Align** module and start the **Polar Alignment Assistant**.
2. Enable automatic PAC correction.
3. Lower the success threshold. The default of 30 arcminutes stops the loop while the error is still large; a few arcminutes is a sensible target.
4. Start the procedure. Ekos measures the error, commands the correction, waits for this driver to report completion, and measures again until the error is below the threshold.

The Ekos loop was tested with a real OAPA board against the INDI Telescope and CCD simulators. Ekos commanded two corrections and reported success.

## Troubleshooting

**Every correction is refused.** The calibration is still 0. Set steps per arcminute for both axes.

**The platform moves the wrong way.** Enable the reverse switch for that axis and repeat the direction check.

**A move ends with an error.** The platform stopped short of the target, stopped moving for 3 seconds, or took longer than expected. Check the mechanics for binding and the motor current, then try again.

**Speed or Abort have no effect.** The firmware is older than 1.2.1. Update the controller firmware.

**Seeing the serial traffic.** Enable debug logging for the driver. Every command (`CMD`) and reply (`RES`) on the serial line is logged.
