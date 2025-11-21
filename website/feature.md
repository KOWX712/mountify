# Features & Configuration

Configuration is located at `/data/adb/mountify/config.sh`.

## Module Mounting
`mountify_mounts`
- `0`: Disable
- `1`: Manual mode (mounts modules found on `modules.txt`)
- `2`: Auto mode (mounts all modules with a system folder) [Default]

## Fake Mount Name
`FAKE_MOUNT_NAME`
- Default: `"mountify"`
- Customize the fake folder name in `/mnt/vendor/`.

## Service Restart
`mountify_stop_start`
- `0`: Disable [Default]
- `1`: Enable
- Restart Android at service. Needed for certain modules (e.g., bootanimations, GPU drivers).

## Decoy Mount (Tmpfs)
`test_decoy_mount`
- `0`: Disable [Default]
- `1`: Enable
- Test for decoy mounting on tmpfs mode.

## Ext4 Sparse Mode Settings
`use_ext4_sparse`
- `0`: Disable [Default]
- `1`: Enable
- Force using ext4 mode if your setup is tmpfs_xattr capable.

`spoof_sparse`
- `0`: Disable [Default]
- `1`: Enable
- Spoof sparse mount as an android service.

`FAKE_APEX_NAME`
- Default: `"com.android.mntservice"`
- Customize the android service spoofed name.

`sparse_size`
- Default: `"2048"`
- Sparse size in MB.

## LKM Nuke (Experimental)
`enable_lkm_nuke`
- `0`: Disable [Default]
- `1`: Enable
- Loads a oneshot LKM that unregisters ext4 sysfs nodes.

`lkm_filename`
- Default: `"nuke.ko"`

## Advanced / Debug
`mountify_expert_mode`
- `0`: Disable [Default]
- `1`: Enable
- Disables mountify's safety checks.

`FS_TYPE_ALIAS`
- Default: `"overlay"`
- Customized overlayfs driver alias.

`MOUNT_DEVICE_NAME`
- Default: `"overlay"`
- Device name for unmount purposes (e.g., "KSU", "APatch", "magisk").

`mountify_custom_umount`
- `0`: Disable [Default]
- `1`: susfs4ksu
- `2`: ksud kernel umount (ksu 22106+)
