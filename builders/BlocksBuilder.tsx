// TODO: remove after review
// import ParagraphBlock from '../blocks/ParagraphBlock';
// import HomeSectionBlock from '../blocks/HomeSectionBlock';
// import HomeProjectsBlock from '../blocks/HomeProjectsBlock';
// import TimelineBlock from '../blocks/TimelineBlock';
// import SkillsBlock from '../blocks/SkillsBlock';

import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import HomeSectionBlock from '../components/blocks/HomeSectionBlock';
import { ProviderContext } from '../providers/Provider';

export default function BlocksBuilder({ info }: { info: any }) {
	const { sections, skillCategories } = info;
	const { blockBuilderDispatch } = useContext(ProviderContext);
	const { locale } = useRouter();

	return (
		<>
			{sections.map((section: any) => {
				const sectionElements: any = {
					// ComponentPagesParagraph: (
					// 	<ParagraphBlock id={section.id} key={section.id} {...section} />
					// ),
					ComponentPagesHomeSection: (
						<HomeSectionBlock id={section.id} key={section.id} {...section} />
					),
					// ComponentPagesHomeProjectSection: (
					// 	<HomeProjectsBlock id={section.id} key={section.id} {...section} />
					// ),
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
