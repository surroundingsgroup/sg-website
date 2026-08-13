/**
 * Surroundings Group team data.
 *
 * Roster + headshots pulled from the Nautical Network team page
 * (transparent-background PNGs in /public/images/team/). Bios are
 * optional — add per person as they're written; the team grid
 * renders fine without them.
 */

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Optional short bio for the team grid card */
  bio?: string;
  /** Department / function — display chip above the name */
  department: string;
  /** Headshot, /public path. Transparent PNG renders on ink card. */
  photo?: string;
}

export const team: TeamMember[] = [
  {
    slug: "billy-pavlock",
    name: "Billy Pavlock",
    role: "Chief Executive Officer",
    bio: "Founded Surroundings Group to bring tech-company leverage to premium brand marketing. Built Nautical Network from a single Instagram into the largest multi-platform boating outlet.",
    department: "Leadership",
    photo: "/images/team/billy-pavlock.png",
  },
  {
    slug: "justin-tarr",
    name: "Justin Tarr",
    role: "Chief Financial Officer",
    department: "Leadership",
    photo: "/images/team/justin-tarr.png",
  },
  {
    slug: "austin-tompkins",
    name: "Austin Tompkins",
    role: "Head of Creative",
    department: "Creative",
    photo: "/images/team/austin-tompkins.png",
  },
  {
    slug: "stephen-massaro",
    name: "Stephen Massaro",
    role: "Director of Web Services + Account Manager",
    department: "Digital",
    photo: "/images/team/stephen-massaro.png",
  },
  {
    slug: "phallon-ray",
    name: "Phallon Ray",
    role: "Business Development Manager",
    department: "Partnerships",
    photo: "/images/team/phallon-ray.png",
  },
  {
    slug: "morgan-finger",
    name: "Morgan Finger",
    role: "Account Manager",
    department: "Client Services",
    photo: "/images/team/morgan-finger.png",
  },
  {
    slug: "arial-pavlock",
    name: "Arial Pavlock",
    role: "Team Support Manager + Events Coordinator",
    department: "Operations",
    photo: "/images/team/arial-pavlock.png",
  },
  {
    slug: "sean-odonnell",
    name: "Sean O'Donnell",
    role: "Head of Digital Media",
    department: "Social",
    photo: "/images/team/sean-odonnell.png",
  },
  {
    slug: "kamila-bacha",
    name: "Kamila Bacha",
    role: "Account Manager",
    department: "Client Services",
    // photo: add headshot at /images/team/kamila-bacha.png when ready
  },
  {
    slug: "tiffany-lewis",
    name: "Tiffany Lewis",
    role: "Social Media Manager",
    department: "Social",
    // photo: add headshot at /images/team/tiffany-lewis.png when ready
  },
  {
    slug: "joaley-da-silva",
    name: "Joaley Da Silva",
    role: "Social Media + Events Manager",
    department: "Social",
    // photo: add headshot at /images/team/joaley-da-silva.png when ready
  },
  {
    slug: "andre-gonzalez",
    name: "Andre Gonzalez",
    role: "Creator",
    department: "Production",
    photo: "/images/team/andre-gonzalez.png",
  },
  {
    slug: "brandon-ricketts",
    name: "Brandon Ricketts",
    role: "Creator",
    department: "Production",
    photo: "/images/team/brandon-ricketts.png",
  },
  {
    slug: "granger-smith",
    name: "Granger Smith",
    role: "Creator",
    department: "Production",
    photo: "/images/team/granger-smith.png",
  },
  {
    slug: "kyle-daniels",
    name: "Kyle Daniels",
    role: "Creator",
    department: "Production",
    // photo: add headshot at /images/team/kyle-daniels.png when ready
  },
  {
    slug: "loic-gergaud",
    name: "Loic Gergaud",
    role: "Creator",
    department: "Production",
    // photo: add headshot at /images/team/loic-gergaud.png when ready
  },
  {
    slug: "nicholas-nunez",
    name: "Nick Nunez",
    role: "Creator",
    department: "Production",
    // photo: add headshot at /images/team/nicholas-nunez.png when ready
  },
  {
    slug: "justin-roseman",
    name: "Justin Roseman",
    role: "Creator",
    department: "Production",
    // photo: add headshot at /images/team/justin-roseman.png when ready
  },
  {
    slug: "rendi-andrianto",
    name: "Rendi Andrianto",
    role: "Creative Content Designer",
    department: "Creative",
    // photo: add headshot at /images/team/rendi-andrianto.png when ready
  },
];
