#!/usr/bin/env python3
"""
PNG Metadata Cleaner for Android AAPT Compatibility
This script re-saves PNG files to remove problematic metadata that causes AAPT errors.
"""

from PIL import Image
import os
import sys

def fix_png(filepath):
    """Re-save PNG to clean metadata while preserving image content."""
    try:
        # Open the image
        img = Image.open(filepath)
        
        # Convert to RGBA if has transparency, else RGB
        if img.mode in ('RGBA', 'LA', 'P'):
            if img.mode == 'P':
                img = img.convert('RGBA')
            # Create a new clean image
            clean_img = Image.new('RGBA', img.size)
            clean_img.paste(img)
        else:
            clean_img = img.convert('RGB')
            clean_img = clean_img.convert('RGBA')
        
        # Save with clean metadata
        clean_img.save(filepath, 'PNG', optimize=True)
        return True, None
    except Exception as e:
        return False, str(e)

def main():
    characters_dir = r"C:\Users\mstrs\.gemini\taksici\assets\characters"
    
    if not os.path.exists(characters_dir):
        print(f"Directory not found: {characters_dir}")
        sys.exit(1)
    
    png_files = [f for f in os.listdir(characters_dir) if f.endswith('.png')]
    
    print(f"Found {len(png_files)} PNG files to process...")
    print("-" * 50)
    
    success_count = 0
    error_count = 0
    
    for filename in png_files:
        filepath = os.path.join(characters_dir, filename)
        success, error = fix_png(filepath)
        
        if success:
            print(f"✓ Fixed: {filename}")
            success_count += 1
        else:
            print(f"✗ Error: {filename} - {error}")
            error_count += 1
    
    print("-" * 50)
    print(f"Completed: {success_count} fixed, {error_count} errors")
    
    if error_count == 0:
        print("\n✅ All PNG files cleaned successfully!")
    else:
        print(f"\n⚠️ {error_count} files had errors. Check backup folder.")

if __name__ == "__main__":
    main()
