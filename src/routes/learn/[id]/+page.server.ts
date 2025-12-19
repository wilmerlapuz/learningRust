import { curriculum } from '$lib/data/curriculum';
import type { LessonID } from '$lib/data/types';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = ({ params }) => {
    // Cast params.id to LessonID to ensure it matches our curriculum data
    const id = params.id as LessonID;
    const lesson = curriculum.find((l) => l.id === id);

    if (!lesson) {
        throw error(404, {
            message: `Lesson "${id}" not found in the curriculum.`
        });
    }

    return {
        lesson
    };
};
