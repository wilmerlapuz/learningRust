
import { foundations } from './content/foundations';
import { idiomaticRust } from './content/idiomatic_rust';
import { theWall } from './content/the_wall';
import { buildingApplications } from './content/building_applications';
import { advancedRust } from './content/advanced_rust';
import { mastery } from './content/mastery';
import type { PhaseConfig, Lesson, LessonID, ChapterTitle, PhaseTitle } from './types';

// The "Bible" Source of Truth
const phases: PhaseConfig[] = [
    foundations,
    idiomaticRust,
    theWall,
    buildingApplications,
    advancedRust,
    mastery
];

function flattenCurriculum(phases: PhaseConfig[]): readonly Lesson[] {
    return phases.flatMap(phase =>
        phase.chapters.flatMap(chapter => {
            // Flatten sections: Theory first, then Challenges (per section)
            // This preserves the "Read -> Do" loop.
            const sectionLessons = chapter.sections.flatMap(section => [
                ...section.theory,
                ...section.challenges
            ]);

            // Combine all lessons including the mandatory quiz
            const allInputs = [...sectionLessons, chapter.quiz];

            return allInputs.map(lesson => {
                // Construct the full Chapter Title (e.g., "Chapter 1: Getting Started")
                const chapterNum = chapter.id.replace('ch', '');
                const fullChapterTitle = `Chapter ${chapterNum}: ${chapter.title}` as ChapterTitle;

                return {
                    ...lesson,
                    id: lesson.id as LessonID,
                    phase: phase.title as PhaseTitle,
                    chapter: fullChapterTitle,
                    // Ensure type specific fields are passed through.
                } as Lesson;
            })
        })
    );
}

export const curriculum: readonly Lesson[] = flattenCurriculum(phases);
