# 功能与配置

配置位于 `/data/adb/mountify/config.sh`。

## 模块挂载
`mountify_mounts`
- `0`: 禁用
- `1`: 手动模式（挂载 `modules.txt` 中找到的模块）
- `2`: 自动模式（挂载所有带有 system 文件夹的模块）[默认]

## 伪装挂载名称
`FAKE_MOUNT_NAME`
- 默认: `"mountify"`
- 自定义 `/mnt/vendor/` 中的伪装文件夹名称。

## 服务重启
`mountify_stop_start`
- `0`: 禁用 [默认]
- `1`: 启用
- 在服务处重启 Android。某些模块需要（例如，启动动画，GPU 驱动程序）。

## 诱饵挂载 (Tmpfs)
`test_decoy_mount`
- `0`: 禁用 [默认]
- `1`: 启用
- 在 tmpfs 模式下启用诱饵挂载测试。

## Ext4 Sparse 模式设置
`use_ext4_sparse`
- `0`: 禁用 [默认]
- `1`: 启用
- 如果你的设置支持 tmpfs_xattr，强制使用 ext4 模式。

`spoof_sparse`
- `0`: 禁用 [默认]
- `1`: 启用
- 将 sparse 挂载伪装成 android 服务。

`FAKE_APEX_NAME`
- 默认: `"com.android.mntservice"`
- 自定义 android 服务伪装名称。

`sparse_size`
- 默认: `"2048"`
- Sparse 大小（MB）。

## LKM Nuke (实验性)
`enable_lkm_nuke`
- `0`: 禁用 [默认]
- `1`: 启用
- 加载一个一次性 LKM 来注销 ext4 sysfs 节点。

`lkm_filename`
- 默认: `"nuke.ko"`

## 高级 / 调试
`mountify_expert_mode`
- `0`: 禁用 [默认]
- `1`: 启用
- 禁用 mountify 的安全检查。

`FS_TYPE_ALIAS`
- 默认: `"overlay"`
- 自定义 overlayfs 驱动程序别名。

`MOUNT_DEVICE_NAME`
- 默认: `"overlay"`
- 用于卸载目的的设备名称（例如 "KSU", "APatch", "magisk"）。

`mountify_custom_umount`
- `0`: 禁用 [默认]
- `1`: susfs4ksu
- `2`: ksud 内核卸载 (ksu 22106+)
