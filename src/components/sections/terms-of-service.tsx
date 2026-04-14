import { Check } from "lucide-react";

export function TermsOfServiceContent() {
  const CheckBullet = () => (
    <div className="flex bg-[#F3E8FF] rounded-full min-w-5 w-5 h-5 items-center justify-center shrink-0 mt-[3px]">
      <Check className="w-[10px] h-[10px] text-[#A465D8] stroke-[3.5]" />
    </div>
  );

  return (
    <section className="w-full bg-white pb-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="max-w-4xl text-[#3b3c3f]">
          
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you may not use our services.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Definitions & Products
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  "Brainito," "we," "us," "our" refers to Brainito INC (for clients in the United States and international clients) and Wockito Innovative Solutions Private Limited (for clients in India).
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  "Client," "you," "your" refers to the individual or entity using our services.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <div className="text-[15px] leading-relaxed font-normal w-full">
                  "Services" refers to the products offered by Brainito, including:
                  <ul className="mt-4 space-y-4 ml-5 list-disc list-outside marker:text-[#3b3c3f]">
                    <li className="pl-1">
                      <span>Remote Marketing Manager (RMM): A dedicated strategist managing your marketing execution and coordination, including strategy, campaign management, and analytics. Exact deliverables are defined in your signed proposal.</span>
                    </li>
                    <li className="pl-1">
                      <span>Consulting & Strategy Services: Strategic documents such as marketing plans, growth strategies, audits, and advisory reports provided for informational and strategic guidance.</span>
                    </li>
                    <li className="pl-1">
                      <span>Project-Based Services: Execution services for specific projects like websites, funnels, or campaigns, as defined in a separate agreement.</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Account Registration & Security
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and current information.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Service-Specific Terms
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Marketing & Strategy Services: When we are providing our marketing & strategy services, project implementation is governed by specific statements of work, and delivery timelines may be adjusted by mutual agreement. Results are not guaranteed unless specifically stated in your service agreement.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Creative Management Operations: You are responsible for providing the necessary inputs (content, marketing material) to allow Brainito to perform its creative services. Brainito is not responsible for delays caused by the customer lacking these required inputs.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Our Marketing Product/SaaS: Use of our marketing automation products (when applicable) is governed by separate End User License Agreements, and use of third-party platforms for any automation is governed by the respective third parties.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Intellectual Property
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Brainito retains all intellectual property rights to our proprietary technology, tools, methodologies, and materials provided to you under this agreement.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Using our services does not grant you ownership of any of our intellectual property or the deliverables we produce unless otherwise agreed.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Client Materials: You retain all rights to any materials or content you provide to us to perform our services (e.g. your logos, text content).
                </span>
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Client Responsibilities & Acceptable Use
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              You agree to provide necessary access, and comply with all applicable laws. You must not: use our services for illegal activities, spam, unauthorized data collection, or transmit harmful code. Treat our platform and teams with respect.
            </p>
          </div>

          {/* Section 7 - Repeated Title as in the image */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Intellectual Property
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Client Content: You retain ownership of all content, data, and materials you provide. You grant us a limited license to use this content solely to deliver our services.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Brainito Materials: We retain ownership of all pre-existing tools, methodologies, and templates. Upon full payment, we grant you a license to use deliverables subject to the terms in this agreement.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Term & Termination
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              These terms remain in effect until terminated by either party. You may cancel your services with written notice as per our agreement (e.g., 30 days notice for Retainers). We reserve the right to suspend or terminate your access for violating these Terms.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Disclaimer of Warranties: Limitation of Liability
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Our services are provided "as is." To the maximum extent permitted by law, we disclaim all warranties. We do not guarantee specific results. Brainito shall not be liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount you paid for services in the six months prior to the event giving rise to the claim.
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Governing Law & Dispute Resolution
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  For clients contracting with Brainito INC (US): These Terms are governed by the laws of the State of Delaware, without regard to its conflict of laws principles.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  For clients contracting with Wockito Innovative Solutions Private Limited (India): These Terms are governed by the laws of India. All disputes will be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 11 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              General Provisions
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              If any part of these Terms is held unenforceable, the remaining provisions will remain in effect. These Terms constitute the entire agreement between you and Brainito regarding our services.
            </p>
          </div>

          {/* Section 12 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Contact Us
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              For questions about these Terms, please contact us at:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Email: support@brainito.com
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  India: +91 73836 91101
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  United States: +1 442 289 2313
                </span>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
