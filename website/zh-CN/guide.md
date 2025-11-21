# 指南

## 简介

Mountify 允许你通过 OverlayFS 全局挂载模块。它主要用于 [MKSU .nomount](https://github.com/5ec1cff/KernelSU/commit/76bfccd11f4c8953b35e1342a2461f45b7d21c22)，但也适用于 APatch 和 Magisk。它也可以作为 KernelSU 元模块使用。

**要求：**
- 必须开启 `CONFIG_OVERLAY_FS=y`。
- 强烈建议开启 `CONFIG_TMPFS_XATTR=y`。

它试图模拟 OEM 挂载，例如 `/mnt/vendor/my_bigball`。

对于模块开发者，你也可以使用 [这个独立脚本](https://github.com/backslashxx/mountify/tree/standalone-script)。

## 用法

- 可以在 WebUI 上进行用户友好的配置编辑。
- 否则你可以修改 `/data/adb/mountify/config.sh`。

### 常规
- 默认情况下，mountify 会挂载所有带有 system 文件夹的模块。`mountify_mounts=2`
- 要仅挂载特定模块，请编辑 `config.sh`，设置 `mountify_mounts=1`，然后修改 `modules.txt` 列出你想要挂载的模块。

```text
module_id
Adreno_Gpu_Driver
DisplayFeatures
ViPER4Android-RE-Fork
mountify_whiteouts
```

- `FAKE_MOUNT_NAME="mountify"` 设置自定义伪装文件夹名称。
- `mountify_stop_start=1` 在服务处重启 Android（某些模块需要）。

### 需要卸载？
- 使用 NeoZygisk, NoHello, ReZygisk, Zygisk Assistant 之一。
- 如果你使用 Zygisk Next，请将 Denylist Policy 设置为 "Enforced" 或 "Unmount Only"。
- 然后编辑 `config.sh`：
    - 如果你是 APatch，设置 `MOUNT_DEVICE_NAME="APatch"`。
    - 如果你是 KernelSU 分支，设置 `MOUNT_DEVICE_NAME="KSU"`。
    - 如果你是 Magisk，设置 `MOUNT_DEVICE_NAME="magisk"`。
- `mountify_custom_umount=0` 修改此值以启用已知的内核内卸载方法。
    - 注意：zygisk 提供程序的卸载仍然更好，这只是作为第二选择。

### 跳过挂载
要跳过挂载特定模块：
1. 在你的模块文件夹中添加 `skip_mountify`。
2. Mountify 会检查 `/data/adb/modules/module_name/skip_mountify`。

## 限制 / 建议

- 与 [De-Bloater](https://github.com/sunilpaulmathew/De-Bloater) 不兼容，因为它 [使用虚拟文本，而不是正确的 whiteouts](https://github.com/sunilpaulmathew/De-Bloater/blob/cadd523f0ad8208eab31e7db51f855b89ed56ffe/app/src/main/java/com/sunilpaulmathew/debloater/utils/Utils.java#L112)。
- 我推荐 [System App Nuker](https://github.com/ChiseWaguri/systemapp_nuker/releases)。它使用正确的 whiteouts。

## 支持 / 保修

无，完全没有。我递给你一把锋利的刀，如果你用它刺伤自己，那不是我的错。
