---
title: Wake On LAN
categories: ["auxiliaries"]
description: INDI Wake On LAN driver — remotely power on network-connected computers and devices from an INDI client.
thumbnail: ./wake-on-lan.webp
---

## Overview

The **INDI Wake On LAN** driver (`indi_wake_on_lan`) allows you to power up to four remote computers or network-capable devices directly from an INDI client such as KStars/Ekos. It achieves this by sending a [Magic Packet](https://en.wikipedia.org/wiki/Wake-on-LAN) — a special UDP broadcast that Wake-on-LAN (WoL) compatible network interfaces recognise as a power-on signal.

This is particularly useful in remote observatory setups where you want to boot a guide computer, an all-sky camera PC, or any other machine before starting your observing session, without needing physical access to the hardware.

If the device has its own IP address, the driver pings the device and reports on its status.

## Requirements

Before using this driver, make sure the target machine meets the following requirements:

- **Wake-on-LAN enabled in the BIOS/UEFI.** Look for an option called _Wake on LAN_, _Power on by LAN_, or similar and enable it.
- **Wake-on-LAN enabled on the network interface** (Linux example):

  ```bash
  sudo ethtool -s eth0 wol g
  ```

- The target machine must be on the **same local network segment** or reachable via a subnet-directed broadcast address (WoL does not cross routers by default).
- You need to know the **MAC address** of the target machine's network interface.

## Main Control

For each device the **Send** button allows to trigger a WoL message.
The light shows the status of the IP pinged device (if it has an IP address) 

## Options

The driver exposes a simple control panel with the following properties:

| Property | Type | Description |
|---|---|---|
| **MAC Address** | Text | The MAC address of the target machine's network interface (e.g. `AA:BB:CC:DD:EE:FF`). |
| **Alias** | Text | A friendly name for the device (e.g. GM1000 Mount) |
| **IP Address** | Text | The IP address of the device, if available. It has to be in the
| | | same network as the device sending the WoL message. |

### Finding a MAC address

- **Linux:**

  ```bash
  ip link show
  # or
  cat /sys/class/net/eth0/address
  ```

- **Windows:** `ipconfig /all` in a Command Prompt — look for _Physical Address_.
- **macOS:** System Settings → Network → select interface → Details → Hardware.


