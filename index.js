import { createWriteStream, promises as fs } from 'node:fs';
import { pipeline as rawPipeline } from 'node:stream';
import { promisify } from 'node:util';
import fetch from 'node-fetch';

const { SOURCE_ADDRESS } = process.env;
const pipeline = promisify(rawPipeline);

fs.rm('public', { force: true, recursive: true })
  .then(() => fs.mkdir('public'))
  .then(() => fetch(SOURCE_ADDRESS))
  .then(res => {
    if (!res.ok) {
      throw new Error('Unexpected response status: ', res.status);
    }

    return pipeline(res.body, createWriteStream('public/_redirects'));
  })
  .then(() => console.log('Success!'));
