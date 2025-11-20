---
title: Alnitak Flip-Flat & Flat-Man
categories: ["lightboxes"]
description: FlipFlat
thumbnail: ./flipflat.webp
---

## Features

INDI FlipFlat driver supports both  [Flip-Flat](http://www.optecinc.com/astronomy/catalog/alnitak/flipflat.html)  and  [Flat-Man](http://www.optecinc.com/astronomy/catalog/alnitak/flatman.html)  devices. Under Flip-Flat, the driver provides control to open/close the dust cap and to control and light and its brightness level. For Flat-Man, only the light control is available.

## Operation

Before establishing the connection, set the device port in the  _Options_  tab. After connection, you can Park (Close) or UnPark (Open) the panel set the light level, and turn on/off the light source. For Flat-Man, only the light control is available.

![Main Control Panel](./images/flipflat_maincontrol.webp)

Under the options tab, you can optionally set the INDI Filter Wheel device (whether embedded within a CCD or a standalone filter device). Make sure to save the config so that it is loaded on next start-up.

Once the driver receives filter information, it shall construct the  **Presets**  tab where you can set the desired brightness level for each filter accordingly. Therefore, whenever the filter wheel changes, the brightness level for the new filter slot is updated accordingly. This feature is very useful when taking flats via narrowband filter as they require higher brightness settings to obtain flats at a desirable ADU level. The filter-adjusted brightness settings are saved for future sessions after you save the driver configuration in the driver's tab

![Filter Presets](./images/flipflat_presets.webp)