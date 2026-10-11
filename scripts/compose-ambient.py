"""Compose the site's original, seamlessly periodic ambient recording.
Requires NumPy for this offline asset task, not for the website runtime.
"""
from pathlib import Path
import subprocess
import tempfile
import wave
import numpy as np

RATE = 44100
SECONDS = 48
length = RATE * SECONDS
t = np.arange(length, dtype=np.float64) / RATE
song = np.zeros((length, 2), dtype=np.float64)
# Frequencies lie on the recording's period, keeping the pad boundary continuous.
for index, midi in enumerate([48, 55, 60, 62, 67, 72, 74, 79]):
    frequency = round(440 * 2 ** ((midi - 69) / 12) * SECONDS) / SECONDS
    breath = 0.75 + 0.25 * np.cos(2 * np.pi * t / SECONDS + index * 0.8)
    tone = (np.sin(2 * np.pi * frequency * t + index) + 0.17 * np.sin(4 * np.pi * frequency * t + index)) * breath * 0.022
    pan = 0.5 + 0.3 * np.sin(index * 2.1)
    song[:, 0] += tone * np.sqrt(1 - pan)
    song[:, 1] += tone * np.sqrt(pan)
# A sparse, original bell melody; envelopes fit completely inside the loop.
melody = [(2, 72), (5, 79), (8, 74), (12, 76), (17, 72), (21, 67), (26, 74), (30, 79), (34, 76), (39, 72), (42, 74)]
for start, midi in melody:
    n = min(int(5.8 * RATE), length - int(start * RATE))
    local = np.arange(n) / RATE
    freq = 440 * 2 ** ((midi - 69) / 12)
    envelope = (1 - np.exp(-local * 35)) * np.exp(-local * 1.1) * np.clip((5.8-local) / 0.5, 0, 1)
    bell = (np.sin(2*np.pi*freq*local) + 0.23*np.sin(2*np.pi*freq*2*local) + 0.06*np.sin(2*np.pi*freq*3*local)) * envelope * 0.09
    offset = int(start * RATE)
    pan = 0.35 + 0.3 * np.sin(start)
    song[offset:offset+n, 0] += bell * np.sqrt(1-pan)
    song[offset:offset+n, 1] += bell * np.sqrt(pan)
# Periodic soft overtones create a spacious, quiet atmosphere without recordings.
for freq in [176, 220, 264]:
    f = round(freq * SECONDS) / SECONDS
    air = np.sin(2*np.pi*f*t) * (0.5 + 0.5*np.sin(2*np.pi*t/SECONDS)) * 0.005
    song += air[:, None]
song *= 0.65 / max(np.max(np.abs(song)), 1e-9)
output = Path(__file__).resolve().parents[1] / 'public/media/a-place-to-land.m4a'
with tempfile.TemporaryDirectory() as tmp:
    wav = Path(tmp) / 'ambient.wav'
    with wave.open(str(wav), 'wb') as file:
        file.setnchannels(2)
        file.setsampwidth(2)
        file.setframerate(RATE)
        file.writeframes((song * 32767).astype('<i2').tobytes())
    subprocess.run(['/usr/bin/afconvert', '-f', 'm4af', '-d', 'aac', '-b', '128000', str(wav), str(output)], check=True)
print(f'Original ambient loop: {output} ({SECONDS}s, stereo AAC)')
