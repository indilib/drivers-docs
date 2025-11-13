---
title: Sky Quality Meter
categories: ["auxiliaries"]
description: Sky Quality Meter
thumbnail: ./sky-quality-meter.webp
---


## Features

INDI SQM driver support Ethernet-enabled  [SQM-LE](https://unihedron.com/projects/sqm-le/) and USB. The driver provides basic averaged readings from the unit including sky brightness and temperature.

## Operation

Before establishing connection, set the IP address of the SQM-LE unit in the main control panel. By default, the port is 10001 so only change it if necessary.

![Main Control Panel](./images/panel.webp)

Once connected, the driver will query the unit every second for the readings. The most important reading is the sky brightness measured as Magnitudes per Squared Arcsecond (MPSAS). The INDI CCD driver is configured by default to listen to SQM and will append the MPSAS value to the FITS header once an image is captured.

To configure the unit and set calibration options, please refer to Uniherdon provided cross-platform software.