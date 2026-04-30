import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// Inject Cloudinary automatic format and quality if missing
export function optimizeCloudinary(url) {
  if (!url || typeof url !== 'string') return url;
  try {
    const u = new URL(url);
    if (!u.hostname.includes('res.cloudinary.com')) return url;
    const marker = '/image/upload/';
    const idx = u.pathname.indexOf(marker);
    if (idx === -1) return url;
    const after = u.pathname.slice(idx + marker.length);
    if (/f_auto|q_auto/.test(after)) return url;
    u.pathname = u.pathname.replace(marker, `${marker}f_auto,q_auto/`);
    return u.toString();
  } catch {
    return url;
  }
}