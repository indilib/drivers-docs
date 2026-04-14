---
title: Wanderer Snowflake Filter Wheel
categories: ["filter-wheels"]
description: INDI driver for the Wanderer Astro Snowflake filter wheel family (WSFW368 36 mm and WSFW508 50 mm).
thumbnail: ./wanderer-snowflake.webp
---

## Overview

The Wanderer Snowflake is a motorised electronic filter wheel available in two versions:

| Model | Clear aperture | Supported filters |
|-------|---------------|-------------------|
| WSFW368 | 36 mm | up to 8 positions |
| WSFW508 | 50 mm | up to 8 positions |

The wheel communicates via a USB-to-serial interface (CDC) using a simple numeric command protocol at **19200 baud, 8N1**. The device continuously streams its status over the serial port, which the driver uses to track position without any dedicated polling command.


## Features

- Supports both WSFW368 (36 mm) and WSFW508 (50 mm) variants
- Up to **8 filter positions** per wheel
- **Automatic calibration** sent at every connection (mirrors the official Wanderer ASCOM driver behaviour)
- **Zero-position detection** (mechanical home to filter 1) accessible from the INDI control panel
- Per-filter **name** and **focus offset** storage on the device (configurable via the protocol)
- Continuous status stream parsed in real time — current filter position is known at all times
- Full **simulation mode** for testing without physical hardware

## Requirements

- Wanderer Snowflake filter wheel (WSFW368 or WSFW508)
- USB cable (the wheel appears as a CDC serial port, typically `/dev/ttyUSB0`)
- 12 V DC power supply connected to the wheel (required for motor movement)

## Connection

1. Connect the wheel to your computer via USB and ensure the 12 V power supply is plugged in.
2. In KStars / Ekos, open the **Equipment Profile** and add *Wanderer Snowflake Filter Wheel* under **Filter Wheel**.
3. Select the correct serial port (e.g. `/dev/ttyUSB0`) in the **Connection** tab.
4. Click **Connect**.

On successful connection the driver will:
- Read the current filter position from the status stream and display it immediately.
- Send the **automatic calibration** command (`1500002`) so the next filter movement performs a self-calibration pass.

> **Note:** If the 12 V power supply is not connected the wheel will accept commands but will not move. The status stream will still be available.

![INDI control panel – Main Control tab]

## Operation

### Changing filters

Select the target filter in the **Filter Slot** field (1–8) or use the **Filter** tab in Ekos. The driver sends the move command (`200X`) and monitors the continuous status stream until the wheel reports the target position.

### Filter names and offsets

Filter names and focus offsets can be set in the **Filter** tab of the Ekos equipment manager. Names are stored on the device (up to 26 characters, letters B–Z per position). Offsets are stored on the device as integer values (0–255).

![Ekos Filter Manager]

### Calibration

Two calibration actions are available in the **Calibration** group on the Main Control tab:

| Button | Protocol command | Description |
|--------|-----------------|-------------|
| **Auto calibrate** | `1500002` | Flags the device so the *next* filter movement performs an automatic calibration pass (incremental, typically < 5 s overhead). |
| **Zero detection** | `1002` | Drives the wheel to its mechanical home position (filter 1), then stops. Use this if the wheel loses synchronisation. |

Auto calibrate is also sent automatically at every connection, matching the behaviour of the official Wanderer ASCOM driver.


## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| *Failed to read status* at connect | Wrong port or 12 V not connected | Check the port in the Connection tab; verify power |
| Wheel does not move | 12 V not connected | Connect the power supply |
| Filter position shown as wrong number after startup | Partial status frame received during resync | Disconnect and reconnect; the driver re-reads the status stream |
| *Timed out waiting for filter wheel to reach target* | Very slow move (calibration pass) or mechanical obstruction | Wait and retry; run **Zero detection** to home the wheel |

## Issues

- Filter name encoding uses letters B–Z only (letter A is reserved by the protocol). Names entered as "A" will be silently ignored by the device.
- The `pacman -Syu libindi` upgrade may overwrite `/usr/share/indi/drivers.xml`; re-run `deploy-wanderer-snowflake-system.sh` after any libindi upgrade.
