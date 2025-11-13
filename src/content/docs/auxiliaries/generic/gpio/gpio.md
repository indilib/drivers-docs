---
title: GPIO
categories: ["auxiliaries"]
description: GPIO.
thumbnail: ./gpio.webp
---

# GPIO

## Features

The INDI GPIO driver uses the libgpiod library to access the system's GPIO interface. It only supports ports labeled as GPIO by the kernel. Both inputs and outputs are On/Off switches. The status of output switches cannot be determined, so the driver lists them initially in an unknown state until you explicitly switch them on or off.

There is no method to switch inputs to outputs and vice versa, this must be done externally. While it was tested on Raspberry PI, it can work on any board supported the libgpiod library.

## Connection

By default, it connects to first gpio chip named gpiochip0. To change the active gpiochip, set it in the Options tab. To get a list of all chips, use the  **gpiodetect**  command.

## Operation

GPIO inputs and outputs are listed in the Input and Output tabs. Each GPIO label can be customized and retained for future sessions. The property names start from  DIGITAL_INPUT_1 or DIGITAL_OUTPUT_1. Do not confuse this naming scheme with GPIO numbers.

[![thumb input](https://stellarmate.com/images/devices/gpio/thumbnails/thumb_input.png)](https://stellarmate.com/images/devices/gpio/input.png)

When used as an Input/Output driver in another driver, like the Universal ROR driver, use the DIGITAL_INPUT or DIGITAL_OUTPUT indexes accordingly. The driver does not retain the GPIO config on restart.