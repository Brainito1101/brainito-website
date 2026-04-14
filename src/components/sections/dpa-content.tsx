import { Check } from "lucide-react";

export function DPAContent() {
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
              Data Processing Agreement
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              This Data Processing Agreement ("DPA") reflects the parties' agreement with respect to the Processing of Personal Data by Brainito on behalf of the Client.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Roles & Responsibilities
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              The Client is the Data Controller. Brainito is the Data Processor. Brainito will process Personal Data only on the Client's documented instructions.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Details of Processing
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Subject-matter: Marketing services as described in the main agreement.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Duration: Until the termination of the main agreement.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Nature and Purpose: To provide marketing, consulting, and related services.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Categories of Data: As described in the Privacy Policy (e.g., Contact, Identity, Usage Data).
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Processor Obligations
            </h2>
            <p className="text-[15px] leading-relaxed font-normal mb-6">
              Brainito will:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Implement appropriate technical and organizational security measures.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Ensure personnel are subject to confidentiality obligations.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Assist the Client in responding to data subject requests.
                </span>
              </li>
              <li className="flex gap-4">
                <CheckBullet />
                <span className="text-[15px] leading-relaxed font-normal">
                  Notify the Client of any suspected data breach without undue delay.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Sub-processors
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              The Client authorizes Brainito to engage sub-processors (third-party tools) to deliver the services. A current list includes Google, Meta, LinkedIn, and CRM/email marketing platforms. Brainito will notify the Client of any changes to sub-processors.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Data Transfer Mechanisms
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              For transfers of personal data from the EEA, UK, or Switzerland to countries without an adequacy decision, Brainito will rely on Standard Contractual Clauses (SCCs) as an appropriate safeguard.
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#101011] mb-6">
              Security Breach Procedures
            </h2>
            <p className="text-[15px] leading-relaxed font-normal">
              Upon becoming aware of a data breach, Brainito will notify the Client without undue delay and provide reasonable information to help the Client meet its breach notification obligations.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
