import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return getPageMetadata("/data-cookie-policy");
}

export default function DataCookiePolicyPage() {
    return (
        <LegalLayout title="Data & Cookie Policy" lastUpdated="January 1, 2025">
            <div className="prose">
                <h2>1. What Are Cookies?</h2>
                <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.
                </p>

                <h2>2. How We Use Cookies</h2>
                <p>We use cookies for the following purposes:</p>
                <ul>
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security.</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve user experience.</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
                    <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
                </ul>

                <h2>3. Types of Cookies We Use</h2>
                
                <h3>Essential Cookies</h3>
                <p>
                    These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as logging in or filling out forms.
                </p>

                <h3>Analytics Cookies</h3>
                <p>
                    We use analytics tools like Google Analytics to understand how visitors use our site. These cookies collect information in an anonymous form.
                </p>

                <h3>Marketing Cookies</h3>
                <p>
                    These cookies may be set through our site by advertising partners. They may be used to build a profile of your interests and show you relevant ads on other sites.
                </p>

                <h2>4. Third-Party Cookies</h2>
                <p>
                    We may use third-party services that place cookies on your device. These include analytics providers, advertising networks, and social media platforms. These third parties have their own privacy policies.
                </p>

                <h2>5. Managing Cookies</h2>
                <p>You can control and manage cookies in several ways:</p>
                <ul>
                    <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through settings.</li>
                    <li><strong>Opt-Out Tools:</strong> Use industry opt-out tools to decline tracking cookies.</li>
                    <li><strong>Our Cookie Settings:</strong> Use our cookie consent banner to manage your preferences.</li>
                </ul>
                <p>
                    Note: Disabling certain cookies may affect the functionality of our website.
                </p>

                <h2>6. Data Retention</h2>
                <p>
                    We retain cookie data for varying periods depending on the type of cookie. Session cookies are deleted when you close your browser. Persistent cookies remain until they expire or you delete them.
                </p>

                <h2>7. Updates to This Policy</h2>
                <p>
                    We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>

                <h2>8. Contact Us</h2>
                <p>
                    If you have questions about our use of cookies, please contact us at:<br />
                    <strong>Email:</strong> support@brainito.com<br />
                    <strong>Address:</strong> Wockito Innovative Solutions PVT LTD, 1101, 11th Floor, Satyamev Elite, Ambli-Bopal, Vakil Saheb Bridge, T Junction, Ahmedabad, Gujarat 380058, India
                </p>
            </div>
        </LegalLayout>
    );
}
