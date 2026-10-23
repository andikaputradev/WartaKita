import { articles } from '@/lib/news'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

export async function GET() {
  const itemsXml = articles
    .map(
      (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${SITE_URL}/berita/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/berita/${a.slug}</guid>
      <description><![CDATA[${a.excerpt}]]></description>
      <category>${a.category}</category>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
