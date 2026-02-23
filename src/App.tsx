import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { LinkWeb } from "./components/LinkWeb";
import { Input } from "./components/Input";
import { Badge } from "./components/Badge";
import { Text, type TextVariant } from "./components/Text";
import { Icon, type IconName } from "./components/Icon";

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Nav config ──────────────────────────────────────────────────────────────

const NAV = [
  {
    group: "Foundation",
    items: [
      { label: "Colors",          href: "#colors"          },
      { label: "Typography",      href: "#typography"      },
      { label: "Spacing",         href: "#spacing"         },
      { label: "Border",          href: "#border"          },
      { label: "Shadows",         href: "#shadows"         },
      { label: "Sizing & Layout", href: "#sizing-layout"   },
      { label: "Iconography",     href: "#iconography"     },
    ],
  },
  {
    group: "Components",
    items: [
      { label: "Button",  href: "#button"  },
      { label: "Badge",   href: "#badge"   },
      { label: "Input",   href: "#input"   },
      { label: "LinkWeb", href: "#linkweb" },
    ],
  },
];

// ─── Color palette ───────────────────────────────────────────────────────────

type ColorToken = { name: string; hex: string; dark?: boolean };
type ColorGroup = { group: string; colors: ColorToken[] };

const COLOR_PALETTE: ColorGroup[] = [
  {
    group: "Accent",
    colors: [
      { name: "Soft 100",    hex: "#EEFFC7" },
      { name: "Light 200",   hex: "#DBFF95" },
      { name: "Primary 300", hex: "#BEFF50" },
      { name: "Middle 500",  hex: "#86DD05" },
      { name: "Dark 700",    hex: "#4D8605", dark: true },
    ],
  },
  {
    group: "Basics",
    colors: [
      { name: "Black",          hex: "#000000", dark: true },
      { name: "White",          hex: "#FFFFFF" },
      { name: "Text Secondary", hex: "#95958F", dark: true },
    ],
  },
  {
    group: "Beige",
    colors: [
      { name: "Light 25",  hex: "#FBFBF7" },
      { name: "Base 50",   hex: "#F5F5EB" },
      { name: "Middle 100",hex: "#DCDCCB" },
      { name: "Dark 200",  hex: "#D0CFB8" },
      { name: "Bold 300",  hex: "#B4B290" },
    ],
  },
  {
    group: "Grey",
    colors: [
      { name: "Soft",        hex: "#EBEBEB" },
      { name: "Soft Middle", hex: "#D8D8D8" },
      { name: "Middle",      hex: "#C3C3C3" },
      { name: "Dark",        hex: "#949494", dark: true },
    ],
  },
  {
    group: "Status",
    colors: [
      { name: "Error 1",   hex: "#DC2625", dark: true },
      { name: "Error 2",   hex: "#FECACA" },
      { name: "Error 3",   hex: "#FFE0E0" },
      { name: "Warning 1", hex: "#E89E1B", dark: true },
      { name: "Warning 2", hex: "#FFEBC6" },
    ],
  },
];

function ColorSwatch({ name, hex }: ColorToken) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-16 rounded-lg border border-grey-soft"
        style={{ backgroundColor: hex }}
        aria-label={`${name} — ${hex}`}
      />
      <div>
        <Text variant="body-sm" bold className="leading-tight">{name}</Text>
        <Text variant="caption-lg" className="text-black/40 font-mono tabular-nums">{hex}</Text>
      </div>
    </div>
  );
}

// ─── Foundation data ─────────────────────────────────────────────────────────

const SPACING_SCALE = [
  { token: "--space-1",  tw: "p-1",  px: 4  },
  { token: "--space-2",  tw: "p-2",  px: 8  },
  { token: "--space-3",  tw: "p-3",  px: 12 },
  { token: "--space-4",  tw: "p-4",  px: 16 },
  { token: "--space-5",  tw: "p-5",  px: 20 },
  { token: "--space-6",  tw: "p-6",  px: 24 },
  { token: "--space-8",  tw: "p-8",  px: 32 },
  { token: "--space-10", tw: "p-10", px: 40 },
  { token: "--space-12", tw: "p-12", px: 48 },
  { token: "--space-16", tw: "p-16", px: 64 },
  { token: "--space-20", tw: "p-20", px: 80 },
  { token: "--space-24", tw: "p-24", px: 96 },
];

const RADIUS_SCALE = [
  { name: "None", token: "--radius-none", px: 0    },
  { name: "XS",   token: "--radius-xs",   px: 2    },
  { name: "SM",   token: "--radius-sm",   px: 4    },
  { name: "MD",   token: "--radius-md",   px: 8    },
  { name: "LG",   token: "--radius-lg",   px: 12   },
  { name: "XL",   token: "--radius-xl",   px: 16   },
  { name: "2XL",  token: "--radius-2xl",  px: 24   },
  { name: "Full", token: "--radius-full", px: 9999 },
];

