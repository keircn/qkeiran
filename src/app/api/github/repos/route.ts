import { NextRequest, NextResponse } from 'next/server';
import { GitHubRepo, RepoRequest } from '~/types/github';

export async function POST(request: NextRequest) {
  try {
    const body: RepoRequest = await request.json();

    if (!body.repos || !Array.isArray(body.repos)) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected { repos: string[] }' },
        { status: 400 }
      );
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
    };

    if (githubToken) {
      headers.Authorization = `token ${githubToken}`;
    }

    const repoPromises = body.repos.map(async (repoName) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoName}`,
          { headers }
        );

        if (!response.ok) {
          console.error(`Failed to fetch ${repoName}: ${response.status}`);
          return null;
        }

        return await response.json();
      } catch (error) {
        console.error(`Error fetching ${repoName}:`, error);
        return null;
      }
    });

    const repos = await Promise.all(repoPromises);

    const validRepos = repos.filter(
      (repo): repo is GitHubRepo => repo !== null
    );

    return NextResponse.json({
      repos: validRepos,
      total: validRepos.length,
      requested: body.repos.length,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message:
        'Use POST method with { repos: ["username/repo", ...] } to fetch repository data',
      example: {
        repos: ['keircn/archium', 'keircn/another-repo'],
      },
    },
    { status: 405 }
  );
}
