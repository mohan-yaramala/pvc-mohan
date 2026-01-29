import os

def is_valid_windows_path(path):
    # Split path into components
    parts = path.split('/')
    
    invalid_chars = set('<>:"|?*')
    reserved_names = {'CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 
                      'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'}
    
    for part in parts:
        # Check for invalid characters
        if any(char in invalid_chars for char in part):
            return False
            
        # Check for trailing space or dot
        if part.endswith(' ') or part.endswith('.'):
            return False
            
        # Check for reserved names (ignoring extension for reserved check logic usually applies to whole name but safe to avoid match)
        name_no_ext = part.split('.')[0].upper()
        if name_no_ext in reserved_names and len(part.split('.')) == 1: # Strict reserved check
             return False

    return True

def main():
    try:
        with open('file_list.txt', 'r', encoding='utf-8', errors='ignore') as f:
            files = [line.strip() for line in f if line.strip()]
    except Exception as e:
        print(f"Error reading file_list.txt: {e}")
        return

    valid_files = []
    invalid_count = 0
    
    for file_path in files:
        # Unquote if necessary (git ls-tree output might quote paths with spaces/special chars)
        path_to_check = file_path
        if path_to_check.startswith('"') and path_to_check.endswith('"'):
            # This is a naive unquote, better to use standard handling if complex, but sufficient for simple quotes
            path_to_check = path_to_check[1:-1]
            # Handle escaped characters if any? Git escaping style.
            # For now, let's assume standard listing. If quoted, it usually means special chars.
            # Git quotes using octal \nnn. It's complex.
            # Only skipping known problematic ones.

        if is_valid_windows_path(path_to_check):
            valid_files.append(file_path) # Keep original quoting for git command input if possible?
            # Actually pathspec-from-file expects raw paths usually, or quoted?
            # Git documentation says: "If --pathspec-from-file is used, the pathspec elements are passed in the file... Pathspec elements are separated by LF or CR/LF. Pathspec elements can be quoted."
        else:
            invalid_count += 1
            print(f"Skipping invalid: {path_to_check}")

    print(f"Total files: {len(files)}")
    print(f"Valid files: {len(valid_files)}")
    print(f"Invalid files: {invalid_count}")
    
    with open('valid_files.txt', 'w', encoding='utf-8') as f:
        for vf in valid_files:
            f.write(vf + '\n')

if __name__ == '__main__':
    main()
