---
title: Astrometers AMSKY01 API
categories: ["weather-stations"]
description: Astrometers AMSKY01 API
thumbnail: ./amsky01.webp
---

indi_amsky01_api is an INDI driver for accessing data from [AMSKY01 Sky & Cloud Sensor](https://astrometers.eu/products/AMSKY01/). The driver acts as a bridge between the AMSKY01_viewer and INDI clients, exposing measured sky and environmental data through the standard INDI protocol.

The driver connects to a running  [AMSKY01_viewer](https://github.com/roman-dvorak/AMSKY01/tree/main/sw) instance, which performs low-level device communication and data acquisition, while  `indi_amsky01_api`  focuses on INDI integration and client access.

----------

## Overview

-   Implements an INDI interface for the AMSKY01 sensor
    
-   Designed for use in automated observatories and monitoring setups
    
-   Uses AMSKY01_viewer as a backend data provider
    
-   Provides real-time access to sky and environmental measurements
    

The driver does not communicate directly with the hardware. Instead, it connects to AMSKY01_viewer via its API, allowing separation of data acquisition, visualization, and observatory control logic.

Users requiring direct communication with the AMSKY01 hardware should use the indi_amsky01 driver, which connects directly to the AMSKY01 USB device without the AMSKY01_viewer backend.

----------

## Supported Hardware

-   AMSKY01 Sky & Cloud Sensor
    

----------

## Driver Architecture

```
AMSKY01 hardware
        ↓
AMSKY01_viewer (data acquisition & visualization)
        ↓
indi_amsky01_api (INDI driver)
        ↓
INDI clients (e.g. Ekos, custom clients)

```

This architecture allows AMSKY01_viewer to be used independently for visualization and diagnostics, while INDI clients access the same data stream through a standardized interface.

The AMSKY01_viewer Python application can also be used as a standalone tool without any running INDI instance. It supports logging of pixel-level thermal data, SQM measurements, and hygrometer data directly to files for long-term storage and offline analysis. AMSKY01_viewer can expose its API over the network, enabling remote access to measured data from another computer on the local network or across routed IP connections.

----------

## Exposed Parameters

The driver publishes the following measurements and properties via INDI:

-   Sky brightness
    
-   Cloud temperature data
    
-   Ambient temperature
    
-   Relative humidity
    
-   Sensor status and connection state
    

Exact parameter naming and availability depend on the AMSKY01_viewer configuration and firmware version.

----------

## Connection

-   Backend: AMSKY01_viewer API
    
-   INDI transport: Standard INDI TCP/IP
    
-   Operating systems: Linux and other POSIX-compatible systems
    

AMSKY01_viewer must be running and reachable before connecting the INDI driver.

----------

## Intended Use

-   Automated observatories
-   Weather and sky condition monitoring
-   Dome and roof control logic
-   Long-term sky quality measurements
-   Research and educational installations

----------

## References

-   AMSKY01 product page:  [https://astrometers.eu/products/AMSKY01/](https://astrometers.eu/products/AMSKY01/)
    
-   AMSKY01 GitHub repository:  [https://github.com/roman-dvorak/AMSKY01](https://github.com/roman-dvorak/AMSKY01)