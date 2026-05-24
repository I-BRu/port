import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { social } from '@/mocks';

import { useSocial } from '.';

vi.mock('axios');

describe('useSocial', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.unstubAllEnvs();
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it('should fetch and parse social data', async () => {
		vi.stubEnv('VITE_API_URL', 'https://api.example.com');
		(axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			data: { data: social }
		});

		const { getSocialData } = useSocial();
		const result = await getSocialData();

		expect(result).toBeDefined();
		expect(axios.get).toHaveBeenCalledWith('https://api.example.com/social/posts');
	});

	it('should handle errors gracefully', async () => {
		vi.stubEnv('VITE_API_URL', 'https://api.example.com');
		(axios.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error('fail')
		);
		const { getSocialData } = useSocial();

		await expect(getSocialData()).resolves.toBeUndefined();
	});

	it('should use mock data when API URL is not configured', async () => {
		vi.stubEnv('VITE_API_URL', '');

		const { getSocialData } = useSocial();
		const result = await getSocialData();

		expect(result).toBeDefined();
		expect(axios.get).not.toHaveBeenCalled();
	});
});
