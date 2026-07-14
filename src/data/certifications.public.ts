export type PublicCertification = {
  name: string;
  org: string;
  status: string;
  statusType: "earned" | "planned";
};

export const publicCertifications: PublicCertification[] = [
  {
    name: "GATE 2025 — Computer Science",
    org: "IIT Roorkee · Score: 678",
    status: "Earned · Feb 2025",
    statusType: "earned",
  },
  {
    name: "M.Tech — Computer Science & Engineering",
    org: "IIT Dharwad · Aug 2025 – Jun 2027",
    status: "In progress",
    statusType: "earned",
  },
  {
    name: "eWPTXv2 / OSCP",
    org: "eLearnSecurity / OffSec",
    status: "Planned · 2026",
    statusType: "planned",
  },
  {
    name: "CompTIA Security+ / CEH",
    org: "CompTIA / EC-Council",
    status: "Planned · 2026–27",
    statusType: "planned",
  },
  {
    name: "ISO 27001 Lead Implementer",
    org: "PECB / BSI",
    status: "Planned · 2027",
    statusType: "planned",
  },
  {
    name: "CISM / CISA",
    org: "ISACA",
    status: "Planned · 2027–28",
    statusType: "planned",
  },
];
