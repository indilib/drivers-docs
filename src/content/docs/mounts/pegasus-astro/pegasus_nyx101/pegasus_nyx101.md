---
title: Pegasus NYX-101
categories: ["mounts"]
description: INDI driver for the Pegasus Astro NYX-101 and NYX-88 harmonic drive mounts.
thumbnail: ./pegasus_nyx101.webp
---

The Pegasus Astro **NYX-101** is a harmonic drive mount that can run in equatorial (GEM) or alt-azimuth mode. The INDI driver uses the LX200-based command set of the mount. The **NYX-88** uses the same driver and is listed under its own name in the driver list.

## Features

- GoTo, Sync, Abort, manual motion
- Park and unpark, go home and set home
- Tracking on/off with sidereal, lunar, solar and King rate
- Pulse guiding with guide rates 0.25×, 0.5× and 1× sidereal
- Pier side readout and manual pier flip
- Equatorial (GEM) or alt-azimuth mount type
- Elevation limits, meridian limit and custom safety limits
- Refraction correction on/off
- Time and location are sent to the mount
- Reboot of the mount controller
- Status tab with the raw mount status for diagnosis

## Installation

The driver is part of INDI core and needs no extra dependencies. To run it on its own:

```shell
indiserver -v indi_lx200_pegasus_nyx101
```

## Connection

Connect the mount by USB and select its port on the **Connection** tab. The default baud rate is 115200.

## Driver Controls

### Main Control

- **Park / Unpark:** after an unpark request the driver waits up to 10 seconds for the mount to report that it is unparked before it accepts a parked status again. An unpark done with the hand controller or the Pegasus app is detected as well.
- **Home:** go to the home position, or set the current position as home.
- **Pier Side:** **Flip** asks the mount to move to the other side of the pier. The current side is shown in the pier side property of the mount.
- **Elevation Limit:** lowest (**Horizon**, −30° to 0°) and highest (**Overhead**, 60° to 90°) altitude limit of the mount.
- **Meridian Limit:** meridian limit of the mount in degrees (±120).
- **Custom Limits:** **Set** stores a custom safety limit in the mount, **Clear** removes it.
- **Refraction:** switch the refraction correction of the mount on or off.
- **Reboot:** restart the mount controller.

### Motion Control

- **Mount Type:** **GEM** for equatorial use or **ALTAZ** for alt-azimuth use. The mount is switched to the selected mode.
- **Track Mode:** Sidereal, Solar, Lunar or King.
- **Slew Rate:** speed for manual motion.

### Settings

- **Guide Rate:** guide rate in multiples of the sidereal rate, as the standard properties `GUIDE_RATE_WE` and `GUIDE_RATE_NS`. The NYX-101 has one guide rate for both axes and supports 0.25, 0.50 and 1.00 only; other values are rounded to the nearest of these and applied to both axes. The current rate is read from the mount on connection.

> [!TIP]
> PHD2 reads the guide rate from the driver and warns when it changes after a calibration. Recalibrate after changing the guide rate.

### Status

- **Report:** the raw reply of the mount status query `:GU#`.
- **Verbose:** when on, the individual status flags (tracking, slew complete, parked, at home, pier side, refraction, …) are shown as separate fields.

## Operation

- Set the mount type before the first GoTo. The driver remembers it and sets the pier side capability accordingly when it starts.
- For autoguiding, use pulse guiding and select the guide rate on the **Settings** tab.
- For the Ekos Polar Alignment Assistant, the mount may be parked: Ekos unparks it before the first rotation.

## Troubleshooting

- **Motion commands are refused with "Please unpark the mount":** the driver still considers the mount parked. Unpark it in the Mount tab of Ekos and check that the mount reports unparked; if the mount stays parked for more than 10 seconds after the request, the driver logs a warning.
- **The mount does not respond:** use **Reboot**, wait for the controller to restart and connect again.
- **Unexpected status:** switch **Verbose** on in the Status tab and check the flags reported by the mount.
