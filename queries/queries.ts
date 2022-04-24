import { gql } from '@apollo/client';

type QueryDispatcher =
	| 'HOME'
	| 'PROFILE'
	| 'PROJECTS'
	| 'PROJECTS_HOME'
	| 'SOCIAL_MEDIA'
	| 'SKILLS'
	| 'PROJECTS_COUNT';

export default function queries(
	dispatcher: QueryDispatcher[] | QueryDispatcher,
) {
	if (typeof dispatcher === 'string') {
		dispatcher = [dispatcher];
	}

	const query = dispatcher.reduce(
		(query: string, dispatcher: QueryDispatcher) => {
			return `
			${query}
			${getQuery(dispatcher)}`;
		},
		``,
	);

	return gql`
	query Data($locale: String) {
		${query}
	}`;
}

function getQuery(dispatcher: string) {
	const queriesDispatcher: any = {
		HOME: `
		home(locale: $locale) {
			sections {
				... on ComponentPagesHomeSection {
					__typename
					id
					linkId: link_id
					title
					upperTitle
					description
					url
					actionText: action_text {
						title
					}
					image {
						id
						name
						alternativeText
						width
						height
						formats
						url
						previewUrl
					}
					color {
						id
						name
					}
					contactLinks {
						__typename
						id
						title
						url
						icon {
							__typename
							id
							name
							alternativeText
							width
							height
							url
							previewUrl
						}
					}
				}
				... on ComponentPagesHomeProjectSection {
					__typename
					id
					auto_scroll
				}
			}
		}
		`,

		PROFILE: `
		profile(locale: $locale) {
			title
			subtitle
			description
			color {
				id
				name
			}
			images {
				id
				name
				alternativeText
				width
				height
				formats
				url
				previewUrl
			}
			sections {
				... on ComponentPagesSkills {
					__typename
					id
					title
				}
				... on ComponentPagesParagraph {
					__typename
					id
					paragraph
				}
				... on ComponentPagesTimeline {
					__typename
					id
					items {
						id
						title
						date
						description
					}
				}
			}
		}
		`,

		PROJECTS_HOME: `
		projects(locale: $locale, sort: "highlight:desc,commingSoon:asc" ) {
			id
			slug
			name
			description
			actionText: action_text {
				title
			}
			commingSoon
			commingSoonText: comming_soon_text {
				title
			}
			color {
				id
				name
			}
			highlight
			homepageImage {
				id
				name
				alternativeText
				width
				height
				formats
				url
				previewUrl
			}
		}
`,
		PROJECTS: `
		projects(locale: $locale, sort: "highlight:desc,commingSoon:asc") {
			id
			slug
			name
			description
			start
			end
			action_text {
				title
			}
			commingSoon
			commingSoonText: comming_soon_text {
				title
			}
			color {
				id
				name
			}
			highlight
			cover {
				name
				alternativeText
				width
				height
				formats
				url
				previewUrl
			}
			images {
				id
				name
				alternativeText
				width
				height
				formats
				url
				previewUrl
			}
		}
		`,

		PROJECTS_COUNT: `
		projectsCount(locale: $locale)
		`,

		SOCIAL_MEDIA: `
		socialMedias {
			id
			name
			url
			icon {
				id
				name
				alternativeText
				width
				height
				formats
				url
			}
		}
		`,

		SKILLS: `
		skillCategories(locale: $locale, sort: "order:desc") {
			id
			title
			skills {
				id
				title
				icon {
					id
					name
					alternativeText
					width
					height
					formats
					url
					previewUrl
				}
			}
		}
		`,
	};

	return queriesDispatcher[dispatcher];
}
