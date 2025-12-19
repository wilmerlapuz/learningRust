import { curriculum } from '$lib/data/curriculum';
import type { Lesson } from '$lib/data/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
    /**
     * Groups lessons by Phase, then Chapter for the sidebar navigation.
     */
    const phases = curriculum.reduce<Record<string, Record<string, Lesson[]>>>((acc, lesson) => {
        const phaseName = lesson.phase;
        const chapterName = lesson.chapter;

        if (!acc[phaseName]) {
            acc[phaseName] = {};
        }
        if (!acc[phaseName][chapterName]) {
            acc[phaseName][chapterName] = [];
        }

        acc[phaseName][chapterName].push(lesson as Lesson);
        return acc;
    }, {});

    return {
        phases,
        url: url.pathname
    };
};
