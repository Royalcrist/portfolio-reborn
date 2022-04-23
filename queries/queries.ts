import { gql } from '@apollo/client';

/**
 * Get GraphQL queries for Apollo
 * @param {('HOME'|'PROFILE'|'PROJECTS'|'PROJECTS_HOME'|'SOCIAL_MEDIA'|'SKILLS')} dispatcher
 * @param {String} locale
 * @returns
 */
export default function queries(dispatcher: string, locale: string = 'en') {
	const queriesDispatcher: any = {
		HOME: gql`
	query Home {
		home(locale: "${locale}") {
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
	}
`,

		PROFILE: gql`
		query Profile {
			profile(locale: "${locale}") {
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
		}
`,
		PROJECTS_HOME: gql`
	query Projects {
		projects(locale: "${locale}", sort: "highlight:desc,commingSoon:asc") {
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
	}
`,
		PROJECTS: gql`
	query Projects {
		projects(locale: "${locale}", sort: "highlight:desc,commingSoon:asc") {
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
	}
`,
		SOCIAL_MEDIA: gql`
			query SocialMedia {
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
			}
		`,

		SKILLS: gql`
		query Skills {
			skillCategories(locale: "${locale}", sort: "order:desc") {
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
		}
		`,
	};

	return queriesDispatcher[dispatcher];
}
