"use client";
import Image from "next/image";
import TestimonialCard from "./components/TestimonialCard";
import AutomationCard from "./components/AutomationCard";
import PricingTier from "./components/PricingTier";
import {
  testimonials,
  standardAutomations,
  pricingTiers,
  faqItems,
} from "./data/mockData";

export default function AiAutomations() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">
                I will EARN you 2 hours per day
              </h1>
              <h2 className="text-2xl mb-6 flex items-center">
                AI - automations made by me
                <Image
                  src="/arrow-right.png"
                  alt="Arrow pointing right"
                  width={40}
                  height={40}
                  className="ml-4"
                />
              </h2>
            </div>
            <div className="relative">
              <div className="relative w-48 h-48">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="absolute -right-4 -top-4 bg-white text-black p-4 rounded-lg shadow-lg max-w-xs">
                <p className="flex items-center">
                  Hey, I will custom code it for you on camera
                  <Image
                    src="/camera-icon.png"
                    alt="Camera"
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            (hand-made) → on zoom 1:1 meeting with me
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold mb-6">
              In 1 hour on live zoom call with me:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                We'll go over important questions about your workflow
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Identify what you need most to save time
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                I'll create a custom solution with AI automations
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Complete setup and implementation done for you
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Watch How It Works
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/dummy-link"
              className="w-full h-[400px] rounded-lg shadow-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Choose Your Automation Package
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <PricingTier
                key={index}
                {...tier}
                onScheduleCall={() => {
                  /* Implement Calendly/payment dialog */
                }}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-green-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
              Schedule Free 10-min Call
            </button>
            <p className="mt-4 text-gray-600">
              Not sure what's possible? Let's chat about your needs!
            </p>
          </div>
        </div>
      </section>

      {/* Standard Automations Section */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
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
          <h2 className="text-3xl font-bold mb-12 text-center">
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
      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
