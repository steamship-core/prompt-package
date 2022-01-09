/* eslint-disable import/no-extraneous-dependencies */
import got from 'got';
import tar from 'tar';
import { Stream } from 'stream';
import { promisify } from 'util';
const pipeline = promisify(Stream.pipeline);
export async function isUrlOk(url) {
    const res = await got.head(url).catch((e) => e);
    return res.statusCode === 200;
}
export async function getRepoInfo(url, examplePath) {
    const [, username, name, t, _branch, ...file] = url.pathname.split('/');
    const filePath = examplePath ? examplePath.replace(/^\//, '') : file.join('/');
    // Support repos whose entire purpose is to be a NLUDB example, e.g.
    // https://github.com/:username/:my-cool-nludb-example-repo-name.
    if (t === undefined) {
        const infoResponse = await got(`https://api.github.com/repos/${username}/${name}`).catch((e) => e);
        if (infoResponse.statusCode !== 200) {
            return;
        }
        const info = JSON.parse(infoResponse.body);
        return { username, name, branch: info['default_branch'], filePath };
    }
    // If examplePath is available, the branch name takes the entire path
    const branch = examplePath
        ? `${_branch}/${file.join('/')}`.replace(new RegExp(`/${filePath}|/$`), '')
        : _branch;
    if (username && name && branch && t === 'tree') {
        return { username, name, branch, filePath };
    }
}
export function hasRepo({ username, name, branch, filePath, }) {
    const contentsUrl = `https://api.github.com/repos/${username}/${name}/contents`;
    const packagePath = `${filePath ? `/${filePath}` : ''}/package.json`;
    return isUrlOk(contentsUrl + packagePath + `?ref=${branch}`);
}
export function hasExample(name) {
    return isUrlOk(`https://api.github.com/repos/nludb/nludb-examples/contents/examples/${encodeURIComponent(name)}/package.json`);
}
export function downloadAndExtractRepo(root, { username, name, branch, filePath }) {
    return pipeline(got.stream(`https://codeload.github.com/${username}/${name}/tar.gz/${branch}`), tar.extract({ cwd: root, strip: filePath ? filePath.split('/').length + 1 : 1 }, [`${name}-${branch}${filePath ? `/${filePath}` : ''}`]));
}
export function downloadAndExtractExample(root, name) {
    if (name === '__internal-testing-retry') {
        throw new Error('This is an internal example for testing the CLI.');
    }
    return pipeline(got.stream('https://codeload.github.com/nludb/nludb-examples/tar.gz/main'), tar.extract({ cwd: root, strip: 3 }, [`nludb-examples-main/examples/${name}`]));
}
