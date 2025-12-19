/**
 * Web Audio API based sound system for JS Mastery.
 * Generates synthesizer sounds to avoid external asset dependencies.
 */

class SoundSystem {
    #audioCtx: AudioContext | null = null;

    init() {
        if (this.#audioCtx || typeof window === 'undefined') return;
        this.#audioCtx = new AudioContext();
    }

    /**
     * Plays a high-pitched "Success" chime.
     */
    playSuccess() {
        this.#playSound([880, 1108, 1318], 'triangle', 0.1, 0.4);
    }

    /**
     * Plays a low-pitched "Failure" thud.
     */
    playError() {
        this.#playSound([220, 110], 'sawtooth', 0.05, 0.2);
    }

    /**
     * Plays a subtle "Click" or feedback sound for minor tasks.
     */
    playFeedback() {
        this.#playSound([440, 880], 'sine', 0.02, 0.1);
    }

    #playSound(frequencies: number[], type: OscillatorType, volume: number, duration: number) {
        if (!this.#audioCtx) this.init();
        if (!this.#audioCtx) return;

        const now = this.#audioCtx.currentTime;
        const masterGain = this.#audioCtx.createGain();
        masterGain.connect(this.#audioCtx.destination);
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(volume, now + 0.02);
        masterGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        frequencies.forEach((freq, i) => {
            const osc = this.#audioCtx!.createOscillator();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now + i * 0.05);
            osc.connect(masterGain);
            osc.start(now);
            osc.stop(now + duration);
        });
    }
}

export const sounds = new SoundSystem();
