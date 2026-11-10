import fs from 'node:fs';
import path from 'node:path';

export interface RepoLiveMeta {
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string;
  stargazersCount: number;
  forksCount: number;
  pushedAt: string;
}

export interface RecentCommitItem {
  repoName: string;
  message: string;
  date: string;
  url: string;
}

export interface GitHubSnapshot {
  username: string;
  fetchedAt: string;
  source: 'live-api' | 'cache' | 'fallback';
  publicReposCount: number;
  followersCount: number;
  totalStars: number;
  repos: Record<string, RepoLiveMeta>;
  recentCommits: RecentCommitItem[];
}

const CACHE_FILE = path.resolve(process.cwd(), '.cache/github-snapshot.json');

const FALLBACK_SNAPSHOT: GitHubSnapshot = {
  username: 'Snowsant1999',
  fetchedAt: '2026-11-10T00:00:00Z',
  source: 'fallback',
  publicReposCount: 9,
  followersCount: 2,
  totalStars: 1,
  repos: {
    Alice_Ai: {
      name: 'Alice_Ai',
      htmlUrl: 'https://github.com/Snowsant1999/Alice_Ai',
      description: 'Personal AI assistant powered by Python and Gemini.',
      language: 'Python',
      stargazersCount: 1,
      forksCount: 0,
      pushedAt: '2026-10-15T00:00:00Z',
    },
    WebsiteKeluhanSiswa: {
      name: 'WebsiteKeluhanSiswa',
      htmlUrl: 'https://github.com/Snowsant1999/WebsiteKeluhanSiswa',
      description: 'Laravel 11 student complaint management web application.',
      language: 'PHP',
      stargazersCount: 0,
      forksCount: 0,
      pushedAt: '2026-09-20T00:00:00Z',
    },
    MyRestaurant: {
      name: 'MyRestaurant',
      htmlUrl: 'https://github.com/Snowsant1999/MyRestaurant',
      description: 'PHP web application for restaurant catalog and ordering.',
      language: 'PHP',
      stargazersCount: 0,
      forksCount: 0,
      pushedAt: '2026-08-11T00:00:00Z',
    },
    POS_Amplang: {
      name: 'POS_Amplang',
      htmlUrl: 'https://github.com/Snowsant1999/POS_Amplang',
      description: 'Java desktop Point-of-Sale system for Amplang retail.',
      language: 'Java',
      stargazersCount: 0,
      forksCount: 0,
      pushedAt: '2026-07-18T00:00:00Z',
    },
    CC_Roadmap: {
      name: 'CC_Roadmap',
      htmlUrl: 'https://github.com/Snowsant1999/CC_Roadmap',
      description: 'Cloud Computing learning roadmap in JavaScript.',
      language: 'JavaScript',
      stargazersCount: 0,
      forksCount: 0,
      pushedAt: '2026-06-25T00:00:00Z',
    },
    Praktikun_Blockchain: {
      name: 'Praktikun_Blockchain',
      htmlUrl: 'https://github.com/Snowsant1999/Praktikun_Blockchain',
      description: 'Solidity smart contract laboratory exercises.',
      language: 'Solidity',
      stargazersCount: 0,
      forksCount: 0,
      pushedAt: '2026-05-30T00:00:00Z',
    },
  },
  recentCommits: [
    {
      repoName: 'Alice_Ai',
      message: 'Refine Gemini prompt workflow and assistant command loop',
      date: '2026-10-15',
      url: 'https://github.com/Snowsant1999/Alice_Ai',
    },
    {
      repoName: 'WebsiteKeluhanSiswa',
      message: 'Set up Laravel 11 student complaint routes and controllers',
      date: '2026-09-20',
      url: 'https://github.com/Snowsant1999/WebsiteKeluhanSiswa',
    },
    {
      repoName: 'POS_Amplang',
      message: 'Implement Java desktop POS receipt calculation',
      date: '2026-07-18',
      url: 'https://github.com/Snowsant1999/POS_Amplang',
    },
  ],
};

let memoizedSnapshot: GitHubSnapshot | null = null;

export async function getGitHubSnapshot(): Promise<GitHubSnapshot> {
  if (memoizedSnapshot) return memoizedSnapshot;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Snowsant1999-Astro-Portfolio',
  };

  const token = process.env.GITHUB_TOKEN || import.meta.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const [userRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/Snowsant1999', {
        headers,
        signal: controller.signal,
      }),
      fetch('https://api.github.com/users/Snowsant1999/repos?per_page=100&sort=pushed', {
        headers,
        signal: controller.signal,
      }),
    ]);

    clearTimeout(timeout);

    if (userRes.ok && reposRes.ok) {
      const userJson = (await userRes.json()) as {
        public_repos?: number;
        followers?: number;
      };
      const reposJson = (await reposRes.json()) as Array<{
        name: string;
        html_url: string;
        description: string | null;
        language: string | null;
        stargazers_count: number;
        forks_count: number;
        pushed_at: string;
      }>;

      const repoMap: Record<string, RepoLiveMeta> = { ...FALLBACK_SNAPSHOT.repos };
      let starsSum = 0;

      for (const r of reposJson) {
        starsSum += r.stargazers_count || 0;
        repoMap[r.name] = {
          name: r.name,
          htmlUrl: r.html_url,
          description: r.description,
          language: r.language || repoMap[r.name]?.language || 'Code',
          stargazersCount: r.stargazers_count || 0,
          forksCount: r.forks_count || 0,
          pushedAt: r.pushed_at || new Date().toISOString(),
        };
      }

      const recentCommits: RecentCommitItem[] = reposJson.slice(0, 5).map((r) => ({
        repoName: r.name,
        message: r.description || `Updated repository ${r.name}`,
        date: (r.pushed_at || '').slice(0, 10),
        url: r.html_url,
      }));

      const liveSnapshot: GitHubSnapshot = {
        username: 'Snowsant1999',
        fetchedAt: new Date().toISOString(),
        source: 'live-api',
        publicReposCount: userJson.public_repos ?? reposJson.length,
        followersCount: userJson.followers ?? FALLBACK_SNAPSHOT.followersCount,
        totalStars: starsSum,
        repos: repoMap,
        recentCommits: recentCommits.length > 0 ? recentCommits : FALLBACK_SNAPSHOT.recentCommits,
      };

      try {
        fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
        fs.writeFileSync(CACHE_FILE, JSON.stringify(liveSnapshot, null, 2), 'utf-8');
      } catch {
        // Ignore cache write errors in read-only environments.
      }

      memoizedSnapshot = liveSnapshot;
      return liveSnapshot;
    }
  } catch {
    // Network unavailable or rate-limited; fall back to local cache or static snapshot.
  }

  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) as GitHubSnapshot;
      cached.source = 'cache';
      memoizedSnapshot = cached;
      return cached;
    }
  } catch {
    // Ignore malformed cache file.
  }

  memoizedSnapshot = FALLBACK_SNAPSHOT;
  return FALLBACK_SNAPSHOT;
}

