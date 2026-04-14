#!/usr/bin/env node

import crypto from 'node:crypto'
import { readFile } from 'node:fs/promises'

const SITEMAP_URL = process.env.SITEMAP_URL ?? 'https://deepakkushwaha.tech/sitemap.xml'
const SITE_PROPERTY =
  process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY ?? `sc-domain:${new URL(SITEMAP_URL).hostname}`
const SUBMIT_MODE = process.env.GOOGLE_SUBMIT_MODE ?? 'sitemap'

const SEARCH_CONSOLE_SCOPE = 'https://www.googleapis.com/auth/webmasters'
const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing'

async function readServiceAccount() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim()
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH?.trim()

  if (!inline && !keyPath) {
    throw new Error(
      'Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_KEY_PATH. Use a Google service-account JSON key, not an API key.'
    )
  }

  const rawJson = inline ?? (await readFile(keyPath, 'utf8'))
  const credentials = JSON.parse(rawJson)

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('Service-account JSON is missing client_email or private_key.')
  }

  return credentials
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

async function getAccessToken(credentials, scope) {
  const now = Math.floor(Date.now() / 1000)

  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claimSet = base64UrlEncode(
    JSON.stringify({
      iss: credentials.client_email,
      scope,
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
  )
  const unsignedToken = `${header}.${claimSet}`
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsignedToken)
    .end()
    .sign(credentials.private_key)
  const assertion = `${unsignedToken}.${base64UrlEncode(signature)}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  if (!res.ok) {
    throw new Error(`OAuth token exchange failed: ${res.status} ${await res.text()}`)
  }

  const data = await res.json()
  return data.access_token
}

async function submitSitemap(accessToken) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    SITE_PROPERTY
  )}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`

  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    throw new Error(`Sitemap submit failed: ${res.status} ${await res.text()}`)
  }

  console.log(`Submitted sitemap to Search Console: ${SITEMAP_URL}`)
}

async function readSitemapUrls() {
  const res = await fetch(SITEMAP_URL)

  if (!res.ok) {
    throw new Error(`Unable to fetch sitemap: ${res.status} ${await res.text()}`)
  }

  const xml = await res.text()
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).filter(Boolean)
}

async function submitIndexingNotifications(accessToken) {
  const urls = await readSitemapUrls()

  if (urls.length === 0) {
    throw new Error(`No URLs found in sitemap: ${SITEMAP_URL}`)
  }

  console.log(
    `Submitting ${urls.length} URL_UPDATED notifications to the Indexing API. Google only supports JobPosting and livestream URLs here.`
  )

  for (const url of urls) {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    })

    if (!res.ok) {
      console.warn(`Indexing API rejected ${url}: ${res.status} ${await res.text()}`)
      continue
    }

    console.log(`Submitted URL_UPDATED: ${url}`)
  }
}

async function main() {
  if (process.env.GOOGLE_API_KEY) {
    console.warn('GOOGLE_API_KEY is ignored. Search Console and Indexing API require OAuth.')
  }

  const credentials = await readServiceAccount()
  const wantsSitemap = SUBMIT_MODE === 'sitemap' || SUBMIT_MODE === 'both'
  const wantsIndexing = SUBMIT_MODE === 'indexing' || SUBMIT_MODE === 'both'

  if (wantsSitemap) {
    const accessToken = await getAccessToken(credentials, SEARCH_CONSOLE_SCOPE)
    await submitSitemap(accessToken)
  }

  if (wantsIndexing) {
    const accessToken = await getAccessToken(credentials, INDEXING_SCOPE)
    await submitIndexingNotifications(accessToken)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
