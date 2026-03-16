import os
import subprocess

root_dir = r"c:\Users\ikriouile\Desktop\IDRISSPROJECT\games-sally"
os.chdir(root_dir)

# Get list of tracked files
tracked_files = set()
try:
    result = subprocess.run(["git", "ls-files"], capture_output=True, text=True, check=True)
    tracked_files = set(os.path.normpath(f) for f in result.stdout.splitlines())
except Exception as e:
    print(f"Error getting tracked files: {e}")

# Find untracked files (excluding .git and node_modules)
untracked = []
for root, dirs, files in os.walk("."):
    if ".git" in dirs:
        dirs.remove(".git")
    if "node_modules" in dirs:
        dirs.remove("node_modules")
    
    for file in files:
        rel_path = os.path.normpath(os.path.join(root, file))
        if rel_path.startswith(".\\"):
            rel_path = rel_path[2:]
        if rel_path not in tracked_files:
            untracked.append(rel_path)

print(f"Found {len(untracked)} untracked files.")

# Add them and push
if untracked:
    # Add in batches to avoid command line length limits
    batch_size = 100
    for i in range(0, len(untracked), batch_size):
        batch = untracked[i:i+batch_size]
        subprocess.run(["git", "add"] + batch)
    
    subprocess.run(["git", "commit", "-m", "Forced push of all missing game files identified by check script"])
    subprocess.run(["git", "push", "origin", "main"])
    print("Push complete.")
else:
    print("Nothing to push.")
