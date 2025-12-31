---
title: MBox Meteostation
categories: ["weather-stations"]
description: MBox Meteostation
thumbnail: ./mbox.webp
---

## Features

MBox is a small, self-contained weather sensing device that delivers barometric pressure, temperature, humidity and dew point information with high accuracy. It features a Micro-USB port and comes in a handy, small enclosure.

The driver supports reading the following sensor data:

-   **Temperature (C)**: Inside temperature in Celcuis.
-   **Humidity (C)**: Relative Humidity %
-   **Barometer (millibars)**: Barometer pressure value.
-   **Dew Point**: Dew point in Celcius.

![MBox Main Control](./images/mbox_main.webp)

All parameter values have an **Ok**, **Warning**, and **Alert** ranges that can be specified by the user in the _Parameters_ tab. Temperature is considered a _Critical Paramter_. Critical paramters are listed in the main control tab in the Weather status property. The user can specify the minimum and maximum range for each zone. Any value outside the **Warning** zone is automatically considered **Alert**. The overall weather status property reflects the worse state of the individual _critical_ parameters. If one critical paramter status is **Warning** while another is **Alert** then the overall weather status property is **Alert**. The weather status property may be used for decision making by clients application. For example, when the weather status is Alert, the client application may commence a precautionary shutdown of the observatory to protect its equipment from adverse weather conditions.

## Operation

Before you connect, check that the port and baud rate settings in the _Options_ tab are correct. By default, the port is _/dev/ttyUSB0_ and the baud rate is 38400. You can specify the update period is seconds (default 60) in the main control panel. To update weather data manually, press the _Refresh_ button. If you change the paramter ranges under the _Paramters_ tab, save the ranges in the configuratio file by clicking on **Save** in the _Options_ tab.

You can set  _Offsets_  for each sensor to adjust its reported value in the Main Control Panel.

![MBox Parameters](./images/mbox_params.webp)