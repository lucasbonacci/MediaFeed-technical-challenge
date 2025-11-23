import parseNewsApiResponse from '../parseNewsApiResponse';

describe('parseNewsApiResponse', () => {
  it('throws an error when body is not an object', () => {
    // null body
    expect(() => parseNewsApiResponse(null as any)).toThrow(
      'Invalid news response',
    );
    // primitive body
    expect(() => parseNewsApiResponse('invalid' as any)).toThrow(
      'Invalid news response',
    );
  });

  it('throws an error when articles is not an array', () => {
    const raw = {
      status: 'ok',
      totalResults: 10,
      // articles missing / not an array
    };

    expect(() => parseNewsApiResponse(raw as any)).toThrow(
      'Invalid news response: articles must be an array',
    );
  });

  it('parses a valid response and sanitizes happy-path fields correctly', () => {
    const raw = {
      status: ' ok ', // with spaces -> trimmed
      totalResults: 2,
      articles: [
        {
          source: {
            id: ' 123 ',
            name: ' CNN ',
          },
          author: ' John Doe ',
          title: '  Some title  ',
          description: '  Some description  ',
          url: '  https://example.com/article  ',
          urlToImage: '   ', // empty-ish string -> null via sanitizeNullableString
          publishedAt: ' 2025-11-23 ',
          content: '  Some content  ',
          videoUrl: '  https://example.com/video  ',
        },
      ],
      code: '  some_code  ',
      message: '  some message  ',
    };

    const result = parseNewsApiResponse(raw as any);

    expect(result.status).toBe('ok'); // trimmed
    expect(result.totalResults).toBe(2);
    expect(result.articles).toHaveLength(1);

    const article = result.articles[0];

    expect(article.source.id).toBe('123');
    expect(article.source.name).toBe('CNN');
    expect(article.author).toBe('John Doe');
    expect(article.title).toBe('Some title');
    expect(article.description).toBe('Some description');
    expect(article.url).toBe('https://example.com/article');
    // urlToImage: '   ' -> null
    expect(article.urlToImage).toBeNull();
    expect(article.publishedAt).toBe('2025-11-23');
    expect(article.content).toBe('Some content');
    expect(article.videoUrl).toBe('https://example.com/video');

    expect(result.code).toBe('some_code');
    expect(result.message).toBe('some message');
  });

  it('uses fallbacks and handles null/invalid values correctly', () => {
    const raw = {
      status: 123, // not a string -> fallback 'error'
      totalResults: -5, // negative number -> 0
      articles: [
        {
          source: {
            id: 999, // not a string -> null
            name: '   ', // empty string -> 'Unknown source'
          },
          author: 456, // not a string -> null
          title: '', // empty string -> 'Untitled'
          description: '', // empty string -> null
          url: '', // empty string -> fallback '' (stays '')
          urlToImage: null, // null -> null
          publishedAt: '', // empty string -> fallback '' (stays '')
          content: null, // null -> null
          // videoUrl: undefined -> left as undefined
        },
      ],
      code: null, // -> sanitizeNullableString => null => code: undefined
      // message missing -> undefined => sanitizeNullableString => null => message: undefined
    };

    const result = parseNewsApiResponse(raw as any);

    // status fallback
    expect(result.status).toBe('error');
    // totalResults fallback
    expect(result.totalResults).toBe(0);
    expect(result.articles).toHaveLength(1);

    const article = result.articles[0];

    expect(article.source.id).toBeNull();
    expect(article.source.name).toBe('Unknown source');

    expect(article.author).toBeNull();
    expect(article.title).toBe('Untitled');
    expect(article.description).toBeNull();
    expect(article.url).toBe(''); // fallback
    expect(article.urlToImage).toBeNull();
    expect(article.publishedAt).toBe('');
    expect(article.content).toBeNull();
    expect(article.videoUrl).toBeUndefined();

    // code/message sanitized to null and then converted to undefined via ??
    expect(result.code).toBeUndefined();
    expect(result.message).toBeUndefined();
  });
});
