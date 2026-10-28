
---

## Section feature-card photos (2 still needed)

Each platform and use-case page has a "cards" section whose first card is a
tall photo card under a navy overlay. Nine pages have their photo. Two still
use the plain navy card because no unused image fitted them. Use the Global
style contract above, but output **16:9, at least 1672 × 941**. The bottom
half sits under a dark overlay with white text, so keep the subject in the
**upper half** of the frame.

### `/use-cases/recruitment-agencies` → `section-recruitment-agencies.webp`

*Card: "Too many applications". Must differ from this page's hero (agency
recruiter on a headset beside client folders).*

> Wide shot of an agency's shared desk area in late afternoon light. Two
> recruiters stand at a long table dividing tall stacks of printed
> applications into several separate piles, one per client, the piles
> unlabelled. Busy but orderly. Shot from slightly above, people in the
> upper half of the frame.

### `/about` → `section-about.webp`

*Card: "SuperMIA". Must differ from this page's hero (team sketching around a
studio table).*

> Two product engineers pairing at a desk by a large window, one pointing at a
> laptop screen angled away from the camera, the other leaning in to look.
> Warm studio light, plants, a calm and focused working moment. Subjects in
> the upper half of the frame.

### Wiring them in

1. Drop the files in `public/images/sections/` with the names above.
2. Run `node scripts/optimize-images.mjs public/images/sections 78`.
3. In `src/content/use-cases.ts` or `src/content/about.ts`, add to the
   section with `layout: "cards"`:

```ts
image: {
  src: "/images/sections/section-recruitment-agencies.webp",
  width: 1672,
  height: 941,
  alt: "Describe what is in the frame, 8-16 words",
},
```

---

## FAQ panel photos (12 still needed)

The FAQ block on each page has a navy panel beside the questions. It can
show a photo under a navy overlay that is **darkest at the top** (behind the
heading) and lightest at the bottom. Human Oversight already has one (a hand
drawing a book from a reference shelf).

Use the Global style contract above, with these changes:

| Property | Value |
|---|---|
| Aspect ratio | **4:5 portrait** (the panel is a tall column on desktop) |
| Minimum size | 1200 × 1500 |
| Composition | Subject in the **lower half**; top third calm and dark-friendly |
| Theme | A person finding an answer: reading, checking, asking, explaining |

Each must differ from that page's hero and section photo.

| File | Page | Prompt |
|---|---|---|
| `faq-ai-resume-screening.webp` | `/platform/ai-resume-screening` | Close-up of a hand turning over a printed page on a wooden desk to read the other side, soft morning light |
| `faq-candidate-matching.webp` | `/platform/candidate-matching` | A person at a desk comparing two printed sheets held side by side, eyebrows slightly raised, window light |
| `faq-ai-interviews.webp` | `/platform/ai-interviews` | Over-ear headphones resting on a closed laptop beside a notepad and pen, warm evening desk lamp |
| `faq-interview-proctoring.webp` | `/platform/interview-proctoring` | A reviewer leaning back in a chair, reading a tablet with a calm, considered expression, daylight office |
| `faq-interview-scorecards.webp` | `/platform/interview-scorecards` | A hand underlining a line on a printed document with a pen, tight crop, sunlit desk |
| `faq-recruitment-analytics.webp` | `/platform/recruitment-analytics` | Two colleagues talking across a small round table, one gesturing with an open hand, coffee cups, blank notebook |
| `faq-high-volume-hiring.webp` | `/use-cases/high-volume-hiring` | A tall neat stack of folders on the corner of a desk, one hand lifting the top folder, bright office |
| `faq-recruitment-agencies.webp` | `/use-cases/recruitment-agencies` | A recruiter on a phone call by a window, notebook in the other hand, city softly blurred behind |
| `faq-hr-teams.webp` | `/use-cases/hr-teams` | An HR lead answering a colleague's question at a desk, both looking at the same printed sheet, warm light |
| `faq-startups.webp` | `/use-cases/startups` | A founder writing in a notebook at a café-style table, laptop closed, relaxed morning light |
| `faq-about.webp` | `/about` | A team member at a whiteboard that is completely blank, marker in hand, mid-explanation to a colleague |
| `faq-pricing.webp` | `/pricing` | Two people at a table looking at a single printed page together, one pointing to a section, neutral daylight |

### Wiring them in

1. Drop the files in `public/images/sections/` with the names above.
2. Run `node scripts/optimize-images.mjs public/images/sections 78`; it prints
   each file's real size.
3. Platform, use-case and about pages: in the page's entry in
   `src/content/platform.ts`, `use-cases.ts` or `about.ts`, add after
   `faqHeading`:

```ts
faqImage: {
  src: "/images/sections/faq-ai-interviews.webp",
  width: 1200,
  height: 1500,
  alt: "Describe what is in the frame, 8-16 words",
},
```

4. Pricing: in `src/app/pricing/page.tsx`, pass the same object as
   `image={...}` on `<FaqSection>`.
