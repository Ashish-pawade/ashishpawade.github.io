export type Project = {
  badge: string;
  title: string;
  description: string;
  results: { value: string; label: string }[];
  link: { label: string; href: string };
};

export const projects: Project[] = [
  {
    badge: "M.Tech Thesis · IIT Dharwad · Jan 2026 – Present",
    title:
      "MambaVision + PoM: Polynomial Mixing as a drop-in attention replacement in a hybrid Mamba-Transformer vision backbone",
    description:
      "Investigating whether the Polynomial Mixer (PoM), a linear-time token-mixing operator from CVPR 2026, can replace self-attention in MambaVision (CVPR 2025, NVIDIA) while preserving accuracy and improving efficiency at high resolution. The core finding: PoM delivers a theory-consistent throughput advantage in the long-sequence regime, while memory remains identical due to PyTorch's Flash-Attention-compatible SDPA kernel.",
    results: [
      { value: "3.87×", label: "Throughput gain at N=4096 tokens" },
      { value: "<0.1%", label: "Parameter difference vs. attention" },
      { value: "O(N)", label: "PoM complexity vs. O(N²) attention" },
    ],
    link: { label: "View on GitHub", href: "https://github.com/Ashish-Pawade" },
  },
];
