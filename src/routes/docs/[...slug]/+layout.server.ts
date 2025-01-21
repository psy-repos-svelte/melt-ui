import fs from 'fs';
import type { PageLoad } from './$types.js';

import { building } from '$app/environment';

export type Contributor = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	contributions: number;
};

export type FullContributor = Contributor & { name: string; bio: string };

async function getContributors(page: number) {
	return await fetch(
		`https://api.github.com/repos/melt-ui/melt-ui/contributors?page=${page}&per_page=100`
	).then((r) => r.json());
}
async function getAllContributors(): Promise<FullContributor[]> {
	if (building || !fs.existsSync('src/json/contributors.json')) {
		try {
			// eslint-disable-next-line no-console
			console.log('Fetching contributors...');

			let page = 1;
			let contributors: Contributor[] = [];
			let data = await getContributors(page);
			while (data.length > 0) {
				contributors = contributors.concat(data);
				page++;
				data = await getContributors(page);
			}

			// eslint-disable-next-line no-console
			console.log('Contributors:', contributors.length);

			const contributorsWithName = (await Promise.all(
				contributors.map(async (contributor) => {
					const { name, bio } = await fetch(`https://api.github.com/users/${contributor.login}`)
						.then((r) => r.json())
						.catch(() => ({
							name: contributor.login,
							bio: '',
						}));

					return {
						...contributor,
						name,
						bio,
					};
				})
			)) as FullContributor[];

			fs.writeFileSync('src/json/contributors.json', JSON.stringify(contributorsWithName, null, 2));
			return contributorsWithName;
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error('FATAL', e);
			return JSON.parse(fs.readFileSync('src/json/contributors.json', 'utf-8')) ?? [];
		}
	}

	return JSON.parse(fs.readFileSync('src/json/contributors.json', 'utf-8'));
}

export const load: PageLoad = async () => {
	return {
		contributors: await getAllContributors(),
	};
};
