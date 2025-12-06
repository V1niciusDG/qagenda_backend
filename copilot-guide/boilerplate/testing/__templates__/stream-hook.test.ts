import { makeReadable, makeWritable } from '@test-utils/streams';
import { pipeline } from 'stream/promises';

describe('Stream Hook Template', () => {
  it('pipes readable to writable and collects data', async () => {
    const readable = makeReadable([Buffer.from('a'), Buffer.from('b')]);
    const writable = makeWritable();
    await pipeline(readable, writable as any);
    expect(writable.__getString()).toBe('ab');
  });
});
