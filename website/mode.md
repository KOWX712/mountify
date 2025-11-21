# Modes

## Tmpfs Mode
**tmpfs backed**

1. `touch /data/adb/modules/module_id/skip_mount`
2. Copies contents of `/data/adb/modules/module_id` to `/mnt/vendor/fake_folder_name`
3. Mirrors SELinux context of every file from `/data/adb/modules/module_id` to `/mnt/vendor/fake_folder_name`
4. Loops 2 and 3 for all modules
5. Overlays `/mnt/vendor/fake_folder_name/system/bin` to `/system/bin` and other folders

### Configuration
- `test_decoy_mount=1` to enable testing for decoy mounts on tmpfs mode.

## Ext4 Sparse Mode
**ext4-sparse-on-tmpfs backed**

1. `touch /data/adb/modules/module_id/skip_mount`
2. Create an ext4 sparse image, mount it on `/mnt/vendor/fake_folder_name`
3. Copies contents of `/data/adb/modules/module_id` to `/mnt/vendor/fake_folder_name`
4. Mirrors SELinux context of every file from `/data/adb/modules/module_id` to `/mnt/vendor/fake_folder_name`
5. Loops 3 and 4 for all modules
6. Unmounts, resizes and remounts sparse image to `/mnt/vendor/fake_folder_name`
7. Overlays `/mnt/vendor/fake_folder_name/system/bin` to `/system/bin` and other folders

### Why?
- Magic mount drastically increases mount count, making detection possible (zimperium).
- OverlayFS mounting with ext4 image upperdir is detectable due to it creating device nodes on `/proc/fs`, while yes ext4 `/data` as overlay source is possible, this is rare nowadays.
- F2FS `/data` as overlay source fails with native casefolding (ovl_dentry_weird), so only sdcardfs users can use `/data` as overlay source.
- Frankly, I dont see a way to this module mounting situation, this shit is more of a shitty band-aid.

### But ext4 sparse mode creates ext4 nodes!
- This is added to accomodate something like GPU drivers.
- This causes detections but YMMV.
- This is not my problem, this is a fallback, not the main recommendation.
- And yes this is basically how Official KernelSU used to do it.
- If you're on GKI 5.10+, theres an experimental LKM that nukes these nodes.
- If you're on KernelSU 22105+ this is automatically handled.

### Configuration
- `use_ext4_sparse=1` to force using ext4 mode if your setup is tmpfs_xattr capable.
- `spoof_sparse=1` to try spoof sparse mount as an android service.
- `FAKE_APEX_NAME="com.android.mntservice"` to customize that android service spoofed name.
- `sparse_size="2048"` to set your sparse size (in MB) to whatever you want.
- `enable_lkm_nuke=1` to try load an experimental LKM.
- `lkm_filename="nuke.ko"` to define LKM's filename.
