---
title: Wanderer Cover V3
categories: ["lightboxes"]
description: Wanderer Cover V3
thumbnail: ./wanderer-cover-v3.webp
---

## Features

Before establishing connection, set the device port in the  _Options_  tab. After connection, you can Park (Close) or UnPark (Open) the panel and set the light level and turn on/off the light source.

![connection](./images/connection.webp)

Under the options tab, you can optionally set the INDI Filter Wheel device (whether embedded within a CCD or a standalone filter device). Make sure to save the config so that it is loaded on next start up.

![main control](./images/main_control.webp)

Once the driver receives filter information, it shall constructions the  **Presets**  tab where you can set the desired brightness level for each filter accordingly. Therefore, whenever the filter wheel changes, the brightness level for the new filter slot is updated accordingly. This feature is very useful when taking flats via narrowband filter as they require higher brightness settings to obtain flats at a desirable ADU level. The filter-adjusted brightness settings are saved for future sessions after you save the driver configuration in the driver's tab