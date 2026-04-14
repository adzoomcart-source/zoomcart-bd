import { ExternalLink, FileText, HelpCircle } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";

const socialLinks = [
  {
    icon: SiWhatsapp,
    label: "WhatsApp Channel",
    sublabel: "Products",
    href: "https://whatsapp.com/channel/0029VbBvLGZAO7RFRcaWmt3r",
    color: "text-success",
  },
  {
    icon: SiTelegram,
    label: "Telegram Channel",
    sublabel: "Products",
    href: "https://t.me/zoomcartbdreseller",
    color: "text-primary",
  },
  {
    icon: SiWhatsapp,
    label: "WhatsApp Group",
    sublabel: "Daily Guide",
    href: "https://chat.whatsapp.com/CsPNgYytOB0JHK7b7olOuy",
    color: "text-success",
  },
  {
    icon: SiTelegram,
    label: "Telegram Tips",
    sublabel: "Marketing",
    href: "https://t.me/zoomcartbd_reseller",
    color: "text-primary",
  },
];

const resourceLinks = [
  {
    icon: FileText,
    label: "Full Guideline",
    href: "https://docs.google.com/document/d/1vpMIXqWgUf8UlaGPiK1yu-TRKYT_zQWhJVx8jW5GXWo/edit?usp=sharing",
  },
  {
    icon: FileText,
    label: "Reseller Rules",
    href: "https://zoomcartbd.xyz/reseller-rules/",
  },
  {
    icon: HelpCircle,
    label: "WhatsApp Support",
    href: "https://wa.me/8801813797898",
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-black text-base">
                Z
              </span>
              <span className="font-display font-bold text-base">
                ZoomCart <span className="text-primary">BD</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              নিজের অনলাইন ব্যবসা শুরু করুন কোনো investment ছাড়াই।
              <br />
              Start your online business — no investment needed.
            </p>
            <a
              href="https://wa.me/8801813797898"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-success hover:underline"
              data-ocid="footer.whatsapp_support_link"
            >
              <SiWhatsapp className="w-3.5 h-3.5" />
              WhatsApp Support: 01813797898
            </a>
          </div>

          {/* Social Channels */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-3 text-foreground">
              Join Our Channels / আমাদের চ্যানেলে যোগ দিন
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-smooth group"
                  data-ocid="footer.social_link"
                >
                  <link.icon className={`w-4 h-4 shrink-0 ${link.color}`} />
                  <span>
                    <span className="font-medium group-hover:underline">
                      {link.label}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      ({link.sublabel})
                    </span>
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-50" />
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-3 text-foreground">
              Resources / রিসোর্স
            </h3>
            <div className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-smooth group"
                  data-ocid="footer.resource_link"
                >
                  <link.icon className="w-3.5 h-3.5 shrink-0 text-secondary" />
                  <span className="font-medium group-hover:underline">
                    {link.label}
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-50" />
                </a>
              ))}
              <a
                href="https://zoomcartbd.xyz/affiliate-registration/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-xs font-bold text-primary hover:underline flex items-center gap-1"
                data-ocid="footer.register_reseller_link"
              >
                রিসেলার হিসেবে রেজিস্ট্রেশন করুন →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year} ZoomCart BD. All rights reserved.
          </p>
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
          >
            Built with love using{" "}
            <span className="font-semibold text-primary">caffeine.ai</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
