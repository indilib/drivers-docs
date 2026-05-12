---
title: RTI-Dome
categories: ["domes"]
description: DIY Observatory Dome Controller
thumbnail: ./rti-dome.webp
---
## Features

RTI-Dome is an open-source, high-performance DIY dome and shutter control system developed by Rodolphe Pineau (RTI-Zone). Designed for observatories of various sizes—from NexDome to heavy custom installations—it provides professional-grade features using accessible ESP32 hardware.

![dome](./images/dome.webp)

It supports the following features:

1.  **ESP32 Based**: High-speed processing with built-in WiFi and Ethernet (WIZnet W5500) capabilities.
2.  **High-Torque Support**: Compatible with powerful stepper drivers (TB6600, DMT556T) and NEMA 34 motors for heavy domes (tested up to 12Nm+).
3.  **Safety Integration**: Dedicated inputs for weather safety devices (AAG CloudWatcher, Hydreon RG-11) for automatic emergency shutter closure.
4.  **Dual Communication**: Supports both Ethernet/WiFi (Alpaca/TCP) and USB Serial (115200 baud).
5.  **Flexible Power**: Standard XT60 connectors; supports 12V natively with options for 24V-60V motor power using a dedicated power adapter.
6.  **Open Hardware**: PCB designs and firmware are fully open-source.

## Operation

The RTI-Dome system consists of two primary hardware components that communicate wirelessly:

1.  **Rotation Controller**: Manages the dome's azimuth rotation, motor torque, and external safety sensors.

![rotation-controller](./images/rotation-controller.webp)

2.  **Shutter Controller**: Mounts to the moving dome and manages the opening/closing of the shutter, typically powered by a battery or power ring.

![shutter-controller](./images/shutter-controller.webp)

Communication between the rotation controller and the shutter controller is handled via a dedicated local WiFi link, eliminating the need for complex wiring between the fixed and rotating parts of the dome.

## Integration with INDI

RTI-Dome is supported in INDI via two methods: a native driver for direct high-performance control, and the Alpaca bridge for network-based interoperability.

### Native INDI Driver (Recommended)

The native `indi_rti_dome` driver provides direct support for the RTI-Dome over both Serial and TCP/IP connections.

1.  **Connection**: Select either Serial or TCP in the connection settings.
2.  **Configuration**:
    *   **Serial**: Select the appropriate port (typically `/dev/ttyUSB0` or similar).
    *   **TCP**: Enter the IP address and port (default is 2323).
3. **Main control**: 
![main-control](./images/main_control.webp)

From the Main Control Panel, you can set the absolute azimuth position, find home, and park/unpark the dome. The driver checks if a shutter is detected on startup.
4. **Settings**:
![settings](./images/settings.webp)

In Settings tab, You can adjust the home position, steps per rotation, acceletaiton, and which action to take when rain is detected.

5.  **Features**: Full support for Azimuth rotation (Absolute/Relative), Homing, Syncing, and Shutter control. It also provides monitoring for rain status and shutter battery voltage.
![info](./images/info.webp)

6. **Slaving**: You can slave the dome to the mount by setting the required slaving parameters (by convention the units are in meters);

* **Radius** is for the radius of the dome
* **Shutter width** is the aperture of the shutter of the dome in meters.
* **N displacement** is for north-south displacement of the intersection of the RA & DEC axis as measured from the center of the dome. Displacement to north is positive, and to south is negative.
* **E displacement** is for east-west displacement. Similar as the above, displacement to east are positive, and to west are negative.
* **Up displacement** is for displacement of the RA/DEC intersection in the vertical axis as measured from the origin of the dome (not the walls). Up is positive, down is negative.
* **OTA offset** is for the distance of the optical axis to the RA/DEC intersection. In fork mount this is generally 0, but for German like mounts is the distance from mount axis cross to the center line of the telescope. West is positive, east is negative.

After settings the parameters above, go to Options tab and click Save in Configurations so that the parameters are used in future sessions. You can also set the Autosync threshold which is the minimum distance autosync will move the dome. Any motion below this threshold will not be triggered. This is to prevent continuous dome moving during telescope tracking.

### Alpaca Support

RTI-Dome also features a native onboard Alpaca server, allowing for seamless integration via the **Alpaca Bridge**.

1.  **Use Bridge**: In Ekos/INDI, use the `indi_alpaca_dome` driver.
2.  **Configure**:
    *   **Hostname**: Set to the IP of the RTI-Dome.
    *   **Port**: 11111 (Default Alpaca port).
    *   **Device Number**: Usually 0.

## Credits & License

RTI-Dome is developed by **Rodolphe Pineau**.
*   **Project Page**: [rti-zone.org/astro_dome_control.php](https://rti-zone.org/astro_dome_control.php)
*   **Firmware & Hardware**: [GitHub (rpineau/RTI-Dome)](https://github.com/rpineau/RTI-Dome)
*   **Commands Documentation**: [Download PDF](https://rti-zone-files.s3.amazonaws.com/rti-dome-commands.pdf)
