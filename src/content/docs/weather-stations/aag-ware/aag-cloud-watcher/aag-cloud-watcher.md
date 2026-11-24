---
title: AAG Cloud Watcher
categories: ["weather-stations"]
description: AAG Cloud Watcher
thumbnail: ./aag-cloud-watcher.webp
---

## Features

The AAG CloudWatcher comprises:

- **Clouds sensor**: Through an infrared sensor of the AAG CloudWatcher measures the temperature of the sky, and an electronic thermometer measures the internal temperature. Both data are then related by a powerful formula used to determine the existence of clouds.

- **Rain sensor**: CloudWatcher uses a variable capacitor to determine the existence of rain. In addition, the capacitor incorporates an internal resistance for heating the element, drying it, which allows a constant reliable reading.

- **Light sensor**: To distinguish between day and night. It can even detect the Moon.

- **Temperature sensor**

- **Anemometer** (optional)

The current **indi_aagcloudwatcher** driver has the following features:

- Shows the RAW readings as well as the corrected ones for every sensor (infrared sky, corrected infrared sky, infrared sensor, rain sensor, rain sensor temperature brightness sensor and ambient temperature sensor).

- Shows the weather conditions in plain understandable options:
  - Cloud conditions: Clear, cloudy, overcast
  - Rain conditions: Dry, Wet, Rain
  - Brightness conditions: Dark, Light, Very Light

- Allows to control the internal relay (switch) of the unit.

- Reading interval is configurable.

- The algorithm to control the rain sensor heater is fully implemented.

- Allows to tune up all the unit configurable parameters.

- And some more options...

## Ambient temperature source

Units with firmware 5.6 or later may have an RH (humidity) sensor that also measures temperature, more accurately
than the infrared sensor's own thermometer. **Options → Ambient Temp. Source** selects where the driver takes the
ambient temperature from:

- **Probe / IR sensor** (default): the external ambient probe if one is fitted, otherwise the infrared sensor's temperature.
- **RH sensor**: the RH sensor's temperature. If the unit has no RH sensor or it reports an invalid value, the driver
  falls back to the probe / IR sensor and logs a warning.

The selected temperature is shown as *Ambient Temp. Sensor* and is used for the sky temperature correction and the
rain sensor heater. Save the configuration to keep the choice.

## Operation

Just connect the driver and watch the sensor information.
