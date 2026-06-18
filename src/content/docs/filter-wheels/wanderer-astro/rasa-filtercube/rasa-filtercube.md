---
title: Wanderer FilterCube
categories: ["filter-wheels"]
description: INDI driver for the Wanderer Astro FilterCube (RASA), a 5-position filter wheel for Celestron RASA11, RASA36 and other similar prime focus telescopes, with zero optical obstruction.
thumbnail: ./rasa-filtercube.webp
---

## Overview

The Wanderer FilterCube is a compact **5-position** electronic filter wheel designed for Celestron RASA11, RASA36 and other similar prime focus telescopes. Mounted at the prime focus, it introduces **zero optical obstruction** — light passes straight through with no vanes or secondary obstruction in the optical path, so it does not compromise the fast, wide-field performance these telescopes are built for. The device identifies itself on the bus as model **WFC50** and communicates via a USB-to-serial interface (CDC, CH340) using a simple numeric command protocol at **19200 baud, 8N1**.

Like other Wanderer Astro wheels, the device continuously streams its status over the serial port, with fields separated by the `A` character. The driver parses this stream to track the current position and to verify the model at connection time.

## Features

- **5 filter positions**
- **Zero optical obstruction** at the prime focus — no vanes or secondary in the optical path
- **Model & firmware display** — the model (`WFC50`) and firmware version are read at handshake and shown in the read-only *Device Info* property
- **Device ID read/write** (0–10, command `1900000` + id) — useful when running several wheels from the same host
- **Per-filter name read/write** — each position stores a **single letter** (B–Z = 2–26; command `(161 + slot) * 10000 + letter`)
- Continuous status stream parsed in real time — current position is always known
- **Strict model validation** — the driver only connects to a `WFC50`; any other device on the selected port is rejected
- **Firmware requirement** — firmware **≥ 20260312** is required; older firmware is rejected with an upgrade prompt

> [!NOTE]
> Unlike the Wanderer Snowflake, the FilterCube exposes **no** automatic-calibration and **no** zero-detection commands. It relies on its own mechanical reference and requires no calibration pass.