const BORDER_WIDTH_SCALE = [
  { name: "0",  token: "—",                 px: 0 },
  { name: "1",  token: "--border-width-1",  px: 1 },
  { name: "2",  token: "--border-width-2",  px: 2 },
  { name: "4",  token: "--border-width-4",  px: 4 },
];

const SHADOW_SCALE = [
  { name: "None", token: "—",           label: "Sin elevación",  value: "none" },
  { name: "SM",   token: "--shadow-sm", label: "Sutil",          value: "0 1px 2px 0 rgba(0,0,0,0.05)" },
  { name: "MD",   token: "--shadow-md", label: "Card",           value: "0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)" },
  { name: "LG",   token: "--shadow-lg", label: "Dropdown",       value: "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)" },
  { name: "XL",   token: "--shadow-xl", label: "Modal / Overlay",value: "0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)" },
];

const BREAKPOINTS = [
  { name: "Base",  token: "—",                  px: 375,  note: "Mobile default"   },
  { name: "SM",    token: "--breakpoint-sm",     px: 640,  note: "Mobile landscape" },
  { name: "MD",    token: "--breakpoint-md",     px: 768,  note: "Tablet"           },
  { name: "LG",    token: "--breakpoint-lg",     px: 1024, note: "Desktop"          },
  { name: "XL",    token: "--breakpoint-xl",     px: 1280, note: "Large desktop"    },
  { name: "2XL",   token: "--breakpoint-2xl",    px: 1536, note: "Wide"             },
];

const GRID_COLUMNS = [
  { cols: 4,  note: "Mobile" },
  { cols: 8,  note: "Tablet" },
  { cols: 12, note: "Desktop" },
];

// ─── Icon names ──────────────────────────────────────────────────────────────

