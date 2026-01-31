// Root layout - minimal wrapper. Locale-specific layout handles HTML/body tags.
// This exists because Next.js requires a root layout.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
