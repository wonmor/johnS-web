import type { Metadata } from "next";
import type { ReactNode } from "react";
import { messages } from "../i18n/messages";

export const metadata: Metadata = {
  title: `${messages.en["privacy.title"]} — ${messages.en["meta.title"]}`,
  description:
    "Privacy policy in Français, British English, and 한국어 (GDPR / ePrivacy-aligned transparency).",
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