const ICON_NAMES: IconName[] = [
  "accessibility","activity","air-vent","airplay","alarm-check","alarm-clock",
  "alarm-clock-off","alarm-minus","alarm-plus","album","alert-circle",
  "alert-octagon","alert-triangle","align-center","align-center-horizontal",
  "align-center-vertical","align-end-horizontal","align-end-vertical",
  "align-horizontal-distribute-center","align-horizontal-distribute-end",
  "align-horizontal-distribute-start","align-horizontal-justify-center",
  "align-horizontal-justify-end","align-horizontal-justify-start",
  "align-horizontal-space-around","align-horizontal-space-between",
  "align-justify","align-left","align-right","align-start-horizontal",
  "align-start-vertical","align-vertical-distribute-center",
  "align-vertical-distribute-end","align-vertical-distribute-start",
  "align-vertical-justify-center","align-vertical-justify-end",
  "align-vertical-justify-start","align-vertical-space-around",
  "align-vertical-space-between","anchor","angry","annoyed","aperture",
  "apple","archive","archive-restore","armchair","arrow-big-down",
  "arrow-big-left","arrow-big-right","arrow-big-up","arrow-down",
  "arrow-down-circle","arrow-down-left","arrow-down-right","arrow-left",
  "arrow-left-circle","arrow-left-right","arrow-right","arrow-right-circle",
  "arrow-up","arrow-up-circle","arrow-up-down","arrow-up-left","arrow-up-right",
  "asterisk","at-sign","award","axe","axis-3d","baby","backpack",
  "baggage-claim","banana","banknote","bar-chart","bar-chart-2","bar-chart-3",
  "bar-chart-4","bar-chart-horizontal","baseline","bath","battery",
  "battery-charging","battery-full","battery-low","battery-medium",
  "battery-warning","beaker","bean","bean-off","bed","bed-double","bed-single",
  "beef","beer","bell","bell-minus","bell-off","bell-plus","bell-ring","bike",
  "binary","bitcoin","bluetooth","bluetooth-connected","bluetooth-off",
  "bluetooth-searching","bold","bomb","bone","book","book-open",
  "book-open-check","bookmark","bookmark-minus","bookmark-plus","bot","box",
  "box-select","boxes","briefcase","brush","bug","building","building-2","bus",
  "cake","calculator","calendar","calendar-check","calendar-check-2",
  "calendar-clock","calendar-days","calendar-heart","calendar-minus",
  "calendar-off","calendar-plus","calendar-range","calendar-search",
  "calendar-x","calendar-x-2","camera","camera-off","candy","candy-off","car",
  "carrot","cast","cat","check","check-check","check-circle","check-circle-2",
  "check-square","chef-hat","cherry","chevron-down","chevron-first",
  "chevron-last","chevron-left","chevron-right","chevron-up","chevrons-down",
  "chevrons-down-up","chevrons-left","chevrons-left-right","chevrons-right",
  "chevrons-right-left","chevrons-up","chevrons-up-down","chrome","cigarette",
  "cigarette-off","circle","circle-dot","circle-ellipsis","circle-slashed",
  "citrus","clapperboard","clipboard","clipboard-check","clipboard-copy",
  "clipboard-edit","clipboard-list","clipboard-signature","clipboard-type",
  "clipboard-x","clock","clock-1","clock-10","clock-11","clock-12","clock-2",
  "clock-3","clock-4","clock-5","clock-6","clock-7","clock-8","clock-9",
  "cloud","cloud-cog","cloud-drizzle","cloud-fog","cloud-hail",
  "cloud-lightning","cloud-moon","cloud-moon-rain","cloud-off","cloud-rain",
  "cloud-rain-wind","cloud-snow","cloud-sun","cloud-sun-rain","cloudy","clover",
  "code","code-2","codepen","codesandbox","coffee","cog","coins","columns",
  "command","compass","component","concierge-bell","contact","contrast",
  "cookie","copy","copyleft","copyright","corner-down-left","corner-down-right",
  "corner-left-down","corner-left-up","corner-right-down","corner-right-up",
  "corner-up-left","corner-up-right","cpu","credit-card","croissant","crop",
  "cross","crosshair","crown","cup-soda","curly-braces","currency","database",
  "database-backup","delete","diamond","dice-1","dice-2","dice-3","dice-4",
  "dice-5","dice-6","dices","diff","disc","divide","divide-circle",
  "divide-square","dna","dna-off","dog","dollar-sign","download",
  "download-cloud","dribbble","droplet","droplets","drumstick","dumbbell","ear",
  "ear-off","edit","edit-2","edit-3","egg","egg-fried","egg-off","equal",
  "equal-not","eraser","euro","expand","external-link","eye","eye-off",
  "facebook","factory","fan","fast-forward","feather","figma","file",
  "file-archive","file-audio","file-audio-2","file-axis-3d","file-badge",
  "file-badge-2","file-bar-chart","file-bar-chart-2","file-box","file-check",
  "file-check-2","file-clock","file-code","file-cog","file-cog-2","file-diff",
  "file-digit","file-down","file-edit","file-heart","file-image","file-input",
  "file-json","file-json-2","file-key","file-key-2","file-line-chart",
  "file-lock","file-lock-2","file-minus","file-minus-2","file-output",
  "file-pie-chart","file-plus","file-plus-2","file-question","file-scan",
  "file-search","file-search-2","file-signature","file-spreadsheet",
  "file-symlink","file-terminal","file-text","file-type","file-type-2",
  "file-up","file-video","file-video-2","file-volume","file-volume-2",
  "file-warning","file-x","file-x-2","files","film","filter","fingerprint",
  "fish","flag","flag-off","flag-triangle-left","flag-triangle-right","flame",
  "flashlight","flashlight-off","flask-conical","flask-conical-off",
  "flask-round","flip-horizontal","flip-horizontal-2","flip-vertical",
  "flip-vertical-2","flower","flower-2","focus","folder","folder-archive",
  "folder-check","folder-clock","folder-closed","folder-cog","folder-cog-2",
  "folder-down","folder-edit","folder-heart","folder-input","folder-key",
  "folder-lock","folder-minus","folder-open","folder-output","folder-plus",
  "folder-search","folder-search-2","folder-symlink","folder-tree","folder-up",
  "folder-x","folders","form-input","forward","frame","framer","frown","fuel",
  "function-square","gamepad","gamepad-2","gauge","gavel","gem","ghost","gift",
  "git-branch","git-branch-plus","git-commit","git-compare","git-fork",
  "git-merge","git-pull-request","git-pull-request-closed",
  "git-pull-request-draft","github","gitlab","glass-water","glasses","globe",
  "globe-2","grab","graduation-cap","grape","grid","grip-horizontal",
  "grip-vertical","hammer","hand","hand-metal","hard-drive","hard-hat","hash",
  "haze","heading","heading-1","heading-2","heading-3","heading-4","heading-5",
  "heading-6","headphones","heart","heart-crack","heart-handshake","heart-off",
  "heart-pulse","help-circle","hexagon","highlighter","history","home","hop",
  "hop-off","hourglass","ice-cream","ice-cream-2","image","image-minus",
  "image-off","image-plus","import","inbox","indent","indian-rupee","infinity",
  "info","inspect","instagram","italic","japanese-yen","joystick","key",
  "keyboard","lamp","lamp-ceiling","lamp-desk","lamp-floor","lamp-wall-down",
  "lamp-wall-up","landmark","languages","laptop","laptop-2","lasso",
  "lasso-select","laugh","layers","layout","layout-dashboard","layout-grid",
  "layout-list","layout-template","leaf","library","life-buoy","lightbulb",
  "lightbulb-off","line-chart","link","link-2","link-2-off","linkedin","list",
  "list-checks","list-end","list-minus","list-music","list-ordered","list-plus",
  "list-start","list-video","list-x","loader","loader-2","locate",
  "locate-fixed","locate-off","lock","log-in","log-out","luggage","magnet",
  "mail","mail-check","mail-minus","mail-open","mail-plus","mail-question",
  "mail-search","mail-warning","mail-x","mails","map","map-pin","map-pin-off",
  "martini","maximize","maximize-2","medal","megaphone","megaphone-off","meh",
  "menu","message-circle","message-square","mic","mic-2","mic-off","microscope",
  "microwave","milestone","milk","milk-off","minimize","minimize-2","minus",
  "minus-circle","minus-square","monitor","monitor-off","monitor-smartphone",
  "monitor-speaker","moon","more-horizontal","more-vertical","mountain",
  "mountain-snow","mouse","mouse-pointer","mouse-pointer-2",
  "mouse-pointer-click","move","move-3d","move-diagonal","move-diagonal-2",
  "move-horizontal","move-vertical","music","music-2","music-3","music-4",
  "navigation","navigation-2","navigation-2-off","navigation-off","network",
  "newspaper","nut","nut-off","octagon","option","outdent","package","package-2",
  "package-check","package-minus","package-open","package-plus",
  "package-search","package-x","paint-bucket","paintbrush","paintbrush-2",
  "palette","palmtree","paperclip","party-popper","pause","pause-circle",
  "pause-octagon","pen-tool","pencil","percent","person-standing","phone",
  "phone-call","phone-forwarded","phone-incoming","phone-missed","phone-off",
  "phone-outgoing","pie-chart","piggy-bank","pilcrow","pin","pin-off","pipette",
  "pizza","plane","play","play-circle","plug","plug-2","plug-zap","plus",
  "plus-circle","plus-square","pocket","podcast","pointer","pound-sterling",
  "power","power-off","printer","puzzle","qr-code","quote","radio",
  "radio-receiver","rectangle-horizontal","rectangle-vertical","recycle","redo",
  "redo-2","refresh-ccw","refresh-cw","refrigerator","regex","repeat","repeat-1",
  "reply","reply-all","rewind","rocket","rocking-chair","rotate-3d","rotate-ccw",
  "rotate-cw","rss","ruler","russian-ruble","sailboat","salad","sandwich","save",
  "scale","scale-3d","scaling","scan","scan-face","scan-line","scissors",
  "screen-share","screen-share-off","scroll","search","send",
  "separator-horizontal","separator-vertical","server","server-cog",
  "server-crash","server-off","settings","settings-2","share","share-2","sheet",
  "shield","shield-alert","shield-check","shield-close","shield-off","shirt",
  "shopping-bag","shopping-cart","shovel","shower-head","shrink","shrub",
  "shuffle","sidebar","sidebar-close","sidebar-open","sigma","signal",
  "signal-high","signal-low","signal-medium","signal-zero","siren","skip-back",
  "skip-forward","skull","slack","slash","slice","sliders","sliders-horizontal",
  "smartphone","smartphone-charging","smile","smile-plus","snowflake","sofa",
  "sort-asc","sort-desc","soup","speaker","spline","sprout","square","star",
  "star-half","star-off","stethoscope","sticker","sticky-note","stop-circle",
  "stretch-horizontal","stretch-vertical","strikethrough","subscript",
  "subtitles","sun","sun-dim","sun-medium","sun-moon","sun-snow","sunrise",
  "sunset","superscript","swiss-franc","switch-camera","sword","swords",
  "syringe","table","table-2","tablet","tag","tags","target","tent","terminal",
  "terminal-square","text-cursor","text-cursor-input","thermometer",
  "thermometer-snowflake","thermometer-sun","thumbs-down","thumbs-up","ticket",
  "timer","timer-off","timer-reset","toggle-left","toggle-right","tornado",
  "toy-brick","train","trash","trash-2","tree-deciduous","tree-pine","trees",
  "trello","trending-down","trending-up","triangle","trophy","truck","tv","tv-2",
  "twitch","twitter","type","umbrella","underline","undo","undo-2","unlink",
  "unlink-2","unlock","upload","upload-cloud","usb","user","user-check",
  "user-cog","user-minus","user-plus","user-x","users","utensils",
  "utensils-crossed","vegan","venetian-mask","verified","vibrate","vibrate-off",
  "video","video-off","view","voicemail","volume","volume-1","volume-2",
  "volume-x","wallet","wand","wand-2","watch","waves","webcam","webhook",
  "wheat","wheat-off","wifi","wifi-off","wind","wine","wine-off","wrap-text",
  "wrench","x","x-circle","x-octagon","x-square","youtube","zap","zap-off",
  "zoom-in","zoom-out",
];

