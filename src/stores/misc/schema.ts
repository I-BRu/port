import { z } from 'zod';

const githubSchema = z.object({
	url: z.string(),
	githubBanner: z.string().optional(),
	banner: z.string(),
	title: z.string(),
	subtitle: z.string(),
	tags: z.array(z.string()).optional()
});

export type GitHubSchema = z.infer<typeof githubSchema>;
