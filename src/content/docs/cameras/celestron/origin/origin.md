---
title: Origin
categories: ["cameras", "mounts"]
description: Origin supports the standard single-frame snapshot mode.
thumbnail: ./origin.webp
---

This document describes the INDI Origin Driver, which is based on the CelestronOriginMonitor project. It is released as a 3rd party driver and requires INDI Library >= v1.7.5.

# As a Camera

## Features

The driver supports the standard single-frame snapshot mode. Furthermore, it supports:

- Gain controls  

## Operation

### Connecting to Origin Camera

The camera is always physically connected when the Origin is connected. To satisfy the INDI protocol it is allowed to logically connect the camera separately.

## Capture

To capture a single-frame image, simple set the desired exposure time in seconds and click **Single**. After the capture is complete, it should be downloaded as a FITS image. Changing the size, binning, region of interest or depth is not supported. FITS images are not saved unless you create a sequence. This should be done using kstars/Ekos or CCDCiel.

---

# As a Mount

## Features

This INDI driver interacts with a mount controller using the Origin WebSocket Protocol through WiFi. Key features include:

* Goto

## Connectivity

> [!WARNING]
> To ensure proper mount operation and pointing accuracy, initialise the mount using the Origin App, before connecting and controlling the mount via the INDI driver. Running both control systems concurrently will compromise the pointing system and may result in inaccurate GOTO operations.

`The device running the INDI driver (StellarMate/PC) should be connected to the mount via Ethernet. The Origin will expect the PC to serve DHCP leases.

## Operation

Once Origin is online, it loads defaults from the onboard Raspberry-PI

### Site Management

Time, Location, and Park settings are configured in the Origin App.

### Alignment

By default, alignment is performed by the Origin's onboard Raspberyy-PI
