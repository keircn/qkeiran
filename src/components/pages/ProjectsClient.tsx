'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  FaStar,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaGithub,
} from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Repository } from '~/types/projects';

export function ProjectsClient() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const featuredRepos = [
    'keircn/archium',
    'keircn/qkeiran',
    'keircn/e-zdocs',
    'keircn/e-zhost-js',
    'keircn/qkrn',
    'keircn/hostman',
    'keircn/anonhost',
    'keircn/anonlink',
    'keircn/ezmod',
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github/repos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            repos: featuredRepos,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();
        
        const sortedRepos = data.repos.sort((a: Repository, b: Repository) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return (
            new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime()
          );
        });

        setRepos(sortedRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      CSS: '#563d7c',
      HTML: '#e34c26',
      Go: '#00ADD8',
      Rust: '#dea584',
      Shell: '#89e051',
    };
    return colors[language || ''] || '#6b7280';
  };

  if (loading) {
    return (
      <main className='flex min-h-[90vh] flex-col items-center justify-center p-4 md:p-24'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center'
        >
          <div className='border-foreground mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2'></div>
          <p className='text-muted-foreground'>Loading projects...</p>
        </motion.div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='flex min-h-[90vh] flex-col items-center justify-center p-4 md:p-24'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center'
        >
          <p className='mb-4 text-red-500'>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-primary text-primary-foreground hover:bg-primary/80 rounded px-4 py-2'
          >
            Try Again
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className='container mx-auto min-h-[90vh] px-4 py-8 md:px-6 md:py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8'
      >
        <h1 className='mb-4 text-4xl font-bold'>Projects</h1>
        <p className='text-muted-foreground text-lg'>
          A collection of my open source projects and contributions
        </p>
      </motion.div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className='flex h-full flex-col transition-shadow hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <CardTitle className='line-clamp-1 text-lg'>
                    {repo.name}
                  </CardTitle>
                  <div className='flex space-x-2'>
                    <a
                      href={repo.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-muted-foreground hover:text-foreground'
                    >
                      <FaGithub className='h-4 w-4' />
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-foreground'
                      >
                        <FaExternalLinkAlt className='h-4 w-4' />
                      </a>
                    )}
                  </div>
                </div>
                <CardDescription className='line-clamp-2'>
                  {repo.description || 'No description available'}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-1 flex-col justify-between'>
                <div>
                  {repo.topics.length > 0 && (
                    <div className='mb-4 flex flex-wrap gap-1'>
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className='bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs'
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className='bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs'>
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className='text-muted-foreground flex items-center justify-between text-sm'>
                  <div className='flex items-center space-x-4'>
                    {repo.language && (
                      <div className='flex items-center space-x-1'>
                        <div
                          className='h-3 w-3 rounded-full'
                          style={{
                            backgroundColor: getLanguageColor(repo.language),
                          }}
                        ></div>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className='flex items-center space-x-1'>
                      <FaStar className='h-3 w-3' />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <FaCodeBranch className='h-3 w-3' />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {repos.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='py-12 text-center'
        >
          <p className='text-muted-foreground'>No repositories found</p>
        </motion.div>
      )}
    </main>
  );
}
