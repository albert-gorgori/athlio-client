import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeaturesSection = () => {
  return (
    <>
    <section id="features" className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to peak on race day
            </h2>
            <p className="mt-3 text-muted-foreground">
              Structured training, actionable insights, and precision pacing
              across swim, bike, and run.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="p-6 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2 16c4-3 8-3 12 0s8 3 8 0v4H2v-4zM2 12c4-3 8-3 12 0s8 3 8 0V8c0 3-4 3-8 0S6 5 2 8v4z" />
                  </svg>
                </div>
                <CardTitle className="mt-4 text-base">Swim analytics</CardTitle>
                <CardDescription className="mt-2">
                  Stroke rate, pacing, and critical swim speed tracking with
                  drill tagging.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 17h14l-1 3H6l-1-3zm2-9h10l3 6H4l3-6zM7 4h2l1 2h4l1-2h2l2 4H5l2-4z" />
                  </svg>
                </div>
                <CardTitle className="mt-4 text-base">Bike power</CardTitle>
                <CardDescription className="mt-2">
                  FTP estimation, power curve, and aero pacing with course
                  simulations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13 3a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0V9H9a1 1 0 1 1 0-2h3V4a1 1 0 0 1 1-1zM5 18h14v2H5v-2z" />
                  </svg>
                </div>
                <CardTitle className="mt-4 text-base">Run metrics</CardTitle>
                <CardDescription className="mt-2">
                  Pace, heart rate, and running power with form cues and cadence
                  targets.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z" />
                  </svg>
                </div>
                <CardTitle className="mt-4 text-base">Adaptive plans</CardTitle>
                <CardDescription className="mt-2">
                  Dynamic periodization that adjusts to fatigue, availability,
                  and progress.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 3h18v2H3V3zm0 6h18v2H3V9zm0 6h12v2H3v-2z" />
                  </svg>
                </div>
                <CardTitle className="mt-4 text-base">
                  Load & recovery
                </CardTitle>
                <CardDescription className="mt-2">
                  TSS, HRV, and sleep insights to balance stress and optimize
                  recovery.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm8 9v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2h16z" />
                  </svg>
                </div>
                <CardTitle className="mt-4 text-base">
                  Coach & community
                </CardTitle>
                <CardDescription className="mt-2">
                  Share sessions, compare splits, and collaborate with your
                  coach.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default FeaturesSection