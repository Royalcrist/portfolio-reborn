// TODO: remove after review
// import ParagraphBlock from '../blocks/ParagraphBlock';
// import HomeSectionBlock from '../blocks/HomeSectionBlock';
// import HomeProjectsBlock from '../blocks/HomeProjectsBlock';
// import TimelineBlock from '../blocks/TimelineBlock';
// import SkillsBlock from '../blocks/SkillsBlock';

import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import HomeSectionBlock from '../blocks/HomeSectionBlock';
import ProjectSectionBlock from '../blocks/ProjectSectionBlock';
import { ProviderContext } from '../../providers/Provider';
import { getSectionId } from '../../lib/helpers';

export default function BlocksBuilder({ info }: { info: any }) {
	const { sections, skillCategories } = info;

	return (
		<>
			{sections.map((section: any) => {
				const id = getSectionId(section);

				const sectionElements: any = {
					// ComponentPagesParagraph: (
					// 	<ParagraphBlock id={section.id} key={section.id} {...section} />
					// ),
					ComponentPagesHomeSection: (
						<HomeSectionBlock {...section} id={id} key={section.id} />
					),
					ComponentPagesHomeProjectSection: (
						<ProjectSectionBlock {...section} id={id} key={section.id} />
					),
					// TODO Apply the new design
					// ComponentPagesTimeline: (
					// 	<TimelineBlock key={section.id} {...section} />
					// ),
					// ComponentPagesSkills: (
					// 	<SkillsBlock
					// 		id={section.id}
					// 		key={section.id}
					// 		skillCategories={skillCategories}
					// 		{...section}
					// 	/>
					// ),
				};

				return sectionElements[section['__typename']];
			})}
		</>
	);
}
