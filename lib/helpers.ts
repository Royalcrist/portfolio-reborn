export function apiBase(route: string) {
	return `${process.env.NEXT_PUBLIC_API_BASE}${route}`;
}

export function displayLocaleName(curretLocale: string, displayLocal: string) {
	const locale: any = new Intl.DisplayNames([curretLocale], {
		type: 'language',
	}).of(displayLocal);

	return capitalizeFirstLetter(locale);
}

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringToSlug(string: string) {
	return (
		string
			?.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '') || ''
	);
}

export function getSectionId(section: any): string {
	if (!section.id && !section.linkTitle) return '';

	return stringToSlug(section.linkTitle) || section.id;
}
