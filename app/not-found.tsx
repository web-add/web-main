// app/not-found.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <section className="flex items-center justify-center text-center px-4 
                        min-h-[calc(100vh-4rem-6rem)]">
      {/* ganti 4rem & 6rem sesuai tinggi Navigation + Footer */}
      <div>
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-6">
          Oops… the page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </section>
  )
}