// ─── Active section hook ──────────────────────────────────────────────────────

const ALL_IDS = NAV.flatMap(({ items }) => items.map(({ href }) => href.slice(1)));

function useActiveSection() {
  const [active, setActive] = useState<string>(ALL_IDS[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

// ─── Layout primitives ───────────────────────────────────────────────────────

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const active = useActiveSection();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="sidebar-nav"
        aria-label="Design system navigation"
        className={`fixed top-0 left-0 h-screen w-60 flex flex-col bg-primary overflow-y-auto z-30 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <Text variant="h4" as="span" className="text-primary-text">Plinng</Text>
            <Text variant="caption-lg" as="p" className="text-white/40 mt-0.5">Design System v0.1</Text>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden flex items-center justify-center w-8 h-8 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close navigation"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav aria-label="Design system sections" className="flex-1 px-3 py-4 flex flex-col gap-5">
          {NAV.map(({ group, items }) => (
            <div key={group}>
              <Text variant="overline" as="p" className="text-white/30 px-3 mb-1 tracking-[2px]">{group}</Text>
              <ul role="list" className="flex flex-col gap-0.5">
                {items.map(({ label, href }) => {
                  const id = href.slice(1);
                  const isActive = active === id;
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        onClick={onClose}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                          isActive
                            ? "bg-secondary text-secondary-text"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="flex flex-col gap-6 scroll-mt-10"
    >
      <div className="pb-5 border-b border-grey-soft">
        <Text as="h2" variant="h2" id={`${id}-heading`}>{title}</Text>
        {description && (
          <Text variant="body-sm" as="p" className="text-disabled mt-1">{description}</Text>
        )}
      </div>
      {children}
    </section>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Text variant="overline" as="p" className="text-disabled tracking-[2px]">{label}</Text>
      <div className="rounded-xl bg-white shadow-sm p-4 sm:p-6 flex flex-wrap gap-4 items-start">
        {children}
      </div>
    </div>
  );
}

// ─── Iconography section ─────────────────────────────────────────────────────

function IconographySection() {
  const [query, setQuery] = useState("");
  const filtered = query.trim()
    ? ICON_NAMES.filter((n) => n.includes(query.trim().toLowerCase()))
    : ICON_NAMES;

  return (
    <Section
      id="iconography"
      title="Iconography"
      description={`${ICON_NAMES.length} icons from Lucide — consistent 24×24 stroke icons. Use the Icon component with the name prop.`}
    >
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none">
            <Icon name="search" size={16} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${ICON_NAMES.length} icons…`}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-grey-soft rounded-lg bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            aria-label="Search icons"
          />
        </div>

        {/* Count */}
        {query.trim() && (
          <Text variant="caption-lg" className="text-black/40">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{query.trim()}"
          </Text>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-1">
            {filtered.map((name) => (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => navigator.clipboard?.writeText(name).catch(() => {})}
                className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
              >
                <Icon name={name} size={20} className="text-black group-hover:text-black" />
                <span className="text-[9px] text-black/40 font-mono text-center leading-tight line-clamp-2 w-full break-all">
                  {name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-12 text-black/30">
            <Icon name="frown" size={32} />
            <Text variant="body-sm">No icons match "{query.trim()}"</Text>
          </div>
        )}

        {/* Usage note */}
        <div className="rounded-lg bg-white shadow-sm p-4 border-l-2 border-secondary">
          <Text variant="caption-lg" bold className="mb-1 block">Usage</Text>
          <code className="text-[12px] font-mono text-black/60 block">
            {'<Icon name="arrow-right" size={24} />'}
          </code>
          <Text variant="caption-sm" className="text-black/40 mt-1.5 block">
            Click any icon to copy its name to clipboard.
          </Text>
        </div>
      </div>
    </Section>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

const TYPE_SCALE: { variant: TextVariant; spec: string; sample: string }[] = [
  { variant: "hero-xl",        spec: "80 Desktop / 60 Mobile · ExtraBold 800", sample: "Hero Extralarge"                                  },
  { variant: "hero-lg",        spec: "60 Desktop / 45 Mobile · Bold 700",      sample: "Hero Large"                                       },
  { variant: "hero-md",        spec: "48 Desktop / 36 Mobile · Bold 700",      sample: "Hero Medium"                                      },
  { variant: "hero-sm",        spec: "34 Desktop / 30 Mobile · Bold 700",      sample: "Hero Small"                                       },
  { variant: "h1",             spec: "30 Desktop / 28 Mobile · Bold 700",      sample: "Heading 1"                                        },
  { variant: "h2",             spec: "28 Desktop / 26 Mobile · Bold 700",      sample: "Heading 2"                                        },
  { variant: "h3",             spec: "24 · Bold 700",                          sample: "Heading 3"                                        },
  { variant: "h4",             spec: "22 · Bold 700",                          sample: "Heading 4"                                        },
  { variant: "subhead",        spec: "20 · Regular 400",                       sample: "Subheading"                                       },
  { variant: "body-editorial", spec: "18 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog"      },
  { variant: "body-lg",        spec: "16 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog"      },
  { variant: "body-sm",        spec: "14 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog"      },
  { variant: "caption-lg",     spec: "12 · Regular 400",                       sample: "Caption large"                                    },
  { variant: "caption-sm",     spec: "11 · Regular 400",                       sample: "Caption small"                                    },
  { variant: "overline",       spec: "12 · Bold 700 · Uppercase · ls 2px",     sample: "Overline"                                         },
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-text focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex bg-beige-25">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main
          id="main-content"
          tabIndex={-1}
          className="w-full md:ml-60 flex-1 focus-visible:outline-none"
        >
          {/* Mobile header */}
          <div className="md:hidden sticky top-0 z-10 bg-primary flex items-center gap-3 px-4 py-4 border-b border-white/10">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-center w-8 h-8 text-primary-text rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open navigation"
              aria-expanded={isMobileMenuOpen}
              aria-controls="sidebar-nav"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <Text variant="h4" as="span" className="text-primary-text">Plinng</Text>
            <Text variant="caption-lg" as="span" className="text-white/40">Design System v0.1</Text>
          </div>

          <div className="max-w-3xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col gap-12 md:gap-16">

            {/* Hero */}
            <header>
              <Text variant="hero-sm">Plinng Design System</Text>
              <Text variant="body-editorial" as="p" className="text-disabled mt-3">
                Component library built with React, Tailwind CSS, and Inter.
              </Text>
            </header>

            {/* ── Colors ── */}
            <Section
              id="colors"
              title="Colors"
              description="22 tokens across 5 groups: Accent, Basics, Beige, Grey, and Status."
            >
              {COLOR_PALETTE.map(({ group, colors }) => (
                <div key={group} className="flex flex-col gap-3">
                  <Text variant="overline" as="p" className="text-disabled/50">{group}</Text>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {colors.map((color) => (
                      <ColorSwatch key={color.hex} {...color} />
                    ))}
                  </div>
                </div>
              ))}
            </Section>

            {/* ── Typography ── */}
            <Section
              id="typography"
              title="Typography"
              description="Inter across 15 variants (Hero, Header, Body, Caption, Overline). Responsive desktop/mobile. Pass as to override the semantic element."
            >
              <div
                role="table"
                aria-label="Type scale"
                className="rounded-xl overflow-hidden bg-white shadow-sm"
              >
                {TYPE_SCALE.map(({ variant, spec, sample }, i) => (
                  <div
                    key={variant}
                    role="row"
                    className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 px-4 sm:px-6 py-4 ${i < TYPE_SCALE.length - 1 ? "border-b border-grey-soft" : ""}`}
                  >
                    <Text role="cell" variant={variant}>{sample}</Text>
                    <Text role="cell" variant="caption-lg" as="span" className="text-disabled sm:shrink-0 tabular-nums">
                      {spec}
                    </Text>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Spacing ── */}
            <Section
              id="spacing"
              title="Spacing"
              description="Escala de 12 pasos sobre una base de 4px. Úsala para margin, padding y gap."
            >
              <div className="rounded-xl overflow-hidden bg-white shadow-sm">
                {SPACING_SCALE.map(({ token, tw, px }, i) => (
                  <div
                    key={token}
                    role="row"
                    className={`flex items-center gap-4 px-4 sm:px-6 py-3 ${i < SPACING_SCALE.length - 1 ? "border-b border-grey-soft" : ""}`}
                  >
                    <div
                      className="shrink-0 bg-secondary rounded-sm"
                      style={{ width: px, height: 16, minWidth: 2 }}
                      aria-hidden="true"
                    />
                    <div className="flex items-baseline gap-3 min-w-0">
                      <Text variant="body-sm" bold className="shrink-0 tabular-nums">{px}px</Text>
                      <Text variant="caption-lg" className="text-disabled/50 font-mono shrink-0">{token}</Text>
                      <Text variant="caption-lg" className="text-disabled/40 font-mono shrink-0">{tw}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Border ── */}
            <Section
              id="border"
              title="Border"
              description="Radios de esquina y anchos de borde del sistema."
            >
              <SubSection label="Border Radius">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                  {RADIUS_SCALE.map(({ name, token, px }) => (
                    <div key={token} className="flex flex-col items-start gap-2">
                      <div
                        className="w-full h-14 border-2 border-grey-soft bg-white shadow-sm"
                        style={{ borderRadius: px }}
                        aria-label={`${name} — ${px === 9999 ? "full" : px + "px"}`}
                      />
                      <div>
                        <Text variant="body-sm" bold className="leading-tight">{name}</Text>
                        <Text variant="caption-lg" className="text-disabled/50 font-mono">{px === 9999 ? "full" : `${px}px`}</Text>
                        <Text variant="caption-sm" className="text-disabled/40 font-mono block">{token}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection label="Border Width">
                <div className="flex flex-wrap gap-8 w-full">
                  {BORDER_WIDTH_SCALE.map(({ name, token, px }) => (
                    <div key={name} className="flex flex-col items-start gap-2">
                      <div
                        className="w-20 h-14 border-grey-soft bg-white shadow-sm rounded-md"
                        style={{ borderWidth: px, borderStyle: "solid" }}
                        aria-label={`Border ${name} — ${px}px`}
                      />
                      <div>
                        <Text variant="body-sm" bold className="leading-tight">{px}px</Text>
                        <Text variant="caption-lg" className="text-disabled/50 font-mono">{token}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </SubSection>
            </Section>

            {/* ── Shadows ── */}
            <Section
              id="shadows"
              title="Shadows"
              description="5 niveles de elevación. Cada nivel comunica jerarquía visual y profundidad."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SHADOW_SCALE.map(({ name, token, label, value }) => (
                  <div key={name} className="flex flex-col gap-3">
                    <div
                      className="bg-white rounded-xl p-5 h-24 flex items-end shadow-sm"
                      style={{ boxShadow: value === "none" ? undefined : value }}
                      aria-label={`Shadow ${name}`}
                    />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <Text variant="body-sm" bold className="leading-tight">Shadow {name}</Text>
                        <Text variant="caption-lg" className="text-disabled/50">{label}</Text>
                      </div>
                      <Text variant="caption-sm" className="text-disabled/40 font-mono block mt-0.5">{token}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Sizing & Layout ── */}
            <Section
              id="sizing-layout"
              title="Sizing & Layout"
              description="Breakpoints responsivos y grid de columnas del sistema."
            >
              <SubSection label="Breakpoints">
                <div className="w-full flex flex-col gap-2">
                  {BREAKPOINTS.map(({ name, token, px, note }) => (
                    <div key={name} className="flex items-center gap-3">
                      <Text variant="caption-lg" bold className="w-8 shrink-0">{name}</Text>
                      <div className="flex-1 relative h-6 bg-white rounded overflow-hidden shadow-sm">
                        <div
                          className="h-full bg-secondary/60 rounded"
                          style={{ width: `${Math.min((px / 1536) * 100, 100)}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <Text variant="caption-lg" bold className="w-12 text-right shrink-0 tabular-nums font-mono">{px}px</Text>
                      <Text variant="caption-lg" className="text-disabled/50 w-28 shrink-0 hidden sm:block">{note}</Text>
                      <Text variant="caption-sm" className="text-disabled/40 font-mono hidden md:block">{token}</Text>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection label="Grid columns">
                <div className="w-full flex flex-col gap-4">
                  {GRID_COLUMNS.map(({ cols, note }) => (
                    <div key={cols} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Text variant="caption-lg" bold>{cols} cols</Text>
                        <Text variant="caption-lg" className="text-disabled/50">{note}</Text>
                      </div>
                      <div
                        className="grid gap-1"
                        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                        aria-hidden="true"
                      >
                        {Array.from({ length: cols }).map((_, i) => (
                          <div key={i} className="h-6 bg-secondary/40 rounded-sm" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SubSection>
            </Section>

            {/* ── Button ── */}
            <Section
              id="button"
              title="Button"
              description="Trigger actions. Three variants, three sizes, icon support, loading state, and block layout."
            >
              <SubSection label="Variants">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
              </SubSection>

              <SubSection label="Sizes">
                <Button size="lg">Large</Button>
                <Button size="md">Medium</Button>
                <Button size="sm">Small</Button>
              </SubSection>

              <SubSection label="With icon left">
                <Button variant="primary"   iconLeft={<IconSearch />}>Search</Button>
                <Button variant="secondary" iconLeft={<IconSearch />}>Search</Button>
                <Button variant="tertiary"  iconLeft={<IconSearch />}>Search</Button>
              </SubSection>

              <SubSection label="With icon right">
                <Button variant="primary"   iconRight={<IconArrowRight />}>Continue</Button>
                <Button variant="secondary" iconRight={<IconArrowRight />}>Continue</Button>
                <Button variant="tertiary"  iconRight={<IconArrowRight />}>Continue</Button>
              </SubSection>

              <SubSection label="Block">
                <div className="w-full flex flex-col gap-3">
                  <Button variant="primary"   block>Primary block</Button>
                  <Button variant="secondary" block>Secondary block</Button>
                  <Button variant="tertiary"  block>Tertiary block</Button>
                </div>
              </SubSection>

              <SubSection label="States">
                <Button variant="primary"   disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="tertiary"  disabled>Disabled</Button>
                <Button variant="primary"   loading>Loading</Button>
                <Button variant="secondary" loading>Loading</Button>
              </SubSection>
            </Section>

            {/* ── Badge ── */}
            <Section
              id="badge"
              title="Badge"
              description="Compact labels for status, categories, or metadata."
            >
              <SubSection label="Variants">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </SubSection>

              <SubSection label="With dot">
                <Badge variant="default" dot>Default</Badge>
                <Badge variant="success" dot>Active</Badge>
                <Badge variant="warning" dot>Warning</Badge>
                <Badge variant="error"   dot>Critical</Badge>
                <Badge variant="info"    dot>Info</Badge>
              </SubSection>

              <SubSection label="Sizes">
                <Badge variant="default" size="md">Medium</Badge>
                <Badge variant="success" size="md">Medium</Badge>
                <Badge variant="warning" size="md">Medium</Badge>
                <Badge variant="error"   size="md">Medium</Badge>
                <Badge variant="info"    size="md">Medium</Badge>
              </SubSection>

              <SubSection label="Sizes · Small">
                <Badge variant="default" size="sm">Small</Badge>
                <Badge variant="success" size="sm">Small</Badge>
                <Badge variant="warning" size="sm">Small</Badge>
                <Badge variant="error"   size="sm">Small</Badge>
                <Badge variant="info"    size="sm">Small</Badge>
              </SubSection>
            </Section>

            {/* ── Input ── */}
            <Section
              id="input"
              title="Input"
              description="Text fields for forms. Supports labels, hints, error states, icons, and sizes."
            >
              <SubSection label="States">
                <Input label="Default"   placeholder="Placeholder..." />
                <Input label="With hint" hint="Helper text goes here." placeholder="Placeholder..." />
                <Input label="Error"     error="This field is required." placeholder="Placeholder..." />
                <Input label="Disabled"  disabled placeholder="Placeholder..." />
              </SubSection>

              <SubSection label="Sizes">
                <Input size="lg" label="Large"  placeholder="Large..."  />
                <Input size="md" label="Medium" placeholder="Medium..." />
                <Input size="sm" label="Small"  placeholder="Small..."  />
              </SubSection>

              <SubSection label="With icon left">
                <Input size="lg" label="Large"  iconLeft={<IconSearch />} placeholder="Search..." />
                <Input size="md" label="Medium" iconLeft={<IconSearch />} placeholder="Search..." />
                <Input size="sm" label="Small"  iconLeft={<IconSearch />} placeholder="Search..." />
              </SubSection>

              <SubSection label="With icon right">
                <Input size="lg" label="Large"  iconRight={<IconArrowRight />} placeholder="Placeholder..." />
                <Input size="md" label="Medium" iconRight={<IconArrowRight />} placeholder="Placeholder..." />
                <Input size="sm" label="Small"  iconRight={<IconArrowRight />} placeholder="Placeholder..." />
              </SubSection>
            </Section>

            {/* ── Iconography ── */}
            <IconographySection />

            {/* ── LinkWeb ── */}
            <Section
              id="linkweb"
              title="LinkWeb"
              description="Anchor links with semantic variants, sizes, alternative option, disabled state, and icon support."
            >
              <SubSection label="Variants">
                <LinkWeb href="#">Primary</LinkWeb>
                <LinkWeb href="#" variant="secondary">Secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary">Tertiary</LinkWeb>
              </SubSection>

              <SubSection label="Alternative">
                <div className="flex flex-wrap gap-4 bg-primary rounded-xl p-4">
                  <LinkWeb href="#" option="alternative">Primary alt</LinkWeb>
                </div>
              </SubSection>

              <SubSection label="Sizes">
                <LinkWeb href="#" size="lg">Large</LinkWeb>
                <LinkWeb href="#" size="md">Medium</LinkWeb>
              </SubSection>

              <SubSection label="With icon left">
                <LinkWeb href="#"                    iconLeft={<IconSearch />}>Primary</LinkWeb>
                <LinkWeb href="#" variant="secondary" iconLeft={<IconSearch />}>Secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary"  iconLeft={<IconSearch />}>Tertiary</LinkWeb>
              </SubSection>

              <SubSection label="With icon right">
                <LinkWeb href="#"                    iconRight={<IconArrowRight />}>Primary</LinkWeb>
                <LinkWeb href="#" variant="secondary" iconRight={<IconArrowRight />}>Secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary"  iconRight={<IconArrowRight />}>Tertiary</LinkWeb>
              </SubSection>

              <SubSection label="States">
                <LinkWeb href="#" aria-disabled="true" tabIndex={-1}>Disabled primary</LinkWeb>
                <LinkWeb href="#" variant="secondary" aria-disabled="true" tabIndex={-1}>Disabled secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary"  aria-disabled="true" tabIndex={-1}>Disabled tertiary</LinkWeb>
              </SubSection>
            </Section>

          </div>
        </main>
      </div>
    </>
  );
}

export default App;
