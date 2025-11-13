---
title: ActiveFocuser
categories: ["focusers"]
description: The ActiveFocuser driver is used to control the focuser on the Mewlon-250CRS and CCA-250 from Takahashi.
thumbnail: ./activefocuser.webp
---

## Features

![Features](./images/features.webp)

The ActiveFocuser driver is used to control the focuser on the **Mewlon-250CRS** and **CCA-250** from Takahashi.

Those focusers can be controlled to get the perfect focus with your scope and they also include three fans and three temperature sensors used to find the thermal equilibrium of the scope.

This driver can be used to :

- Move the focuser to an absolute position (specific absolute steps)
- Focus IN and OUT using selected steps (relative position)
- Abort the focuser motion
- Read the data coming from the temperature sensors
- Enable or disable the fan directly into the driver

This driver has been made by [Takahashi Europe](https://www.takahashi-europe.com/) team.

## Operation

### Connecting to ActiveFocuser driver

In order to connect to the focuser you just have to plug the USB cable and power up the focuser.

The driver will automatically connect to your device using their hardware identifiers.

After connecting, the focuser is ready to go and you can use this driver in any other INDI application in order to control the focuser from your Mewlon or CCA.

## Options
The Options tab contains settings for all drivers that include polling (frequency of updates), logging, and debugging.

![Options](./images/options.webp)

## Presets
You may set pre-defined presets for common focuser positions in the Presets tab.

- Preset Positions: You may set up to 3 preset positions. When you make a change, the new values will be saved in the driver's configuration file and are loaded automatically in subsequent uses.
- Preset GOTO: Click any preset to go to that position

![preset](./images/preset.webp)
