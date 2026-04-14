/**
 * Optional Stripe Payment Link URLs (Dashboard → Product catalog → Payment links).
 * When set, visitors can subscribe without signing in; signed-in users still prefer
 * API checkout when stripe_price_id is present so the subscription ties to their account.
 */
const DIY = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_DIY?.trim() ?? "";
const MARKETER = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MARKETER?.trim() ?? "";

export function stripePaymentLinkForPlanName(name: string): string | undefined {
    const n = name.toLowerCase();
    if (n.includes("diy") && DIY) return DIY;
    if ((n.includes("marketer") || n.includes("hire a marketer")) && MARKETER) return MARKETER;
    return undefined;
}

/** Home / DIY page pricing cards use stable ids (`standard` = DIY, `premium` = Hire a Marketer). */
export function stripePaymentLinkForHomePricingPlanId(planId: string): string | undefined {
    if (planId === "standard" && DIY) return DIY;
    if (planId === "premium" && MARKETER) return MARKETER;
    return undefined;
}
