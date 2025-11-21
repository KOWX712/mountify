# 模式

## Tmpfs 模式
**基于 tmpfs**

1. `touch /data/adb/modules/module_id/skip_mount`
2. 将 `/data/adb/modules/module_id` 的内容复制到 `/mnt/vendor/fake_folder_name`
3. 将 `/data/adb/modules/module_id` 中每个文件的 SELinux 上下文镜像到 `/mnt/vendor/fake_folder_name`
4. 对所有模块循环执行步骤 2 和 3
5. 将 `/mnt/vendor/fake_folder_name/system/bin` 覆盖挂载到 `/system/bin` 和其他文件夹

### 配置
- `test_decoy_mount=1` 在 tmpfs 模式下启用诱饵挂载测试。

## Ext4 Sparse 模式
**基于 tmpfs 上的 ext4-sparse**

1. `touch /data/adb/modules/module_id/skip_mount`
2. 创建一个 ext4 sparse 镜像，挂载到 `/mnt/vendor/fake_folder_name`
3. 将 `/data/adb/modules/module_id` 的内容复制到 `/mnt/vendor/fake_folder_name`
4. 将 `/data/adb/modules/module_id` 中每个文件的 SELinux 上下文镜像到 `/mnt/vendor/fake_folder_name`
5. 对所有模块循环执行步骤 3 和 4
6. 卸载，调整大小并重新挂载 sparse 镜像到 `/mnt/vendor/fake_folder_name`
7. 将 `/mnt/vendor/fake_folder_name/system/bin` 覆盖挂载到 `/system/bin` 和其他文件夹

### 为什么？
- Magic mount 会急剧增加挂载计数，使检测成为可能 (zimperium)。
- 使用 ext4 镜像 upperdir 的 OverlayFS 挂载由于在 `/proc/fs` 上创建设备节点而是可检测的，虽然 ext4 `/data` 作为 overlay 源是可能的，但这在现在很少见。
- F2FS `/data` 作为 overlay 源在原生 casefolding (ovl_dentry_weird) 下会失败，所以只有 sdcardfs 用户可以使用 `/data` 作为 overlay 源。
- 坦率地说，我看不到这种模块挂载情况的出路，这更像是一个糟糕的权宜之计。

### 但是 ext4 sparse 模式会创建 ext4 节点！
- 这是为了适应像 GPU 驱动程序之类的东西。
- 这会导致检测，但因人而异。
- 这不是我的问题，这是一个后备方案，不是主要推荐。
- 是的，这基本上就是官方 KernelSU 过去的做法。
- 如果你在 GKI 5.10+ 上，有一个实验性的 LKM 可以清除这些节点。
- 如果你在 KernelSU 22105+ 上，这是自动处理的。

### 配置
- `use_ext4_sparse=1` 如果你的设置支持 tmpfs_xattr，强制使用 ext4 模式。
- `spoof_sparse=1` 尝试将 sparse 挂载伪装成 android 服务。
- `FAKE_APEX_NAME="com.android.mntservice"` 自定义该 android 服务伪装名称。
- `sparse_size="2048"` 设置你的 sparse 大小（以 MB 为单位）。
- `enable_lkm_nuke=1` 尝试加载一个实验性的 LKM。
- `lkm_filename="nuke.ko"` 定义 LKM 的文件名。
