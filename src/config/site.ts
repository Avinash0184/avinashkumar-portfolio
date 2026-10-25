// ─────────────────────────────────────────────────────────────
// CENTRAL SITE CONFIG — edit values here only.
// Any empty string ("") hides the related button/link entirely,
// so nothing broken or fake is ever displayed.
//   instagram → used in nav, creative section and contact
//   email     → used for mailto: links (plain address, no "mailto:")
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "Avinash Kumar",
  descriptor: "Developer / Creator",
  portrait: "/images/avinash.jpg", // e.g. "/images/avinash.jpg"
  aboutImage: "",
  socials: {
    instagram: "https://www.instagram.com/avinash.visuals.x/", // e.g. "https://instagram.com/yourhandle"
    email: "avinashkumar620165@gmail.com", // e.g. "you@example.com"
    github: "https://github.com/Avinash0184",
    linkedin: "",
  },
  cashtrail: {
    apkUrl: "https://github.com/tech11world/CashTrail/releases/latest/download/CashTrail.apk",
    repoUrl: "",
    platformConfirmed: false, // set true to show the ANDROID APP label
    screenshots: [
      "/images/cashtrail/screen-1.png",
      "/images/cashtrail/screen-2.png",
      "/images/cashtrail/screen-3.png",
    ] as string[],
  },
  video: {
    src: "/images/Video-10116.mp4",
    embedUrl: "", // e.g. YouTube embed URL
    poster: "/images/showreel-poster.jpg",
  },
};

export const isValidApk = (u: string) => /^https:\/\/.+\.apk(\?.*)?$/i.test(u);
