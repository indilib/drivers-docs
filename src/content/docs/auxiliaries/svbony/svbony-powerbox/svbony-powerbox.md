---
title: SVBONY Astro Power Controller
categories: ["auxiliaries"]
description: SVBONY PowerBox
thumbnail: ./svbony-powebox.webp
---
## Features

7 12V DC outputs, Regulated Interface and switch1-5 interfaces can be individually controlled on/off;
The USB port can connect to guide cameras, planetary cameras, etc.; the DC port can connect to DSO cooled cameras, equatorial mounts, electronic focus controller, motorized filter wheels, and electronic field flatteners; and the RCA interface can connect to dew heaters;
Real-time detection of ambient temperature and humidity to achieve automatic temperature control throughout the process.

INDIドライバーで可能なコントロールは以下のとおりです。

- PWM 12V6Ax2ポート, 0から100%までのCycle変更が可能, ON/OFF切り替え可能
- DC5521 12Vx5ポート, ON/OFFの切り替え可能
- REGULATED OUT 1ポート, 0から15.3V の電圧調整が可能
- USB
  - USB 2.0 x 4 (Type-C x 1, Type-A x 3)
  - USB 3.0 x 2 (Type-A x 2)
  - Type-c,1,2 コネクタ と 3,4,5 コネクタの二組を ON/OFF 切り替え可能

> ⚠️ **Note:**
>
> - SV241 Pro にデバイスを接続している場合、Ekos の Start 時にはSV241 Proを他のデバイスよりも先に起動し、Ekos の Stop 時は他のデバイスより後に終了する必要があります。  
> - 設定の方法は後述の Profile の Profile Script Editor を参照してください。  
> - SV241 Pro の INDI ドライバーは起動時に自動的に Connect します。手動で Connect/Disconnect をするとそれより先に接続されているUSB機器の再接続が発生しそれらの機器のINDIドライバーが正常に動作しなくなる場合があります。

## Ekos > Profile > Script

![Profile](./images/profile.webp)

前述の通り SV241 Pro に接続されるデバイスがある場合、それらのデバイスよりも先に　SV241 Pro INDIドライバーを起動しコネクトさせる必要があります。
そのためには Ekos の Profile Editor の右下 [Scripts] ポタンから Profile Scripts Editor を開き SV241 Pro の実行順を制御するための待ち時間を設定しなければなりません。

### Profile Script Editor での追加の手順

1. [Add Rule] で Rule を1行追加する。
2. Driver: "SVBONY SV241 Pro" を指定。
3. Post start: SV241 Pro INDIドライバー起動時の待ち時間を秒で指定する。指定の秒数間、他のドライバーは起動待ちになる。
4. Pre stop: Ekos [Stop] から SV241 Pro が終了開始するまでの待ち時間を指定する。他のドライバーが終了するのに十分な時間を指定しする。指定の時間が経過後つまり他のドライバーが終了後に SV241 Pro が終了する。

## Connection

![connection](./images/connection.webp)

コンピューターとSV241 Proの接続設定をします。

- System Ports: 選択可能なシリアルポートの一覧。
- Ports: 直接ポート名を入力できます。
- Baud Rate: 115200 固定です。変更しないでください。
- Auto Search:
  - Enables:自動的に接続先のシリアルポートを検出します。
  - Disabled: 手動で指定したシリアルポートで接続を試みます。
- Refresh > Scan Ports: コンピューターの現在のシリアルポートを検索し直し、System Ports の一覧をリフレッシュします。

## Dew

![Dew](./images/dew.webp)

PWM OUT 1 と 2 を操作できます。

- Toggle Dew: PWM 1 と 2 の ON/OFFの切り替え。
- Duty Cycle: PWM 1 と 2 の出力レベルを0%から100%で設定。Toggle Dew が ON の場合に設定したレベルが有効。

## Power

![Power](./images/power.webp)

DC 1から5 を操作できます。

- Cycle Power: DC 1-5 および REGULATED OUT, PWM OUT 1,2 をすべてOFFにし続けてONにする。
- Toggle DC: DC 1 から 5 の ON/OFFの切り替え。

## Variable

![Variable](./images/variable.webp)

REGULATED OUT を操作できます。

- Channels: REGUALATED OUT の ON/OFF 切り替え。
- Voltage: 出力電圧を0から15.3の間で変更。ChannelsがONの場合に設定した出力電圧が有効。

## USB

![USB](./images/USB.webp)

USBコネクタ Type-Cおよび1から5 を操作できます。

- Ports: USB Type-C,1,2 および USB 3,4,5 を切り替え。