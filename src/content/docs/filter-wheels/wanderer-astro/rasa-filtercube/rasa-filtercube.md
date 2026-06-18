---
title: Wanderer FilterCube
categories: ["filter-wheels"]
description: INDI driver for the Wanderer Astro FilterCube (RASA), a 5-position filter wheel for Celestron RASA telescopes.
thumbnail: ./rasa-filtercube.webp
---

## Overview

The Wanderer FilterCube is a compact **5-position** electronic filter wheel designed for Celestron RASA (Rowe-Axial Spherical Astrograph) telescopes. The device identifies itself on the bus as model **WFC50** and communicates via a USB-to-serial interface (CDC, CH340) using a simple numeric command protocol at **19200 baud, 8N1**.

Like other Wanderer Astro wheels, the device continuously streams its status over the serial port, with fields separated by the `A` character. The driver parses this stream to track the current position and to verify the model at connection time.

## Features

- **5 filter positions**
- **Model & firmware display** — the model (`WFC50`) and firmware version are read at handshake and shown in the read-only *Device Info* property
- **Device ID read/write** (0–10, command `1900000` + id) — useful when running several wheels from the same host
- **Per-filter name read/write** — each position stores a **single letter** (B–Z = 2–26; command `(161 + slot) * 10000 + letter`)
- Continuous status stream parsed in real time — current position is always known
- **Strict model validation** — the driver only connects to a `WFC50`; any other device on the selected port is rejected
- **Firmware requirement** — firmware **≥ 20260312** is required; older firmware is rejected with an upgrade prompt

> [!NOTE]
> Unlike the Wanderer Snowflake, the FilterCube exposes **no** automatic-calibration and **no** zero-detection commands. It relies on its own mechanical reference and requires no calibration pass.

## Requirements

- Wanderer FilterCube (WFC50) filter wheel
- USB cable (the wheel appears as a CDC serial port, typically `/dev/ttyUSB0`)
- 12 V DC power supply connected to the wheel (required for motor movement)

## Connection

1. Connect the wheel to your computer via USB and ensure the 12 V power supply is plugged in.
2. In KStars / Ekos, open the **Equipment Profile** and add *Wanderer FilterCube* under **Filter Wheel**.
3. Select the correct serial port (e.g. `/dev/ttyUSB0`) in the **Connection** tab.
4. Click **Connect**.

On successful connection the driver will:
- Verify the model is `WFC50` and that the firmware is ≥ 20260312.
- Read the current filter position, per-filter names and device ID from the status stream.
- Populate the *Device Info* property with the model and firmware version.

> [!IMPORTANT]
> If the wrong serial port is selected and the attached device is not a FilterCube (for example a Wanderer Snowflake or another Wanderer Astro device), the driver refuses to connect and reports a model mismatch instead of silently taking over the wrong device.

## Operation

### Changing filters

Select the target filter in the **Filter Slot** field (1–5) or use the **Filter** tab in Ekos. The driver sends the move command (`200X`, X = 1–5), flushes stale data from the serial buffer, then silently polls the status stream until the wheel reports the target position.

### Filter names

Filter names can be set per position in the **Filter** tab of the Ekos equipment manager. Each position stores a **single letter** in the range **B–Z** (letter `A` is reserved by the protocol as the field delimiter). Invalid entries are rejected and the previous value is restored.

### Device ID

The **Device ID** (0–10) lets you distinguish several wheels on the same host. Set it from the **Options** tab; the value is written to the device and read back on the next connect.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| *WFC50 not found* / model mismatch | Wrong port, or a different Wanderer Astro device is attached | Select the correct serial port for the FilterCube |
| *firmware is too old* | Firmware < 20260312 | Update the firmware using WandererEmpire |
| Wheel does not move | 12 V not connected | Connect the power supply |
| *Timed out waiting ... to reach target* | Mechanical obstruction or stale serial data | Retry; the driver flushes stale frames before each move |
