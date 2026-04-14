import { Check } from "lucide-react";

export function AcceptableUseContent() {
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
              Prohibited Activities
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              You may not use Brainito's services to engage in, facilitate, or promote any illegal, harmful, or offensive activities. This includes:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Sending unsolicited bulk emails or messages (spam).
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Distributing malware, viruses, or other harmful code.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Infringing on the intellectual property rights of others.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Promoting unlawful products or services.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Violating the terms of service of any third-party platform (e.g., Meta, Google).
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Email/SMS Marketing Rules
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              We only send marketing communications to individuals who have voluntarily provided their contact information or have an existing business relationship with us. All commercial emails we send will include:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Clear identification that the message is an advertisement.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  A valid physical postal address (see our Contact page).
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  A clear and functioning unsubscribe or opt-out mechanism.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Consequences of Violation
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Violation of this policy may result in immediate suspension or termination of your access to our services, without liability to Brainito.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Reporting Abuse
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              If you believe someone is using our services in violation of this policy, please report it to us immediately at support@brainito.com
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
