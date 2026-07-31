/**
 * Web Audio API Ambient Spiritual Chime & Drone Generator
 * Creates a soothing, gentle ambient harmonic tone for Yuva Parayan 2026.
 */

class AudioSynth {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  public init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.stop(); // clear old notes

    // Frequencies representing a serene Indian classical scale (Sa-Pa-Sa / D Major Tanpura harmonic)
    // D3, A3, D4, F#4 (approx frequencies in Hz)
    const freqs = [146.83, 220.00, 293.66, 369.99];

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 3);

    this.oscillators = freqs.map((freq) => {
      const osc = this.audioCtx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime);

      const oscGain = this.audioCtx!.createGain();
      oscGain.gain.setValueAtTime(0.25, this.audioCtx!.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode!);
      osc.start();
      return osc;
    });

    this.gainNode.connect(this.audioCtx.destination);
    this.isPlaying = true;
  }

  public stop() {
    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
        setTimeout(() => {
          this.oscillators.forEach((osc) => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          this.oscillators = [];
        }, 1000);
      } catch {
        this.oscillators.forEach((osc) => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.oscillators = [];
      }
    }
    this.isPlaying = false;
  }

  public playChime() {
    this.init();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.6); // A5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientSynth = new AudioSynth();
