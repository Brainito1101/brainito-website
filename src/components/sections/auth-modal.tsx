"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Mail, X, Loader2, Sparkles } from "lucide-react";
import styles from "./auth-modal.module.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleMagicLinkRequest = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMagicLinkSent(false);

    if (!email) {
      toast.error("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      // Check for pending website in sessionStorage
      const pendingWebsite = typeof window !== 'undefined' ? sessionStorage.getItem('pendingWebsite') : null;

      const requestBody: { email: string; pending_website?: string } = { email };
      if (pendingWebsite) {
        requestBody.pending_website = pendingWebsite;
      }

      const response = await fetch(`${API_BASE_URL}/auth/magic-link/request/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.success) {
        setMagicLinkSent(true);
        toast.success("Magic link sent! Please check your email.");
      } else {
        toast.error(data.message || "Failed to send magic link. Please try again.");
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const redirectUri =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/google/callback`
          : "";
      const q = redirectUri
        ? `?redirect_uri=${encodeURIComponent(redirectUri)}`
        : "";
      const response = await fetch(`${API_BASE_URL}/auth/google/init${q}`);
      const data = await response.json();

      if (data.auth_url) {
        window.location.href = data.auth_url; // redirect to Google
      } else {
        toast.error("Failed to start Google login.");
        setGoogleLoading(false);
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        // Reset state on close
        setTimeout(() => {
            setMagicLinkSent(false);
            setEmail("");
        }, 300);
      }
    }}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Welcome to <span className={styles.purpleText}>Brainito AI</span>
            </h2>
            <p className={styles.subtext}>
              Track your marketing performance, discover growth opportunities, and generate AI - powered reports instantly.
            </p>
            
            <div className={styles.vectorWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/vectors/signin_vector.svg" 
                alt="Welcome illustration" 
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            <div className={styles.dots}>
              <div className={`${styles.dot} ${styles.dotActive}`} />
              <div className={styles.dot} />
              <div className={styles.dot} style={{ opacity: 0.5 }} />
            </div>
          </div>

          <div className={styles.rightSection}>
            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Close">
                <X size={20} />
              </button>
            </Dialog.Close>

            <h1 className={styles.welcomeTitle}>Welcome</h1>
            <p className={styles.signInText}>Sign in to access your AI Marketing reports</p>

            <div className={styles.form}>
              {!magicLinkSent ? (
                <>
                  <div className={styles.inputGroup}>
                    <div className={styles.inputLabelWrapper}>
                      <label htmlFor="email" className={styles.label}>Email Address</label>
                      <span className={styles.link}>
                        We&apos;ll send you a link to <span className={styles.purpleLink}>sign in</span>
                      </span>
                    </div>
                    <div className={styles.inputWrapper}>
                      <Mail className={styles.inputIcon} size={22} />
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className={styles.separator}>
                    <div className={styles.line} />
                    <span className={styles.separatorText}>Or continue with Email</span>
                    <div className={styles.line} />
                  </div>

                  <button 
                    className={styles.googleButton} 
                    onClick={handleGoogleLogin}
                    disabled={googleLoading || loading}
                  >
                    {googleLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className={styles.googleIcon} />
                            Continue with Google
                        </>
                    )}
                  </button>

                  <button 
                    className={styles.primaryButton}
                    onClick={handleMagicLinkRequest}
                    disabled={loading || googleLoading}
                  >
                    {loading ? (
                        <Loader2 className="animate-spin inline-block mr-2" size={18} />
                    ) : (
                        <Sparkles className="animate-pulse inline-block mr-2" size={18} />
                    )}
                    {loading ? "Sending link..." : "Continue with email"}
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-[#FAF5FF] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail size={32} className="text-[#71389A]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Check Your Email</h3>
                    <p className="text-[#606266] mb-8">
                        We&apos;ve sent a magic link to <span className="font-semibold text-black">{email}</span>. Click the link to log in.
                    </p>
                    <button 
                        className={styles.googleButton}
                        onClick={() => setMagicLinkSent(false)}
                    >
                        Use a different email
                    </button>
                </div>
              )}

              <p className={styles.termsText}>
                By continuing, you agree to our <a href="#" className={styles.termsLink}>Terms & Privacy</a>.
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
