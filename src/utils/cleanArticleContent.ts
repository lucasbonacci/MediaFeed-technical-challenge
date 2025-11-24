const cleanArticleContent = (content?: string | null): string | null => {
  if (!content || typeof content !== 'string') return null;
  return content.replace(/\[\+\d+ chars\]/g, '') || null;
};

export default cleanArticleContent;
