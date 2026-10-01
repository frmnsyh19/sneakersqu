export interface PromoItem {
  text: string;
  href?: string;
}

export interface PromoMarqueeProps {
  /** Promo messages. Items with `href` render as links. */
  items?: PromoItem[];
  /** Duration of one full loop in seconds (higher = slower). */
  speed?: number;
  /** Extra Tailwind classes for the wrapper (colors, etc.). */
  className?: string;
}

const DEFAULT_ITEMS: PromoItem[] = [
  { text: "Free shipping on orders over $75" },
  { text: "20% off the Air Runner collection, ends October 7", href: "#sale" },
  { text: "Pay in 4 interest-free installments" },
  { text: "Free size exchanges within 14 days" },
  { text: "New drop: Court Low '86, limited stock", href: "#new" },
];

export default function MarquePromosi({
  items = DEFAULT_ITEMS,
  speed = 40,
  className = "bg-lime-300 text-neutral-900",
}: PromoMarqueeProps) {
  const group = (hidden: boolean) => (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-5 whitespace-nowrap py-2.5 pl-5 sm:gap-7 sm:pl-7">
          {item.href ? (
            <a
              href={item.href}
              tabIndex={hidden ? -1 : 0}
              className="underline decoration-1 underline-offset-[3px] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
              {item.text}
            </a>
          ) : (
            <span>{item.text}</span>
          )}
          <span
            aria-hidden="true"
            className="shrink-0 text-xl font-bold leading-none text-orange-500">
            *
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label="Store promotions"
      className={`group overflow-hidden text-[13px] font-medium leading-none sm:text-sm ${className}`}>
      {/* keyframes only; everything else is Tailwind */}
      <style>{`@keyframes promo-marquee { to { transform: translateX(-50%); } }`}</style>

      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)] motion-reduce:overflow-x-auto">
        <div
          className="flex w-max motion-reduce:!animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
          style={{ animation: `promo-marquee ${speed}s linear infinite` }}>
          {group(false)}
          {group(true)}
        </div>
      </div>
    </div>
  );
}
