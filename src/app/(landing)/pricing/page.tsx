import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="container max-w-6xl px-4 py-16 items-center mx-auto">
        <header className="mb-12 text-center">
          <h1 id="pricing-heading" className="text-4xl font-bold tracking-tight">Choose your plan</h1>
          <p className="mt-3 text-muted-foreground">Start free and upgrade anytime.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Free</CardTitle>
              <CardDescription>For getting started with training.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold">0 €</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Track workouts and progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Community access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/signup?plan=free">Get started</a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative border-2 border-primary">
            <Badge className="absolute -top-3 right-4" variant="default">
              Popular
            </Badge>
            <CardHeader>
              <CardTitle className="text-lg">Pro Training</CardTitle>
              <CardDescription>For athletes who want more.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">19,99 €</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold">199,99 €</span>
                    <span className="text-xs text-primary">/ year</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Save 2 months</Badge>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Unlimited workouts and plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Advanced analytics and insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Personalized training templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button className="w-full" asChild>
                <a href="/checkout?plan=pro-monthly">Start monthly</a>
              </Button>
              <Button variant="outline" className="w-full text-primary" asChild>
                <a href="/checkout?plan=pro-yearly">Start yearly</a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Cancel anytime. Prices in EUR; taxes may apply.
        </p>
      </div>
    </>
  )
}

export default page