import { Check } from "lucide-react";

export function CookiePolicyContent() {
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
              What Are Cookies?
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Cookies are small text files placed on your device when you visit a website. They help the website function and provide information to the website owner.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              How We Use Cookies
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              We use cookies for the following purposes:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Essential Cookies: Necessary for the website to function, such as for security and account login.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Analytics Cookies: To understand how visitors interact with our website, using tools like Google Analytics, to help us improve the user experience.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Marketing Cookies: To track visitors across websites and display relevant advertisements on platforms like Google, Meta, and LinkedIn.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Third-Party Cookies
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              We use services from the following third parties that may place cookies on your device:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Google (Analytics, Ads)
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Meta (Facebook/Instagram)
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  LinkedIn
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  [Add any others, e.g., HubSpot, etc.]
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              How to Manage Cookies
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              You can control and manage cookies in your browser settings. You may also opt out of targeted advertising through the Network Advertising Initiative or Your Online Choices. Please note that blocking or deleting cookies may affect website functionality.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Cookie Duration
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              The length of time a cookie stays on your device depends on whether it is a "session" or "persistent" cookie. Session cookies last until you stop browsing. Persistent cookies last until they expire or are deleted.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
