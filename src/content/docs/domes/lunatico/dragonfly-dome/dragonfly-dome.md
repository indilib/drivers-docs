---
title: DragonFly Dome
categories: ["domes"]
description: DragonFly Dome
thumbnail: ./dragonfly-dome.webp
---


## Features

The driver can completely control the Dragonfly’s relays and Sensors for customizing your observatory needs for remote control. The relays can be used for many things such as switching control voltages to open or close the roof, switching lights or equipment on and off, or monitor a Safe/Unsafe weather station condition from the AAG Cloudwatcher as an example.

The driver supports the Dragonfly Sensors so you could monitor mechanical or magnetic sensors for the status of the roof or perhaps laser beam switches for positions of the telescope. With 8 relays and 8 sensors in the Dragonfly, the INDI driver gives the user great flexibility for controlling and powering devices anywhere in your observatory. Script control is also available in Ekos if you wanted to run a particular personal script for powering up or powering down your observatory due to sessions starting or ending. The driver works with weather stations supported by INDI and can recognize when unsafe conditions are present instructing the Dragonfly to close the roof.

## Requirements

In order to utilize the controller for your roof control, you need the following:

-   **Motor**: bi-directional Motor connected to a mechanism (gear, chain..etc) to open and close the roof.
-   **Parked Limit Switch**: Parked limit switch sensor. This is the sensor to inform the motor when the roof is  **fully closed**  and is therefore considered to be in  **Parked** state.
-   **Unparked Limit Switch**: UnParked limit switch sensor. This is the sensor to inform the motor when the roof is  **fully opened**  and is therefore considered to be in  **UnParked**