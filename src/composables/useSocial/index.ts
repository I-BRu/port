import axios from 'axios';

import { social } from '@/mocks';
import { type SocialSchema, socialSchema } from '@/stores/thoughts/schema';

export function useSocial() {
	async function getSocialData(): Promise<SocialSchema | undefined> {
		const apiUrl = import.meta.env.VITE_API_URL;

		if (!apiUrl) {
			return socialSchema.parse(social);
		}

		try {
			const response = await axios.get(`${apiUrl}/social/posts`);

			const { data } = response.data;

			return socialSchema.parse(data);
		} catch (error) {
			console.error('Error fetching social data:', error);
		}
	}

	return {
		getSocialData
	};
}
