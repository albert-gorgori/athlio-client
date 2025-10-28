import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import FeaturesSection from "./features-section";
import { SIGN_UP_ROUTE } from "@/lib/constants";

const page = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Train smarter. Race faster.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Unified swim, bike, and run insights with adaptive plans, load
              management, and race‑day execution tools.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button asChild>
                <a href="/signup">Get started</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#features">Learn more</a>
              </Button>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mt-14">
            <Card className="relative mx-auto w-full max-w-5xl overflow-hidden">
              <Image
                width={1200}
                height={675}
                src="/dashboardScreen.png"
                alt="App dashboard preview"
                className="h-full w-full object-cover"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />
      

      {/* Highlight: Unified dashboard */}
      <section className="border-t">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold">
              Unified training dashboard
            </h3>
            <p className="mt-3 text-muted-foreground">
              One place for all your workouts, trends, and readiness signals.
              Understand your peaks, taper, and race readiness at a glance.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  ✓
                </span>
                Multi-sport calendar with drag-and-drop edits
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  ✓
                </span>
                Readiness and load trends with actionable tips
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  ✓
                </span>
                Race targets by power, pace, or HR with course modifiers
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <a href="/onboarding">Build your plan</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/demo">View demo</a>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Card className="overflow-hidden">
              <Image
                width={1200}
                height={675}
                src="/calendarApp.png"
                alt="Unified training dashboard"
                className="h-full w-full object-cover"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Highlight: Workout builder */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <Card className="overflow-hidden">
              <Image
                width={1200}
                height={675}
                src="https://placehold.co/900x650/png?text=Workout+Builder"
                alt="Intelligent workout builder"
                className="h-full w-full object-cover"
              />
            </Card>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              Intelligent workout builder
            </h3>
            <p className="mt-3 text-muted-foreground">
              Create structured sessions in minutes with sport‑specific targets
              and automatic progressions aligned to your goals and availability.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  ✓
                </span>
                Swim, bike, run blocks with auto‑calculated intervals
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  ✓
                </span>
                RPE, HR, pace, or power targets with device export
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  ✓
                </span>
                Real‑time adjustments based on fatigue and time budget
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">
                Ready to level up your triathlon?
              </CardTitle>
              <CardDescription className="mt-1">
                Start free today and get a personalized plan tuned to your
                A‑race.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-2 flex items-center justify-center gap-3">
                <Button asChild>
                  <a href={SIGN_UP_ROUTE}>Start free trial</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/contact">Talk to us</a>
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                No credit card required.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default page;
