import { curriculum } from './data/curriculum';

interface StoredProgress {
    completed: string[];
    xp: number;
    coins: number;
    unlocked: string[]; // Lesson IDs
    purchasedHints: Record<string, number[]>; // lessonId -> [hintIndex]
}

class ProgressState {
    #completed = $state<string[]>([]);
    #xp = $state(0);
    #coins = $state(0);
    // Explicitly unlocked lessons (purchased). 
    // Note: Free lessons don't need to be here if we check cost=0
    #unlocked = $state<string[]>([]);
    #purchasedHints = $state<Record<string, number[]>>({});

    #storageKey = 'js-mastery-progress';

    constructor() {
        if (typeof window !== 'undefined') {
            this.#load();
        }
    }

    #load(): void {
        const stored = localStorage.getItem(this.#storageKey);
        if (!stored) return;

        try {
            const data = JSON.parse(stored) as Partial<StoredProgress>;
            this.#completed = Array.isArray(data.completed) ? data.completed : [];
            this.#xp = typeof data.xp === 'number' ? data.xp : 0;
            this.#coins = typeof data.coins === 'number' ? data.coins : 0;
            this.#unlocked = Array.isArray(data.unlocked) ? data.unlocked : [];
            this.#purchasedHints = data.purchasedHints || {};
        } catch (e: unknown) {
            console.error('Failed to parse progress storage:', e instanceof Error ? e.message : 'Unknown error');
        }
    }

    get completed(): string[] { return this.#completed; }
    get xp(): number { return this.#xp; }
    get coins(): number { return this.#coins; }
    get unlocked(): string[] { return this.#unlocked; }

    // Level calc remains same
    get level(): number { return Math.floor(this.#xp / 100) + 1; }

    get mastery(): number {
        const total = curriculum.length;
        if (total === 0) return 0;
        return Math.round((this.#completed.length / total) * 100);
    }

    isUnlocked(lessonId: string, price: number): boolean {
        if (price === 0) return true;
        return this.#unlocked.includes(lessonId);
    }

    unlockLesson(lessonId: string, price: number): boolean {
        if (this.#coins >= price && !this.#unlocked.includes(lessonId)) {
            this.#coins -= price;
            this.#unlocked.push(lessonId);
            this.#persist();
            return true;
        }
        return false;
    }

    hasPurchasedHint(lessonId: string, hintIndex: number): boolean {
        return this.#purchasedHints[lessonId]?.includes(hintIndex) ?? false;
    }

    purchaseHint(lessonId: string, hintIndex: number, cost: number): boolean {
        if (cost === 0) return true; // Free hints always accessible
        if (this.hasPurchasedHint(lessonId, hintIndex)) return true;

        if (this.#coins >= cost) {
            this.#coins -= cost;
            if (!this.#purchasedHints[lessonId]) {
                this.#purchasedHints[lessonId] = [];
            }
            this.#purchasedHints[lessonId].push(hintIndex);
            this.#persist();
            return true;
        }
        return false;
    }

    save(lessonId: string, xpEarned: number, coinReward: number): { type: 'first' | 'replay', coins: number } {
        if (!this.#completed.includes(lessonId)) {
            this.#completed.push(lessonId);
            this.#xp += xpEarned;
            this.#coins += coinReward;
            this.#persist();
            return { type: 'first', coins: coinReward };
        } else {
            // Replay Reward: 20% of base reward (min 1 coin) to prevent soft-locks
            const replayCoins = Math.max(1, Math.floor(coinReward * 0.2));
            this.#coins += replayCoins;
            this.#persist();
            return { type: 'replay', coins: replayCoins };
        }
    }

    #persist(): void {
        if (typeof window === 'undefined') return;

        const data: StoredProgress = {
            completed: this.#completed,
            xp: this.#xp,
            coins: this.#coins,
            unlocked: this.#unlocked,
            purchasedHints: this.#purchasedHints
        };
        localStorage.setItem(this.#storageKey, JSON.stringify(data));
    }

    reset(): void {
        this.#completed = [];
        this.#xp = 0;
        this.#coins = 0;
        this.#unlocked = [];
        this.#purchasedHints = {};
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.#storageKey);
        }
    }
}

export const progress = new ProgressState();
