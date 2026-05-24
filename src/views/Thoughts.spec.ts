import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import Thoughts from './Thoughts.vue';

vi.mock('@/composables', () => ({
	usePreload: () => ({ preloadImage: vi.fn() })
}));

vi.mock('@/config', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/config')>();

	return {
		...actual,
		misc: {
			github: {
				...actual.misc.github,
				contributions: [
					{
						title: 'Cboard',
						subtitle: 'AAC open source',
						url: 'https://github.com/I-BRu/cboard',
						banner: '/photos/me1.png'
					}
				]
			}
		}
	};
});

describe('Thoughts.vue', () => {
	it('renders Open Source headline', () => {
		const wrapper = mount(Thoughts);
		expect(wrapper.text()).toMatch(/Open Source/);
		expect(wrapper.text()).toMatch(/My Open Source/);
		expect(wrapper.text()).toMatch(/Cboard/);
	});
});
