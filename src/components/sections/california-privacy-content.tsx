import { Check } from "lucide-react";

export function CaliforniaPrivacyContent() {
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
              Your Rights
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              As a California resident, you have the right to:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Request Access: Request that we disclose the categories and specific pieces of personal information we have collected about you.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Request Deletion: Request that we delete the personal information we have collected from you.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Opt-Out of Sale/Sharing: The right to opt out of the sale or sharing of your personal information. Brainito does not sell or share personal information for monetary or other valuable consideration.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Non-Discrimination: We will not discriminate against you for exercising any of your CCPA rights.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Personal Information We Collect
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              In the last twelve months, we may have collected the following categories of personal information:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Identifiers: Name, email address, IP address.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  California Customer Records: Name, phone number, billing address.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Commercial Information: Records of products or services purchased
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Internet Activity: Browsing history, interaction with our website.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Geolocation Data: IP-based location.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Professional/Employment Information: Company name, job title.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Sources and Business Purposes
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              We collect this information directly from you, from your devices, and from third parties (as detailed in our main Privacy Policy). We use it to provide services, improve our website, communicate with you, and for security.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              How to Exercise Your Rights
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  To exercise your access, deletion, or opt-out rights, please submit a verifiable request to us by:
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <div className="text-[15px] leading-relaxed font-normal w-full">
                  Email: support@brainito.com
                  <ul className="mt-4 space-y-4 ml-5 list-disc list-outside marker:text-[#3b3c3f]">
                    <li className="pl-1">
                      <span>We will verify your identity by requesting information that matches our records before processing your request.</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Contact for More Information
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              If you have any questions about this notice, please contact us at support@brainito.com
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
