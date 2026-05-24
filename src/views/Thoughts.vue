<script setup lang="ts">
import { onMounted } from 'vue';

import { Card } from '@/components';
import { misc } from '@/config';
import { usePreload } from '@/composables/usePreload';
import { type GitHubSchema } from '@/stores/misc/schema';

const contributions: GitHubSchema[] = misc.github.contributions;
const { preloadImage } = usePreload();

onMounted(async () => {
	const banners = [...new Set(contributions.map((repo) => repo.banner))];
	await Promise.allSettled(banners.map((banner) => preloadImage(banner)));
});
</script>

<template>
	<div class="thoughts columns is-block">
		<div class="column has-text-left has-text-centered-mobile pb-5 headline">
			<p class="heading">
				Open Source<span class="is-hidden-desktop"></span>
				<br />
				<span> and </span>
				<span class="text-highlight">Contributions</span>
			</p>
		</div>
		<div class="opensource-section column has-text-left pr-0">
			<div class="bullets mb-1">
				<span><span class="text-highlight is-clickable"># </span>My Open Source</span>
			</div>
			<p class="section-note mb-4">
				I contribute to open-source projects like Cboard, Moment.js, and Cal.com — and
				share my own work on GitHub instead of writing blogs.
			</p>
			<div class="column is-flex-desktop is-flex-wrap-wrap p-0">
				<div
					class="column is-6 pl-0"
					v-for="repo in contributions"
					:key="repo.url"
				>
					<a :href="repo.url" target="_blank" rel="noopener noreferrer">
						<Card :data="repo" :isLink="true" :tags="true" />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.thoughts {
	.bullets {
		font-size: 20px;
	}

	.section-note {
		color: var(--text-color-grey);
		font-size: var(--text-small-font-size);
	}

	.opensource-section {
		::v-deep(.card .banner) {
			height: 170px;
		}
		::v-deep(.card .column.has-text-left.py-4) {
			height: 160px;
		}
		::v-deep(.card .banner img) {
			width: 100%;
			height: 170px;
			object-fit: cover;
		}
	}

	@media screen and (max-width: 768px) {
		.opensource-section {
			padding-right: var(--bulma-column-gap) !important;

			.pl-0 {
				padding-right: 0;
			}
		}
	}
}
</style>
