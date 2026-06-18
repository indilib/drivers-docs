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
- **Strict model validation** — only a WSFW368 or WSFW508 is accepted; a different Wanderer Astro device on the selected port is rejected
- **Model & firmware display** — the model (WSFW368/WSFW508) and firmware version are read at handshake and shown in the read-only *Device Info* property
- **Automatic calibration** sent at every connection (mirrors the official Wanderer ASCOM driver behaviour)
- **Zero-position detection** (mechanical home to filter 1) accessible from the INDI control panel
- Per-filter **name** and **focus offset** storage on the device (configurable via the protocol)
- **Device ID read/write** (0–10) to distinguish several wheels on the same host
- Continuous status stream parsed in real time — current filter position is known at all times
- **Firmware requirement** — firmware ≥ **20260124** is required
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
- Verify the model is WSFW368 or WSFW508 and that the firmware is ≥ 20260124.
- Read the current filter position, per-filter names, focus offsets and device ID from the status stream.
- Populate the *Device Info* property with the model and firmware version.
- Send the **automatic calibration** command (`1500002`) so the next filter movement performs a self-calibration pass.

> [!NOTE]
> If the 12 V power supply is not connected the wheel will accept commands but will not move. The status stream will still be available.

> [!IMPORTANT]
> If the wrong serial port is selected and the attached device is not a Snowflake (for example a Wanderer FilterCube or another Wanderer Astro device), the driver refuses to connect and reports a model mismatch instead of silently taking over the wrong device.

## Operation

### Changing filters

Select the target filter in the **Filter Slot** field (1–8) or use the **Filter** tab in Ekos. The driver sends the move command (`200X`) and monitors the continuous status stream until the wheel reports the target position.

### Filter names and offsets

Filter names and focus offsets can be set in the **Filter** tab of the Ekos equipment manager. Each name is stored on the device as a **single letter** in the range **B–Z** (letter `A` is reserved by the protocol as the field delimiter). Invalid entries are rejected and the previous value is restored. Offsets are stored on the device as integer values (0–255).

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
| *Failed to read status* / model mismatch at connect | Wrong port, or a different Wanderer Astro device is attached | Select the correct serial port for the Snowflake |
| *Firmware is outdated* | Firmware < 20260124 | Update the firmware to the latest version |
| Wheel does not move | 12 V not connected | Connect the power supply |
| Filter position shown as wrong number after startup | Partial status frame received during resync | Disconnect and reconnect; the driver re-reads the status stream |
| *Timed out waiting for filter wheel to reach target* | Very slow move (calibration pass) or mechanical obstruction | Wait and retry; run **Zero detection** to home the wheel |

## Issues

- Filter names use a single letter (B–Z) per position. Letter `A` is reserved by the protocol as the field delimiter and is rejected; the previous value is restored.
