// Web Audio API Sound Synthesizer for AI Fortune & Lottery App
class SoundEffects {
    constructor() {
        this.ctx = null;
        this.isMuted = localStorage.getItem('sound_muted') === 'true';
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('sound_muted', this.isMuted);
        return this.isMuted;
    }

    // Rattling sound for shaking fortune sticks
    playShake() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // White noise burst with bandpass filter
        const bufferSize = this.ctx.sampleRate * 0.15;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400 + Math.random() * 400, now);
        filter.Q.setValueAtTime(3.0, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
    }

    // Tick sound for spinning roller
    playTick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600 + Math.random() * 200, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.045);
    }

    // Lock sound when number is fixed
    playLock() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now); // A5
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.36);
    }

    // Fanfare / chime when fortune is revealed
    playFanfare() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Harmonious pentatonic arpeggio)
        const now = this.ctx.currentTime;

        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.09);

            gain.gain.setValueAtTime(0.2, now + i * 0.09);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.5);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + i * 0.09);
            osc.stop(now + i * 0.09 + 0.55);
        });
    }

    // Deep Tibetan temple bell / singing bowl sound
    playBell() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Fundamental and subtle overtones for bell resonance
        const harmonics = [
            { f: 432, g: 0.25, dur: 1.8 },
            { f: 864, g: 0.12, dur: 1.2 },
            { f: 1296, g: 0.06, dur: 0.8 }
        ];

        harmonics.forEach(h => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(h.f, now);

            gain.gain.setValueAtTime(h.g, now);
            gain.gain.exponentialRampToValueAtTime(0.0005, now + h.dur);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + h.dur + 0.1);
        });
    }

    // Triumphant jackpot / firecracker burst for Super Hot numbers
    playJackpot() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
        const now = this.ctx.currentTime;

        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.07);

            gain.gain.setValueAtTime(0.25, now + i * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + i * 0.07);
            osc.stop(now + i * 0.07 + 0.5);
        });
    }
}

window.soundFX = new SoundEffects();
