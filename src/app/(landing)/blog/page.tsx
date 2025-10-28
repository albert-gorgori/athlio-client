import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <>
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
            <p className="text-muted-foreground">Insights and updates. Posting soon.</p>
          </div>
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
            Coming soon
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-muted" />

              <CardContent className="space-y-3 p-4">
                <Badge className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  Placeholder
                </Badge>

                <div className="h-6 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
              </CardContent>

              <CardFooter className="pt-2">
                <Button disabled variant="secondary" className="opacity-60">
                  Read more
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

export default page