import { Check } from "lucide-react";

export function PrivacyPolicyContent() {
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
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Information We Collect
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              We may collect the following types of information:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Identity Data: Name, company name, title
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Contact Data: Email address, phone number, billing address
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Technical & Usage Data: IP address, browser type, device info, pages visited, referral source, and interaction data collected via cookies and analytics tools.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Financial Data: Billing information processed by our third-party payment processors (We do not store full payment card details).
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Communications Data: Records of emails, calls, and messages.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              How We Collect Information
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              We collect information directly from you (via forms, emails), automatically through cookies and analytics tools, and from third parties (e.g., advertising platforms, CRM tools you connect).
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              How We Use Your Information
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              We use your information to:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Deliver our services (RMM, consulting, projects).
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Manage billing and accounts.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Improve our website and services through analytics.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Communicate with you about services, updates, and marketing.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Ensure security and prevent fraud.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Comply with legal obligations.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              How We Share Your Information
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              We do not sell your personal information. We may share data with trusted third parties to help us operate our business and deliver services, including:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Analytics Tools: Google Analytics
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Advertising Platforms: Meta (Facebook/Instagram), Google Ads, LinkedIn Ads
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  CRM & Email Marketing Platforms 
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Payment Processors
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Project Management Software
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  These parties are contractually obligated to protect your data.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              International Data Transfers
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Your information may be transferred to and processed in countries other than your own, including India and the United States. We take appropriate safeguards (such as Standard Contractual Clauses) to ensure your data is protected.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Data Security
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              We implement reasonable technical and organizational measures, including secure cloud storage, access controls, and encryption to protect your personal information.
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Data Retention
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              We retain your data for as long as necessary to fulfill the purposes outlined in this policy, including for legal, accounting, or contractual obligations.
            </p>
          </div>

          {/* Section 8 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Your Data Rights & Choices
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal information. To exercise these rights, please contact us at support@brainito.com.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Children's Privacy
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-4">
              Changes to This Policy
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              We may update this policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date.
            </p>
          </div>

          {/* Section 11 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Contact Us
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              For privacy-related inquiries, please contact:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Email: legal@brainito.com
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  India: +91 78899 10101
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  United States: +1 (415) 263-2708
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
