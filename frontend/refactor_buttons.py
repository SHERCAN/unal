import os
import glob
import re

paths = glob.glob('src/topics/**/*.tsx', recursive=True)

for path in paths:
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    original_text = text

    # 1. Remove VideoModal import
    text = re.sub(r"import\s+VideoModal\s+from\s+['\"].*?VideoModal['\"];\n?", "", text)

    # 2. Replace PlayBtn / PlayButton definition
    text = re.sub(r"(?s)const Play(Btn|Button)\s*=\s*\([^)]*\)\s*=>\s*\{.*?return\s*\(\s*<button.*?</button>\s*\);\s*\};", "/* PlayButton definition removed */", text)
    text = re.sub(r"(?s)const Play(Btn|Button)\s*=\s*\([^)]*\)\s*=>\s*\(\s*<button.*?</button>\s*\);", "/* PlayButton definition removed */", text)

    # 3. Replace usages
    text = re.sub(r'<PlayBtn\b', '<PlayVideoButton', text)
    text = re.sub(r'</PlayBtn>', '</PlayVideoButton>', text)
    text = re.sub(r'<PlayButton\b', '<PlayVideoButton', text)
    text = re.sub(r'</PlayButton>', '</PlayVideoButton>', text)

    # 4. Remove VideoModal component instantiation
    text = re.sub(r"(?s)<VideoModal\s+isOpen=\{[^\}]+\}.*?/>", "{/* VideoModal removed */}", text)

    # 5. Remove states and handlers
    text = re.sub(r"(?s)const\s+\[videoModal,\s*setVideoModal\]\s*=\s*useState<[^>]+>\(\{.*?\}\);", "/* videoModal list removed */", text)
    text = re.sub(r"(?s)const\s+handleVideoComplete\s*=\s*\(\)\s*=>\s*\{.*?\};", "/* handleVideoComplete removed */", text)
    text = re.sub(r"(?s)const\s+openVideo\s*=\s*\(.*?\)\s*=>\s*\{.*?\};", "/* openVideo removed */", text)
    text = re.sub(r"const\s+currentTracking(Id)?Ref\s*=\s*React\.useRef<string\s*\|\s*undefined>\(undefined\);", "/* ref removed */", text)
    text = re.sub(r"const\s+currentTracking(Id)?Ref\s*=\s*useRef<string\s*\|\s*undefined>\(undefined\);", "/* ref removed */", text)

    # Add import if needed
    if ('<PlayVideoButton' in text) and ('PlayVideoButton' not in original_text):
        if "'use client';\n" in text:
            text = text.replace("'use client';\n", "'use client';\nimport { PlayVideoButton } from '@/components/PlayVideoButton';\n")
        elif "import React" in text:
            text = re.sub(r"(import React.*?;\n)", r"\1import { PlayVideoButton } from '@/components/PlayVideoButton';\n", text, count=1)

    if text != original_text:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Updated {path}")
