---
title: Atik EFW v1
categories: ["filter-wheels"]
description: Legacy Atik EFW v1 USB filter wheel driver
thumbnail: ./atik-efw.webp
---

## Features

The INDI Atik EFW v1 driver controls legacy Atik USB electronic filter wheels
that are no longer supported by the current Atik Linux SDK. It is a standalone
USB driver and does not require the Atik camera SDK.

> [!IMPORTANT]
> This page is for the legacy Atik EFW v1 hardware supported by
> **indi_atik_efw**. Atik EFW2 and later SDK-supported wheels should use the
> Atik SDK driver from the **indi-atik** package, exposed as **indi_atik_wheel**.

The driver provides:

- Filter slot selection from INDI clients such as Ekos.
- Configurable slot count for wheels that do not report it reliably.
- Filter name storage through the standard INDI filter wheel controls.
- Simulation mode for profile setup and testing without connected hardware.
- Direct USB access to the legacy FTDI-based wheel protocol.

## Supported Hardware

Use this driver for the legacy Atik EFW v1 USB filter wheel. The device is
usually visible on Linux with an FTDI USB identifier similar to:

```text
0403:af01 Future Technology Devices International, Ltd Atik Filter Wheel
```

Use the SDK-based Atik driver instead when the wheel is an Atik EFW2 or another
model still supported by the Atik SDK. The fixes made for INDI issue
[#1222](https://github.com/indilib/indi-3rdparty/issues/1222) target the
legacy v1 driver only.

## Connectivity

The wheel connects over USB. Connect and power the filter wheel before starting
the INDI driver. On Linux, the user running INDI must have permission to access
the USB device; if the wheel is visible with `lsusb` but cannot be opened,
check your distribution's udev rules and user group membership.

This driver is installed as:

- Package: **indi-atik-efw**
- Executable: **indi_atik_efw**
- INDI device label: **Atik EFW**

## Operation

### First Use

When configuring Ekos or another INDI client, add **Atik EFW** as the filter
wheel driver. If your system offers multiple Atik filter wheel entries, select
the one backed by **indi_atik_efw** for legacy v1 hardware.

- Connect the wheel by pressing **Connect** in the **Main Control** tab.
- Open the **Filter Wheel** tab.
- Set the number of slots if the detected value is not correct.
- Enter the filter names for each slot and press **Set**.
- Open the **Options** tab and save the configuration.

After the configuration is saved, INDI clients can select filter slots normally.

### Main Control Tab

The **Main Control** tab connects and disconnects the wheel. When connected,
the driver initializes the USB interface and reads the current wheel position
when the hardware provides it.

### Filter Wheel Tab

The **Filter Wheel** tab provides the standard INDI filter controls:

- **Filter Slot**: displays or changes the current filter position.
- **Filter**: stores names for the filters installed in each slot.
- **Slots**: sets the number of available positions when the wheel does not
  report the slot count reliably.

### Options Tab

The **Options** tab provides the common INDI driver controls:

- **Debug**: enable verbose logging when diagnosing USB or status response
  problems.
- **Simulation**: test the driver profile without connected hardware.
- **Configuration**: load, save, restore, or purge saved driver settings.
- **Polling**: controls how often the driver checks wheel status.

## Troubleshooting

If the wheel is detected by USB but does not connect, first confirm that the
Ekos profile is using **indi_atik_efw**. The older SDK driver,
**indi_atik_wheel**, is for SDK-supported Atik wheels and does not solve the
legacy v1 SDK deprecation issue.

If the driver reports status parsing or connection failures, update to
**indi_atik_efw** version 1.1 or newer. Version 1.1 includes the legacy v1
workarounds from issue #1222 for compact or incomplete status responses.

If the driver cannot open the wheel, verify:

- The wheel appears in `lsusb`.
- The USB identifier is the legacy FTDI Atik wheel identifier.
- The INDI user has permission to access the USB device.
- No other process is already using the wheel.
