---
title: Weather MQTT
categories: ["weather-stations"]
description: Weather data from any MQTT source
thumbnail: ./weather-mqtt.webp
---

## Features

INDI driver for weather monitoring from an arbitrary MQTT source.
This driver connects to a local or public MQTT broker, and
subscribes to specific topics to get the following weather data:
- temperature
- humidity
- air pressure
- wind speed
- wind gust speed
- rain fall
- clouds
- light

## Operation

Before you start using it, you need to configure MQTT source and subscribe to 
weather topics. If your weather station can publish to MQTT topics, you can 
use it right away by subscribing to these topics.
