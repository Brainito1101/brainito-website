"use client";

import Image from "next/image";
import { Mail, Phone, Clock, Facebook, Instagram, Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/section";
import { ActionButton } from "@/components/ui/action-button";
import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const businessHours = [
  { label: "Monday - Friday", value: "9:00 AM - 6:00 PM IST" },
  { label: "Saturday", value: "10:00 AM - 4:00 PM IST" },
  { label: "Sunday", value: "Closed" },
];

type MapPopoverId = "us" | "asia";

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [mapPopover, setMapPopover] = useState<MapPopoverId | null>(null);
  const mapPinsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapPopover) return;
    const close = (e: PointerEvent) => {
      if (mapPinsRef.current?.contains(e.target as Node)) return;
      setMapPopover(null);
    };
    document.addEventListener("pointerdown", close, true);
    return () => document.removeEventListener("pointerdown", close, true);
  }, [mapPopover]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.contactForm({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-white pb-6 max-md:pb-4 md:pb-24" aria-labelledby="contact-heading">
      {/* TOP HEADER SECTION (Full width, rounded bottom corners) */}
      <div
        className="w-full rounded-b-[48px] md:rounded-b-[64px] pt-24 pb-20 sm:pt-32 sm:pb-28 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 20%, #F4EEFF 50%, #FAF5FF 80%, #FFFFFF 100%)",
        }}
      >

        <div className="inline-flex items-center justify-center rounded-[40px] border border-[#d1c4e9] bg-transparent px-7 py-2 text-[18px] font-medium text-[#101011]">
          Contact
        </div>

        <h1
          id="contact-heading"
          className="mt-6 sm:mt-8 text-5xl sm:text-6xl md:text-[64px] font-medium text-[#101011] leading-[1.1] tracking-[-0.03em]"
        >
          <span className="bg-gradient-to-b from-[#71389A] to-[#CB84FF] bg-clip-text text-transparent">
            Get in touch{" "}
          </span>
          with us
        </h1>

        <p className="mt-4 sm:mt-6 text-[18px] sm:text-[20px] text-[#292A2C] leading-[1.6] max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message
          <br className="hidden sm:inline" /> and we'll respond as soon as possible.
        </p>

      </div>

      <Container className="relative max-w-[1200px] mt-16 sm:mt-24">
        {/* Main layout */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start">
          {/* Left column – contact details */}
          <div>
            <h2 className="text-[32px] md:text-[48px] font-medium text-[#101011] tracking-[-0.04em]">
              Get in Touch
            </h2>
            <p className="mt-2 max-w-xl text-[16px] text-[#606266] leading-relaxed">
              Whether you have a question about our services, pricing, or anything else, our team is ready
              to answer all your questions.
            </p>

            {/* Email & phone */}
            <div className="mt-8 grid grid-cols-2 gap-18 max-w-sm">
              <div>
                <p className="text-[16px] font-normal text-[#101011]">Email Address</p>
                <a
                  href="mailto:support@brainito.com"
                  className="mt-1.5 inline-flex items-center text-[16px] text-[#606266] hover:text-[#71389A] transition-colors"
                >
                  support@brainito.com
                </a>
              </div>

              <div>
                <p className="text-[16px] font-normal text-[#101011]">Phone Number</p>
                <p className="mt-1.5 text-[16px] text-[#606266]">
                  +91 7383691101
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8">
              <p className="text-[14px] font-medium text-[#101011] mb-3">Follow us</p>
              <div className="flex flex-wrap gap-3">
                <SocialCircle label="Facebook">
                  <Facebook size={16} strokeWidth={1.5} />
                </SocialCircle>
                <SocialCircle label="Instagram">
                  <Instagram size={16} strokeWidth={1.5} />
                </SocialCircle>
                <SocialCircle label="LinkedIn">
                  <Linkedin size={16} strokeWidth={1.5} />
                </SocialCircle>
                <SocialCircle label="YouTube">
                  <Youtube size={16} strokeWidth={1.5} />
                </SocialCircle>
                <SocialCircle label="X (Twitter)">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
                </SocialCircle>
              </div>
            </div>

            {/* Business hours */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF5FF] text-[#71389A]">
                  <Clock size={18} strokeWidth={1.7} />
                </div>
                <p className="text-[15px] font-medium text-[#101011]">Business Hours</p>
              </div>

              <div className="rounded-2xl bg-[#FAF5FF] px-6 py-5 text-[14px] text-[#606266] flex flex-col gap-y-3 max-w-sm">
                {businessHours.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <span>{item.label}</span>
                    <span className="font-medium text-[#101011] text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column – contact form card */}
          <div className="rounded-[28px] border border-[#f0e6ff] bg-white/90 shadow-[0_24px_64px_rgba(113,56,154,0.15)] backdrop-blur-sm p-4 sm:p-6 lg:p-8">
            <h2 className="text-[24px] md:text-[24px] font-medium text-[#71389A] tracking-[-0.03em] mb-8">
              Send us a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First Name*" htmlFor="firstName">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Hailey"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-[52px] w-full rounded-full border border-transparent bg-[#f0f2f6] px-5 text-[15px] text-[#101011] placeholder:text-[#9da3ae] focus:border-[#CB84FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CB84FF]"
                  />
                </Field>

                <Field label="Last Name*" htmlFor="lastName">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Badovinac"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-[52px] w-full rounded-full border border-transparent bg-[#f0f2f6] px-5 text-[15px] text-[#101011] placeholder:text-[#9da3ae] focus:border-[#CB84FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CB84FF]"
                  />
                </Field>
              </div>

              <Field label="Email*" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Hailey@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-[52px] w-full rounded-full border border-transparent bg-[#f0f2f6] px-5 text-[15px] text-[#101011] placeholder:text-[#9da3ae] focus:border-[#CB84FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CB84FF]"
                />
              </Field>

              <Field label="Subject*" htmlFor="subject">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="h-[52px] w-full rounded-full border border-transparent bg-[#f0f2f6] px-5 text-[15px] text-[#101011] placeholder:text-[#9da3ae] focus:border-[#CB84FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CB84FF]"
                />
              </Field>

              <Field label="Message*" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-[24px] border border-transparent bg-[#f0f2f6] px-5 py-4 text-[15px] text-[#101011] placeholder:text-[#9da3ae] focus:border-[#CB84FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CB84FF]"
                />
              </Field>

              <div className="pt-2">
                <ActionButton type="submit" disabled={loading} className="w-full h-[56px] text-[16px]">
                  {loading ? "Sending..." : "Send Message"}
                </ActionButton>
              </div>
            </form>
          </div>
        </div>
      </Container>

      {/* World Map Section — desktop: hover pins; mobile: tap pin to show address */}
      <div className="pointer-events-none relative mb-8 mt-16 w-full max-md:overflow-visible max-md:pb-20 px-4 sm:mb-20 sm:mt-24 md:mb-20 md:mt-32 md:overflow-hidden md:pb-40">
        <div
          ref={mapPinsRef}
          className="relative mx-auto aspect-[2/1] w-full max-w-[1200px] scale-[1.06] sm:scale-[1.1] md:scale-[1.15] lg:scale-[1.08]"
        >
          <style>{`
            @keyframes mapRipple {
              0% { transform: scale(0.3); opacity: 0; }
              5% { transform: scale(0.4); opacity: 0.9; }
              100% { transform: scale(2.4); opacity: 0; }
            }
          `}</style>

          <Image
            src="/vectors/world-map.svg"
            alt="World Map"
            fill
            className="object-contain opacity-100 mix-blend-multiply"
            priority
          />

          {/* US office pin — mobile: tap target then card above z-order; desktop: hover */}
          <div className="group pointer-events-auto absolute left-[29.0%] top-[38.9%] flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center">
            <button
              type="button"
              aria-label={mapPopover === "us" ? "Close United States office details" : "Show United States office address"}
              aria-expanded={mapPopover === "us"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMapPopover((p) => (p === "us" ? null : "us"));
              }}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center md:hidden",
                mapPopover === "us" ? "z-20" : "z-30"
              )}
            >
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span
                  className="absolute h-full w-full rounded-full bg-[#CB84FF]"
                  style={{ animation: "mapRipple 3s cubic-bezier(0.1, 0, 0.3, 1) infinite" }}
                />
                <span
                  className="absolute h-full w-full rounded-full bg-[#CB84FF]"
                  style={{
                    animation: "mapRipple 3s cubic-bezier(0.1, 0, 0.3, 1) infinite 1.5s",
                    animationFillMode: "both",
                  }}
                />
                <span className="absolute h-2 w-2 rounded-full bg-[#e3cdff] opacity-80" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#71389A]" />
              </span>
            </button>

            <div className="relative hidden h-8 w-8 items-center justify-center md:flex">
              <div className="absolute h-full w-full rounded-full bg-[#CB84FF]" style={{ animation: "mapRipple 3s cubic-bezier(0.1, 0, 0.3, 1) infinite" }}></div>
              <div className="absolute h-full w-full rounded-full bg-[#CB84FF]" style={{ animation: "mapRipple 3s cubic-bezier(0.1, 0, 0.3, 1) infinite 1.5s", animationFillMode: "both" }}></div>
              <div className="absolute h-2 w-2 rounded-full bg-[#e3cdff] opacity-80 transition-transform duration-300 group-hover:scale-125"></div>
              <div className="relative h-1.5 w-1.5 rounded-full bg-[#71389A]"></div>
            </div>

            <a
              href="https://maps.google.com/?q=2055+Limestone+Rd+STE+200+-C,+Wilmington,+DE,+New+Castle+US,+19808"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMapPopover(null)}
              className={cn(
                "absolute left-1/2 top-full z-20 -translate-x-1/2 bg-[#f8f0ff] shadow-[0_8px_32px_rgba(113,56,154,0.12)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#71389A]/40",
                "max-md:mt-0.5 max-md:w-[min(calc(100vw-2.5rem),6.25rem)] max-md:max-w-[100px] max-md:rounded-sm max-md:p-1 max-md:shadow-sm",
                "md:mt-3 md:w-[240px] md:rounded-[20px] md:p-4",
                mapPopover === "us" ? "max-md:z-40" : "max-md:z-10",
                mapPopover === "us"
                  ? "max-md:pointer-events-auto max-md:visible max-md:scale-100 max-md:opacity-100"
                  : "max-md:pointer-events-none max-md:invisible max-md:scale-95 max-md:opacity-0",
                "md:pointer-events-none md:invisible md:scale-95 md:opacity-0",
                "md:group-hover:pointer-events-auto md:group-hover:visible md:group-hover:scale-100 md:group-hover:opacity-100"
              )}
            >
              <div className="flex items-start gap-0 md:gap-2.5">
                <div className="mt-0.5 hidden h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white pb-[1px] text-[14px] leading-none text-[#101011] shadow-sm md:flex">
                  🇺🇸
                </div>
                <div className="min-w-0 flex-1 pb-1.5 pr-2 max-md:pb-1.5 max-md:pr-2 md:pb-5 md:pr-8">
                  <h3 className="text-[9px] font-medium leading-none text-[#71389A] md:text-[15px] md:leading-tight">United States</h3>
                  <p className="mt-px text-[8px] leading-[1.22] text-[#606266] md:mt-1.5 md:text-[12px] md:leading-[1.5]">
                    2055 Limestone Rd STE 200 -C<br />
                    Wilmington, DE, New Castle<br />
                    US, 19808
                  </p>
                  <div className="mt-px flex items-center gap-0.5 text-[#71389A] md:mt-2.5 md:gap-1.5">
                    <Phone className="hidden h-3 w-3 shrink-0 md:block" strokeWidth={2} />
                    <span className="line-clamp-1 text-[8px] font-medium md:text-[12px]">+1 442 289 2313</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#A849EB] text-white shadow-sm transition-transform hover:scale-110 md:bottom-3 md:right-3 md:h-7 md:w-7 md:shadow-md">
                <ArrowUpRight className="h-[7px] w-[7px] md:h-3.5 md:w-3.5" strokeWidth={2.5} />
              </div>
            </a>
          </div>

          {/* India office pin */}
          <div className="group pointer-events-auto absolute left-[67.7%] top-[51.0%] flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center">
            <button
              type="button"
              aria-label={mapPopover === "asia" ? "Close India office details" : "Show India office address"}
              aria-expanded={mapPopover === "asia"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMapPopover((p) => (p === "asia" ? null : "asia"));
              }}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center md:hidden",
                mapPopover === "asia" ? "z-20" : "z-30"
              )}
            >
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span
                  className="absolute h-full w-full rounded-full bg-[#CB84FF]"
                  style={{ animation: "mapRipple 3s cubic-bezier(0.1, 0, 0.3, 1) infinite" }}
                />
                <span
                  className="absolute h-full w-full rounded-full bg-[#CB84FF]"
                  style={{
                    animation: "mapRipple 3s cubic-bezier(0.1, 0, 0.3, 1) infinite 1.5s",
                    animationFillMode: "both",
                  }}
                />
                <span className="absolute h-2 w-2 rounded-full bg-[#e3cdff] opacity-80" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#71389A]" />
              </span>
            </button>

            <div className="relative hidden h-8 w-8 items-center justify-center md:flex">
              <div className="absolute h-full w-full rounded-full bg-[#CB84FF]" style={{ animation: "mapRipple 3s cubic-bezier(0.1, 0, 0.3, 1) infinite" }}></div>
              <div className="absolute h-full w-full rounded-full bg-[#CB84FF]" style={{ animation: "mapRipple 3s cubic-bezier(0.1, 0, 0.3, 1) infinite 1.5s", animationFillMode: "both" }}></div>
              <div className="absolute h-2 w-2 rounded-full bg-[#e3cdff] opacity-80 transition-transform duration-300 group-hover:scale-125"></div>
              <div className="relative h-1.5 w-1.5 rounded-full bg-[#71389A]"></div>
            </div>

            <a
              href="https://maps.google.com/?q=India"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMapPopover(null)}
              className={cn(
                "absolute bottom-full left-1/2 z-20 -translate-x-1/2 bg-[#f8f0ff] shadow-[0_8px_32px_rgba(113,56,154,0.12)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#71389A]/40",
                "max-md:mb-0.5 max-md:w-[min(calc(100vw-2.5rem),6.25rem)] max-md:max-w-[100px] max-md:rounded-sm max-md:p-1 max-md:shadow-sm",
                "md:mb-3 md:w-[240px] md:rounded-[20px] md:p-4",
                mapPopover === "asia" ? "max-md:z-40" : "max-md:z-10",
                mapPopover === "asia"
                  ? "max-md:pointer-events-auto max-md:visible max-md:scale-100 max-md:opacity-100"
                  : "max-md:pointer-events-none max-md:invisible max-md:scale-95 max-md:opacity-0",
                "md:pointer-events-none md:invisible md:scale-95 md:opacity-0",
                "md:group-hover:pointer-events-auto md:group-hover:visible md:group-hover:scale-100 md:group-hover:opacity-100"
              )}
            >
              <div className="flex items-start gap-0 md:gap-2.5">
                <div className="mt-0.5 hidden h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white pb-[1px] text-[14px] leading-none text-[#101011] shadow-sm md:flex">
                  🇮🇳
                </div>
                <div className="min-w-0 flex-1 pb-1.5 pr-2 max-md:pb-1.5 max-md:pr-2 md:pb-5 md:pr-8">
                  <h3 className="text-[9px] font-medium leading-none text-[#71389A] md:text-[15px] md:leading-tight">India</h3>
                  <p className="mt-px text-[8px] leading-[1.22] text-[#606266] md:mt-1.5 md:text-[12px] md:leading-[1.5]">
                    Brainito Headquarters<br />
                    Gujarat, India<br />
                  </p>
                  <div className="mt-px flex items-center gap-0.5 text-[#71389A] md:mt-2.5 md:gap-1.5">
                    <Phone className="hidden h-3 w-3 shrink-0 md:block" strokeWidth={2} />
                    <span className="line-clamp-1 text-[8px] font-medium md:text-[12px]">+91 7383691101</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#A849EB] text-white shadow-sm transition-transform hover:scale-110 md:bottom-3 md:right-3 md:h-7 md:w-7 md:shadow-md">
                <ArrowUpRight className="h-[7px] w-[7px] md:h-3.5 md:w-3.5" strokeWidth={2.5} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
};

function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <label className="block space-y-1.5 text-[14px] text-[#101011]" htmlFor={htmlFor}>
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

type SocialCircleProps = {
  label: string;
  children: React.ReactNode;
};

function SocialCircle({ label, children }: SocialCircleProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF5FF] text-[#101011] shadow-sm ring-1 ring-[#e9e0f5] transition-colors hover:bg-[#71389A] hover:text-white"
    >
      {children}
    </button>
  );
}

