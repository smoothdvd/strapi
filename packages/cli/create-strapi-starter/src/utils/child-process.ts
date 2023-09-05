import { execSync } from 'child_process';
import execa from 'execa';
import logger from './logger';
import type { Options } from '../types';

export function runInstall(path: string, { useYarn, useNpm }: Options = {}) {
  let packageManager = '';

  if (useYarn) {
    packageManager = 'yarn';
  } else if (useNpm) {
    packageManager = 'npm';
  } else {
    packageManager = 'pnpm';
  }

  return execa(packageManager, ['install'], {
    cwd: path,
    stdin: 'ignore',
  });
}
export function runApp(rootPath: string, { useYarn, usePnpm }: Options = {}) {
  if (useYarn) {
    return execa('yarn', ['develop'], {
      stdio: 'inherit',
      cwd: rootPath,
    });
  }

  if (usePnpm) {
    return execa('pnpm', ['develop'], {
      stdio: 'inherit',
      cwd: rootPath,
    });
  }

  return execa('npm', ['run', 'develop'], {
    stdio: 'inherit',
    cwd: rootPath,
  });
}

export async function initGit(rootPath: string) {
  try {
    await execa('git', ['init'], {
      cwd: rootPath,
    });
  } catch (err) {
    logger.warn('Could not initialize a git repository');
  }

  try {
    await execa('git', ['add', '-A'], { cwd: rootPath });

    execSync('git commit -m "Create Strapi starter project"', {
      cwd: rootPath,
    });
  } catch (err) {
    logger.warn('Could not create initial git commit');
  }
}
