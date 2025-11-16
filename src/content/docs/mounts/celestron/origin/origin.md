---
title: Origin
categories: ["mounts"]
description: INDI Origin Driver based on CelestronOriginMonitor and is released as a 3rd party driver and requires INDI Library >= v1.7.5.
---

This document describes the INDI Origin Driver, which is based on the CelestronOriginMonitor project. It is released as a 3rd party driver and requires INDI Library >= v1.7.5.

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
