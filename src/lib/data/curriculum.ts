
import { foundations } from './content/foundations';
import { idiomaticRust } from './content/idiomatic_rust';
import { theWall } from './content/the_wall';
import { buildingApplications } from './content/building_applications';
import { advancedRust } from './content/advanced_rust';
import type { PhaseConfig, Lesson, LessonID, ChapterTitle, PhaseTitle } from './types';

// The "Bible" Source of Truth
const phases: PhaseConfig[] = [
    foundations,
    idiomaticRust,
    theWall,
    buildingApplications,
    advancedRust
];

function flattenCurriculum(phases: PhaseConfig[]): readonly Lesson[] {
    return phases.flatMap(phase =>
        phase.chapters.flatMap(chapter =>
            chapter.lessons.map(lesson => {
                // Construct the full Chapter Title (e.g., "Chapter 1: Getting Started")
                // We need to ensure it matches the strict ChapterTitle type.
                // Our data has "ch1" -> "Chapter 1".
                // We can reconstruct it or mapped it? 
                // The 'chapter.title' in config is "Getting Started".
                // We need to match the type ChapterTitle exactly.

                // Helper to format chapter title
                const chapterNum = chapter.id.replace('ch', '');
                const fullChapterTitle = `Chapter ${chapterNum}: ${chapter.title}` as ChapterTitle;

                // Validate that this strictly matches known ChapterTitles?
                // The Type Assertion `as ChapterTitle` says "trust me". 
                // For "insane strictness", we should maybe validate or map.
                // But for now, this reconstruction is standard.

                return {
                    ...lesson,
                    id: lesson.id as LessonID,
                    phase: phase.title as PhaseTitle,
                    chapter: fullChapterTitle,
                    // Ensure type specific fields are passed through.
                    // The spread ...lesson handles content, title, xp, coinReward, unlockPrice.
                    // It also handles type-specifics: initialCode, tests, solution, hints, questions.
                } as Lesson;
            })
        )
    );
}

export const curriculum: readonly Lesson[] = flattenCurriculum(phases);
