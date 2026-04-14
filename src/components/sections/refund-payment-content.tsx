import { Check } from "lucide-react";

export function RefundPaymentContent() {
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
              Service Fees & Billing Cycles
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Our fees are outlined in your signed proposal or agreement. Services are billed on a monthly retainer or project milestone basis. Invoices are issued in advance and are due by the specified date.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              No-Refund Standard
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              All payments made to Brainito for services are non-refundable. This includes retainers for the Remote Marketing Manager, consulting fees, and fees for services commenced, such as strategy development, campaign setup, or audits. This policy is necessary because we immediately invest time and resources into your projects.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Refund Exceptions
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Refunds are not standard but may be considered on a case-by-case basis in the unlikely event that a project-based service (e.g., a website build) has not been started, and a written request is received. Any approved refund would be detailed in a written agreement.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Non-Refundable Items
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              The following items are strictly non-refundable:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Ad spend budgets and media buying costs.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Third-party software subscriptions and platform fees (e.g., Meta, Google, Shopify).
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Fees paid to external vendors, influencers, or partners.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Late Payments & Consequences
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              Payments must be made by the due date.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Late Penalty: For RMM or management services unpaid for more than 60 days past the due date, a flat penalty of 25% of the outstanding amount may be applied.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Service Suspension: We reserve the right to pause all services if your account is delinquent.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Work Product Ownership: Until all outstanding dues are cleared, Brainito retains ownership and all usage rights to the work products created (e.g., creatives, ad campaigns, content). You may not use these materials until payment is made in full.
                </span>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
