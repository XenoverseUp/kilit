import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeTrailingSlash(pathname: string) {
  if (pathname === "") return "/"

  if (pathname.at(-1) === "/") return pathname.slice(0, -1)
  return pathname
}
