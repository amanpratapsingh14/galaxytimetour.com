/**
 * Fixed-window, in-memory rate limiter.
 *
 * On Vercel each warm function instance keeps its own map, so this is a best-effort
 * first line of defence. For a hard limit add a Vercel Firewall rate-limit rule
 * on POST /api/form-submit (Project → Firewall → Rules).
 */
const buckets = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now()

  if (buckets.size > 5_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k)
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (bucket.count >= limit) return false
  bucket.count++
  return true
}
