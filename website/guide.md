# Guide

## Introduction

Mountify allows you to globally mount modules via OverlayFS. It is mostly meant for [MKSU .nomount](https://github.com/5ec1cff/KernelSU/commit/76bfccd11f4c8953b35e1342a2461f45b7d21c22), but works on APatch and Magisk too. It can also act as a KernelSU metamodule.

**Requirements:**
- `CONFIG_OVERLAY_FS=y` is required.
- `CONFIG_TMPFS_XATTR=y` is highly encouraged.

It tries to mimic an OEM mount, like `/mnt/vendor/my_bigball`.

For module devs, you can also use [this standalone script](https://github.com/backslashxx/mountify/tree/standalone-script).

## Usage

- User-friendly config editing is available on the WebUI.
- Otherwise you can modify `/data/adb/mountify/config.sh`.

### General
- By default, mountify mounts all modules with a system folder. `mountify_mounts=2`
- To mount specific modules only, edit `config.sh`, set `mountify_mounts=1` then modify `modules.txt` to list modules you want mounted.

```text
module_id
Adreno_Gpu_Driver
DisplayFeatures
ViPER4Android-RE-Fork
mountify_whiteouts
```

- `FAKE_MOUNT_NAME="mountify"` to set a custom fake folder name.
- `mountify_stop_start=1` to restart android at service (needed for certain modules).

### Need Unmount?
- Use either NeoZygisk, NoHello, ReZygisk, Zygisk Assistant.
- If you use Zygisk Next, then set Denylist Policy to "Enforced" or "Unmount Only".
- Then edit `config.sh`:
    - `MOUNT_DEVICE_NAME="APatch"` if you're on APatch.
    - `MOUNT_DEVICE_NAME="KSU"` if you're on KernelSU forks.
    - `MOUNT_DEVICE_NAME="magisk"` if you're on Magisk.
- `mountify_custom_umount=0` modify this value to enable known in-kernel umount methods.
    - NOTE: zygisk provider umount is still better, this is here as a second choice.

### Skip Mounting
To skip mounting a specific module:
1. Add `skip_mountify` to your module's folder.
2. Mountify checks this on `/data/adb/modules/module_name/skip_mountify`.

## Limitations / Recommendations

- Fails with [De-Bloater](https://github.com/sunilpaulmathew/De-Bloater), as it [uses dummy text, NOT proper whiteouts](https://github.com/sunilpaulmathew/De-Bloater/blob/cadd523f0ad8208eab31e7db51f855b89ed56ffe/app/src/main/java/com/sunilpaulmathew/debloater/utils/Utils.java#L112).
- I recommend [System App Nuker](https://github.com/ChiseWaguri/systemapp_nuker/releases) instead. It uses proper whiteouts.

## Support / Warranty

None, none at all. I am handing you a sharp knife, it is not on me if you stab yourself with it.
