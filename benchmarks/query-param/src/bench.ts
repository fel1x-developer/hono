import { run, group, bench } from 'mitata'
import fastQuerystring from './fast-querystring.ts'
import hono from './hono.ts'
;[
  {
    url: 'http://example.com/?page=1',
    key: 'page',
  },
  {
    url: 'http://example.com/?url=http://example.com&page=1',
    key: 'page',
  },
  {
    url: 'http://example.com/?page=1',
    key: undefined,
  },
  {
    url: 'http://example.com/?url=http://example.com&page=1',
    key: undefined,
  },
  {
    url: 'http://example.com/?url=http://example.com/very/very/deep/path/to/something&search=very-long-search-string',
    key: undefined,
  },
  {
    url: 'http://example.com/?search=Hono+is+a+small,+simple,+and+ultrafast+web+framework+for+the+Edge.&page=1',
    key: undefined,
  },
  {
    url: 'http://example.com/?a=1&b=2&c=3&d=4&e=5&f=6&g=7&h=8&i=9&j=10',
    key: undefined,
  },
].forEach((data) => {
  const { url, key } = data

  group(() => {
    bench('hono', () => hono(url, key))
    bench('fastQuerystring', () => fastQuerystring(url, key))
  })
})

run()
