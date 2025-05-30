import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'Agro',
  version: '1.0.0',
  tagIndex: 1,
  ignore: ['/swagger', '/docs', '*/create', '*/edit'],
  common: {
    parameters: {
      sortable: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'number', example: '1' },
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'number', example: '10' },
        },
      ],
    },
    headers: {},
  },
}
