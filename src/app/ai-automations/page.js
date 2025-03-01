"use client";
import Image from "next/image";
import { useState } from "react";
import TestimonialCard from "./components/TestimonialCard";
import AutomationCard from "./components/AutomationCard";
import PricingTier from "./components/PricingTier";
import {
  testimonials,
  standardAutomations,
  pricingTiers,
  faqItems,
} from "./data/mockData";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Calendar, Check, ChevronRight } from "lucide-react";

export default function AiAutomations() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                I will <span className="text-primary">EARN</span> you 2 hours
                per day
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 flex items-center opacity-90">
                AI - automations made by me
                <ArrowRight className="ml-4 h-5 w-5" />
              </h2>
              <Button size="lg" className="mt-4">
                Learn How <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border-4 border-white/10"
                />
              </div>
              <Card className="absolute -right-4 -top-4 max-w-xs">
                <CardContent className="p-3 flex items-center">
                  <p className="text-sm flex items-center">
                    Hey, I will custom code it for you on camera
                    <Image
                      src="/camera-icon.png"
                      alt="Camera"
                      width={20}
                      height={20}
                      className="ml-2"
                    />
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            (hand-made) → on zoom 1:1 meeting with me
          </h2>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-6">
                In 1 hour on live zoom call with me:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>
                    We'll go over important questions about your workflow
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Identify what you need most to save time</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>I'll create a custom solution with AI automations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Complete setup and implementation done for you</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-muted/50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Watch How It Works
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://www.youtube.com/embed/dummy-link"
              className="w-full h-[400px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Choose Your Automation Package
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <PricingTier
                key={index}
                {...tier}
                onScheduleCall={() => setIsDialogOpen(true)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="mt-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Free 10-min Call
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Your Call</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-muted-foreground mb-4">
                    Select a time that works for you and I'll reach out to
                    confirm.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    (Calendly integration will be implemented here)
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            <p className="mt-4 text-muted-foreground">
              Not sure what's possible? Let's chat about your needs!
            </p>
          </div>
        </div>
      </section>

      {/* Standard Automations Section */}
      <section className="py-16 bg-muted/50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Standard Automations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardAutomations.map((automation, index) => (
              <AutomationCard key={index} {...automation} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            What Others Are Saying
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>
            © {new Date().getFullYear()} AI Automations. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
