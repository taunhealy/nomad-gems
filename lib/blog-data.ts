export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "increase-weeknight-bookings-digital-nomads",
    title: "How to Fill Weeknight Gaps by Attracting Digital Nomads",
    excerpt:
      "Most retreats sit empty Monday to Thursday. Here's how to turn quiet weeknights into a steady revenue stream by making your property irresistible to remote workers.",
    category: "Owners",
    readTime: "5 min read",
    date: "2026-02-18",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop",
    sections: [
      {
        heading: "The Weeknight Problem",
        body: "If you run a boutique stay, you already know the pattern: weekends sell themselves, but Monday through Thursday your rooms gather dust. That's up to 60% of your capacity going unused. Digital nomads — remote workers who travel while they work — are the ideal guests to fill that gap. They book longer, spend less on activities (they're working), and prefer the quiet midweek window that families and weekend tourists avoid.",
      },
      {
        heading: "What Remote Workers Actually Need",
        body: "Forget the ping-pong table. Remote workers need three things: reliable high-speed internet (10 Mbps minimum, 25+ Mbps ideal, hardwired if possible), a quiet dedicated workspace with good lighting, and strong coffee. That's it. Secondary perks like a garden view, standing desk, or a second monitor are differentiators — but the fundamentals come first. If your Wi-Fi drops during a Zoom call, they won't come back.",
      },
      {
        heading: "Price It Right: The Midweek Rate",
        body: "Create a dedicated 'Workcation' rate for stays of 3+ weeknights. Price it 20–35% below your weekend rate — you're filling dead inventory, so any revenue is incremental. Offer weekly rates (5 nights for the price of 4) to encourage longer stays. The goal is recurring, predictable occupancy, not maximum per-night revenue.",
      },
      {
        heading: "Market Where Nomads Actually Look",
        body: "Digital nomads don't browse traditional booking platforms the way tourists do. They search Reddit (r/digitalnomad), Nomad List, Remote Year communities, and curated platforms like Nomad Gems. Invest in short-form video content showing your workspace setup and surroundings — a 30-second walkthrough of your desk-with-a-view will outperform any listing description.",
      },
      {
        heading: "The Compounding Effect",
        body: "A single nomad who loves your space will tell five others. They'll leave reviews on niche platforms, post Instagram stories of your sunrise view from their desk, and return seasonally. This organic loop is far more valuable than paid ads. Your job is to make the first stay exceptional — the marketing takes care of itself.",
      },
    ],
  },
  {
    id: "b2",
    slug: "cinematic-video-content-boutique-stays",
    title: "Why Cinematic Video Is the Best Investment for Your Boutique Stay",
    excerpt:
      "Listings with professional video content see up to 40% more engagement. Here's why a single cinematic walkthrough can outperform months of traditional marketing.",
    category: "Owners",
    readTime: "4 min read",
    date: "2026-02-10",
    image:
      "https://images.unsplash.com/photo-1721249710785-3a0cb565707b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZwdiUyMGRyb25lfGVufDB8fDB8fHww",
    sections: [
      {
        heading: "The Scroll-Stopping Power of Video",
        body: "In a sea of static listing photos, video stops the scroll. A 60-second cinematic walkthrough of your property gives potential guests something no photo gallery can: a feeling. They can hear the birdsong, see the light moving through the space, and imagine themselves sitting at that desk with a mountain view. Platforms like Airbnb and Booking.com increasingly prioritize video-enabled listings in search results.",
      },
      {
        heading: "What Makes 'Cinematic' Different",
        body: "A shaky phone tour won't cut it. Cinematic content means intentional camera movement, natural lighting at golden hour, a considered soundtrack, and professional colour grading. Think less 'real estate walkthrough' and more 'short film about a place.' The difference in perceived value is enormous — guests associate high-quality video with a high-quality stay.",
      },
      {
        heading: "FPV Drone: The Secret Weapon",
        body: "FPV (first-person-view) drone footage has transformed property content. Instead of static wide shots, FPV creates a seamless, immersive journey through your space — swooping through the entrance, gliding past the pool, and climbing to reveal the surrounding landscape in one continuous take. It's the closest thing to teleporting a guest into your property before they book.",
      },
      {
        heading: "ROI That Compounds",
        body: "A single professional video shoot produces content for your listing, social media, website hero, email campaigns, and paid ads. That one morning of filming generates 6–12 months of marketing material. Compare that to the cost of ongoing paid advertising with diminishing returns. The upfront investment pays for itself within the first few bookings it helps convert.",
      },
      {
        heading: "Getting Started",
        body: "You don't need a Hollywood budget. A skilled creator with a drone and a mirrorless camera can capture everything in a single golden-hour session. Focus on showcasing the workspace, the views, and the 'feeling' of being there. Share the raw footage on social, the polished edit on your listing, and watch your enquiry rate climb.",
      },
    ],
  },
  {
    id: "b3",
    slug: "designing-outdoor-workspace-retreat",
    title: "How to Design an Outdoor Workspace That Remote Workers Love",
    excerpt:
      "The best retreats blur the line between work and nature. Here's how to create an outdoor workspace that's both beautiful and genuinely productive.",
    category: "Owners",
    readTime: "6 min read",
    date: "2026-02-04",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1740&auto=format&fit=crop",
    sections: [
      {
        heading: "Why Outdoors Matters",
        body: "Research from the University of Michigan shows that even 20 minutes in a natural setting significantly lowers cortisol levels and boosts creative problem-solving. For remote workers doing knowledge work — writing, coding, strategising — access to an outdoor workspace isn't a luxury, it's a performance tool. The retreats that understand this are the ones that earn repeat bookings.",
      },
      {
        heading: "The Non-Negotiables",
        body: "An outdoor workspace needs three things to be functional, not just photogenic: shade (a pergola, mature tree canopy, or retractable awning), power access (weatherproof outlets within arm's reach), and strong Wi-Fi signal (a mesh extender or dedicated outdoor access point). Without all three, your beautiful garden desk becomes an Instagram prop that nobody actually uses.",
      },
      {
        heading: "Furniture That Works",
        body: "Skip the decorative garden furniture. Remote workers sit for 6–8 hours. Invest in weather-resistant chairs with proper lumbar support and tables at the correct height (72–76cm). Teak and powder-coated aluminium are excellent choices — they withstand the elements while maintaining a premium aesthetic. A laptop riser and external keyboard setup is the cherry on top.",
      },
      {
        heading: "Micro-Zoning: Work, Break, Reset",
        body: "The best outdoor workspaces aren't one spot — they're a circuit. Create three micro-zones: a primary desk area for focused work, a lounge corner for reading and calls, and a 'reset' area (hammock, daybed, or fire pit) for breaks. This gives nomads the freedom to move through their day without going back inside, which is exactly what they're paying for.",
      },
      {
        heading: "Photograph It Right",
        body: "Once you've built it, capture it during golden hour with a laptop open, a coffee placed naturally, and the surrounding landscape visible. Show the Wi-Fi speed test result on the screen. This single image — proof of a beautiful, functional outdoor workspace — will become the most-clicked photo in your entire listing gallery.",
      },
    ],
  },
  {
    id: "b4",
    slug: "choosing-your-first-workcation-stay",
    title: "How to Choose Your First Workcation Stay (Without Killing Your Productivity)",
    excerpt:
      "Not every beautiful Airbnb is work-ready. Here's the checklist every digital nomad should use before booking a remote work retreat.",
    category: "Nomads",
    readTime: "5 min read",
    date: "2026-01-28",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop",
    sections: [
      {
        heading: "The Beautiful Trap",
        body: "You've seen the Instagram posts — laptop by the infinity pool, golden light, zero stress. What they don't show is the 8 Mbps Wi-Fi that drops every 20 minutes, the wobbly dining table doubling as a desk, and the construction noise next door. Choosing a workcation stay requires a fundamentally different mindset than choosing a holiday rental. Beauty is a bonus; reliability is non-negotiable.",
      },
      {
        heading: "The Wi-Fi Test (Before You Book)",
        body: "Ask the host for a speed test screenshot — not from their phone on 5G, but from a laptop connected to the property's Wi-Fi. You need at least 10 Mbps download for video calls — 25+ Mbps is ideal for comfortable cloud work alongside. Ask about the router location, whether there's ethernet available, and what happens when the connection drops. If the host can't answer these questions confidently, move on.",
      },
      {
        heading: "Workspace: Desk, Chair, Light",
        body: "You'll spend 6–8 hours a day working. A kitchen counter and a bar stool won't cut it for a week, let alone a month. Look for listings that specifically mention a dedicated workspace. Check photos for a proper desk and chair. Natural light matters more than you think — it affects your energy, mood, and sleep cycle. A dark corner with a lamp is not a workspace.",
      },
      {
        heading: "Location: Quiet Over Central",
        body: "As a nomad, you don't need to be in the city centre. You need quiet mornings for deep work, nature for afternoon resets, and a reliable grocery run within 15 minutes. The best workcation spots are slightly outside the tourist zone — close enough for a weekend dinner out, far enough that your Monday morning focus isn't interrupted by bar noise from the night before.",
      },
      {
        heading: "The Nomad Gems Advantage",
        body: "This is exactly why Nomad Gems exists. Every property on our platform has been verified for work-readiness: internet speeds tested, workspace quality confirmed, and environment assessed. We do the due diligence so you can book with confidence and focus on what matters — doing your best work from the most inspiring places on earth.",
      },
    ],
  },
  {
    id: "b5",
    slug: "pricing-workcation-packages-guide",
    title: "The Owner's Guide to Pricing Workcation Packages That Actually Sell",
    excerpt:
      "Weekend rates don't work for remote workers. Here's how to structure weekly and monthly pricing that fills your calendar and maximises revenue.",
    category: "Owners",
    readTime: "5 min read",
    date: "2026-01-20",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1740&auto=format&fit=crop",
    sections: [
      {
        heading: "Why Per-Night Pricing Fails for Nomads",
        body: "Digital nomads don't think in nights — they think in weeks and months. A per-night rate of R1,500 sounds reasonable until they multiply it by 30 and realise they're paying R45,000 when a full apartment rental costs R15,000. If your pricing doesn't include a meaningful long-stay discount, nomads will scroll past your listing without a second thought.",
      },
      {
        heading: "The 3-Tier Model",
        body: "Structure your pricing in three tiers: Nightly (for 1–3 night stays, full rate), Weekly (7 nights, 25–30% discount), and Monthly (28+ nights, 40–50% discount). This isn't discounting — it's smart inventory management. A nomad paying 50% of your nightly rate for 28 consecutive nights generates more total revenue than three separate weekend bookings with gaps between them.",
      },
      {
        heading: "What to Include (and What to Charge Extra For)",
        body: "Your base workcation rate should include Wi-Fi, workspace access, utilities, and weekly cleaning. Extras like airport transfers, laundry service, co-working day passes, and guided local experiences can be offered as paid add-ons. This keeps your base price competitive while creating upsell opportunities that increase per-guest revenue.",
      },
      {
        heading: "Seasonal Pricing Strategy",
        body: "Your peak season for tourists is often your quiet season for nomads — and vice versa. While families book summer holidays, nomads often travel during shoulder seasons when flights are cheaper and destinations are quieter. Consider running your workcation rates specifically during your off-peak months to fill the calendar gap.",
      },
      {
        heading: "Show the Value, Not Just the Price",
        body: "Don't just list a number — frame the value. 'R18,000/month includes high-speed fibre, a dedicated workspace with mountain views, weekly housekeeping, and access to hiking trails from your door.' When nomads can see exactly what they're getting, the price becomes secondary to the experience.",
      },
    ],
  },
  {
    id: "b6",
    slug: "sustainable-remote-work-routine",
    title: "How to Build a Work Routine That Survives Any Time Zone",
    excerpt:
      "The freedom of remote work can destroy your productivity if you're not intentional. Here's how to design a routine that works whether you're in Cape Town or Chiang Mai.",
    category: "Nomads",
    readTime: "6 min read",
    date: "2026-01-14",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1740&auto=format&fit=crop",
    sections: [
      {
        heading: "The Time Zone Trap",
        body: "When your team is in London and you're in Bali, the temptation is to shift your entire schedule to match. Don't. Working 4pm to midnight destroys your sleep, your health, and eventually your output. Instead, identify the 2–3 hours of genuine overlap needed for meetings and collaboration, and protect the rest of your day for deep, asynchronous work.",
      },
      {
        heading: "The Non-Negotiable Block",
        body: "Every productive nomad has one: a 3–4 hour block of uninterrupted deep work, scheduled at the same time every day regardless of location. For most people, this is morning — before Slack notifications, before meetings, before the world demands your attention. Guard this block like your income depends on it, because it does.",
      },
      {
        heading: "Environment as Routine",
        body: "Your brain associates spaces with activities. If you work, eat, and relax in the same room, your focus suffers. This is why choosing work-ready stays matters so much — a dedicated desk in a separate area from your bed creates an automatic mental switch. Walk to your workspace in the morning, leave it in the evening. Physical separation creates psychological boundaries.",
      },
      {
        heading: "The 90-Minute Rule",
        body: "Human focus operates in roughly 90-minute cycles. Work in 90-minute sprints, then take a genuine 15–20 minute break — not scrolling your phone, but stepping outside, stretching, or making coffee. After three cycles (about 5 hours of real work), you've accomplished more than most office workers do in 8 hours.",
      },
      {
        heading: "Weekly Resets, Not Daily Perfectionism",
        body: "Some days will be unproductive. A flight day, a new city adjustment, an unreliable connection — it happens. Instead of stressing over daily consistency, aim for weekly targets. If you hit your weekly output goals, it doesn't matter that Tuesday was a write-off. This flexibility is the entire point of the nomad lifestyle — use it.",
      },
    ],
  },
];
