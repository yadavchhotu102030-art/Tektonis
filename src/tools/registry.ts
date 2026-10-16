import { ToolDefinition, ToolCategory } from '../types/tool';
import { WordCounter } from './implementations/WordCounter';
import { JsonFormatter } from './implementations/JsonFormatter';
import { CaseConverter } from './implementations/CaseConverter';
import { QrCodeGenerator } from './implementations/QrCodeGenerator';
import { PasswordGenerator } from './implementations/PasswordGenerator';
import { Base64Tool } from './implementations/Base64Tool';
import { UtmBuilder } from './implementations/UtmBuilder';
import { ColorConverter } from './implementations/ColorConverter';
import { EpochConverter } from './implementations/EpochConverter';
import { UnitConverter } from './implementations/UnitConverter';
import { DiffChecker } from './implementations/DiffChecker';
import { ImageCompressor } from './implementations/ImageCompressor';
import { LoremIpsumGenerator } from './implementations/LoremIpsumGenerator';
import { MetaTagGenerator } from './implementations/MetaTagGenerator';
import { AgeCalculator } from './implementations/AgeCalculator';
import { PercentageCalculator } from './implementations/PercentageCalculator';
import { LoanCalculator } from './implementations/LoanCalculator';
import { BmiCalculator } from './implementations/BmiCalculator';
import { BoxShadowGenerator } from './implementations/BoxShadowGenerator';
import { MarkdownConverter } from './implementations/MarkdownConverter';

export const CATEGORIES: { id: ToolCategory; label: string; icon: string; count?: number }[] = [
  { id: 'all', label: 'All Utilities', icon: 'Grid' },
  { id: 'utilities', label: 'Math & Life', icon: 'Calculator' },
  { id: 'text', label: 'Text & Writing', icon: 'FileText' },
  { id: 'developer', label: 'Developer Tools', icon: 'Code' },
  { id: 'web-seo', label: 'Web & SEO', icon: 'Search' },
  { id: 'converter', label: 'Converters', icon: 'ArrowRightLeft' },
  { id: 'security', label: 'Security & Privacy', icon: 'Shield' },
  { id: 'image', label: 'Image & Media', icon: 'Image' },
];

export const TOOLS: ToolDefinition[] = [
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    category: 'text',
    badge: 'Popular',
    searchVolumeMonthly: '5.8M / mo',
    targetKeywords: ['word counter', 'character count', 'reading time calculator', 'word frequency counter', 'seo text counter'],
    shortDescription: 'Count words, characters, sentences, paragraphs, reading time, and examine keyword density.',
    longDescription:
      'Analyze your writing in real-time. Calculate exact word count, character count with and without spaces, estimated reading and speaking durations, Flesch reading ease score, and prominent keyword frequencies for SEO ranking.',
    metaTitle: 'Free Online Word Counter & Character Calculator | Tektonis',
    metaDescription:
      'Instant free online word counter, character count tool, speaking time estimator, and SEO keyword density analyzer. 100% private, no signup required.',
    iconName: 'FileText',
    component: WordCounter,
    features: [
      'Real-time count of words, characters, sentences, and paragraphs',
      'Accurate reading time and speech duration estimations',
      'Flesch Reading Ease score to optimize content readability',
      'Keyword density analysis for SEO content optimization',
      '100% Client-side and secure — no text is stored or transmitted',
    ],
    howToUse: [
      { step: '1. Paste or Type Text', description: 'Enter or paste your text into the main editor area.' },
      { step: '2. View Live Metrics', description: 'Watch the word count, reading time, and character counts update in real-time.' },
      { step: '3. Check Keyword Density', description: 'Review your highest repeated words and readability scores below the editor.' },
      { step: '4. Copy or Export', description: 'Use the Copy button to quickly grab your revised text.' },
    ],
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time is calculated based on an average adult silent reading speed of 225 words per minute (WPM). Speaking time is based on 130 words per minute.',
      },
      {
        question: 'Is my text private and safe?',
        answer: 'Yes! All calculations run purely in your web browser using JavaScript. No text is ever uploaded or stored on any server.',
      },
      {
        question: 'What is a good Flesch Reading Ease score?',
        answer: 'A score of 60–70 is considered standard (plain English suitable for 8th–9th grade students). Higher scores (70–100) are recommended for general web visitors and SEO.',
      },
    ],
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'developer',
    badge: 'Hot',
    searchVolumeMonthly: '3.2M / mo',
    targetKeywords: ['json formatter', 'json validator', 'beautify json', 'json minifier', 'online json viewer'],
    shortDescription: 'Format, beautify, validate, minify, and inspect JSON with an interactive tree viewer.',
    longDescription:
      'Clean, beautify, and validate JSON data instantly. Detect syntax errors with line-number precision, compact minified JSON for production payloads, or browse complex hierarchical structures with an interactive tree visualizer.',
    metaTitle: 'JSON Formatter & Validator Online – Beautify, Minify & Fix JSON | Tektonis',
    metaDescription:
      'Free online JSON Formatter, Validator, and Minifier. Format JSON with 2 or 4 spaces, view collapsible trees, and fix syntax errors instantly.',
    iconName: 'Code',
    component: JsonFormatter,
    features: [
      'Customizable indentation (2 spaces, 4 spaces, or compact minification)',
      'Pinpoint syntax errors with actionable error diagnostics',
      'Interactive collapsible visual JSON tree browser',
      'Upload .json files or download formatted files with 1 click',
    ],
    howToUse: [
      { step: '1. Input JSON', description: 'Paste raw JSON or upload a .json file.' },
      { step: '2. Select Format Option', description: 'Click 2 Spaces, 4 Spaces, or Minify.' },
      { step: '3. Inspect Structure', description: 'Switch to the Interactive Tree tab to explore deep nested objects.' },
      { step: '4. Copy or Download', description: 'Click Copy to clipboard or Download the validated file.' },
    ],
    faqs: [
      {
        question: 'What causes JSON validation errors?',
        answer: 'Common errors include trailing commas, unquoted keys, single quotes instead of double quotes, and unescaped special characters.',
      },
      {
        question: 'Can I format large JSON files?',
        answer: 'Yes! Since formatting happens directly in your browser without network roundtrips, it can comfortably handle large JSON payloads.',
      },
    ],
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'web-seo',
    badge: 'High Search',
    searchVolumeMonthly: '12.4M / mo',
    targetKeywords: ['qr code generator free', 'create qr code', 'wifi qr code', 'custom qr code', 'qr code png svg'],
    shortDescription: 'Generate custom QR codes for URLs, Wi-Fi networks, text, emails, and phone contacts.',
    longDescription:
      'Create high-resolution QR codes in seconds. Customize colors, adjust error correction levels, and export crisp PNG or SVG vector files suitable for print marketing, websites, restaurant menus, and Wi-Fi sharing.',
    metaTitle: 'Free QR Code Generator Online – Custom Colors, PNG & SVG | Tektonis',
    metaDescription:
      'Generate free custom QR codes for websites, Wi-Fi networks, plain text, and emails. Download high-resolution PNG or SVG vectors with zero watermark.',
    iconName: 'QrCode',
    component: QrCodeGenerator,
    features: [
      'Supports URLs, Wi-Fi configuration, text messages, phone numbers, and emails',
      'Full color customization for foreground and background',
      'Adjustable error correction level (up to 30% damage tolerance)',
      'High-resolution PNG (1024px) and scalable SVG vector downloads',
    ],
    howToUse: [
      { step: '1. Select Content Type', description: 'Choose URL, Wi-Fi, Text, Email, or Phone.' },
      { step: '2. Enter Details', description: 'Fill in your link, Wi-Fi credentials, or text.' },
      { step: '3. Customize Design', description: 'Pick your preferred brand colors and error correction level.' },
      { step: '4. Download', description: 'Download the generated QR code in PNG or vector SVG format.' },
    ],
    faqs: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No! These are static QR codes that encode your data directly into the pixel pattern. They never expire and require no external redirection server.',
      },
      {
        question: 'What is QR error correction?',
        answer: 'Error correction allows the QR code to be successfully scanned even if up to 30% of it is obscured, scratched, or covered by a logo.',
      },
    ],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter & Slugify',
    category: 'text',
    badge: 'Essential',
    searchVolumeMonthly: '2.4M / mo',
    targetKeywords: ['case converter', 'camelcase converter', 'title case', 'kebab case slugify', 'uppercase lowercase'],
    shortDescription: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case slugs.',
    longDescription:
      'Effortlessly convert text between 12 distinct casing styles. Perfect for software engineers naming variables, writers preparing SEO headlines, and web developers creating URL-friendly kebab-case slugs.',
    metaTitle: 'Case Converter Online – Title Case, camelCase, snake_case & URL Slugs | Tektonis',
    metaDescription:
      'Instantly convert text to Title Case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case, and SEO kebab-case slugs with 1-click copy.',
    iconName: 'ArrowRightLeft',
    component: CaseConverter,
    features: [
      'Supports 12 formatting styles including Title Case, Sentence case, and slugify',
      'Instant live preview of all casing variations simultaneously',
      'One-click copy button next to every converted variation',
      'Safe for code variables and URL path generation',
    ],
    howToUse: [
      { step: '1. Enter Text', description: 'Type or paste your text in the input box.' },
      { step: '2. Choose Format', description: 'Browse the generated variants (Title Case, camelCase, kebab-case, etc.).' },
      { step: '3. One-Click Copy', description: 'Click the Copy button next to your desired casing style.' },
    ],
    faqs: [
      {
        question: 'What is kebab-case and why is it good for SEO?',
        answer: 'Kebab-case uses hyphens to separate lowercase words (e.g., best-seo-tools). Google explicitly recommends hyphens over underscores in website URLs for optimal indexing.',
      },
    ],
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Secure Password Generator',
    category: 'security',
    badge: 'Essential',
    searchVolumeMonthly: '4.6M / mo',
    targetKeywords: ['password generator', 'strong password generator', 'random pin generator', 'memorable passphrase generator'],
    shortDescription: 'Generate strong, cryptographically secure passwords, memorable passphrases, and numeric PINs.',
    longDescription:
      'Generate bulletproof passwords using modern cryptographic randomness (Web Crypto API). Customize character pools, exclude ambiguous characters like 0 and O, evaluate entropy in bits, or generate readable multi-word passphrases.',
    metaTitle: 'Cryptographic Password Generator – Strong, Random & Memorable | Tektonis',
    metaDescription:
      'Create cryptographically secure passwords with custom lengths, symbols, numbers, and NIST compliance. Free, private, and calculated in-browser.',
    iconName: 'Shield',
    component: PasswordGenerator,
    features: [
      'Uses window.crypto.getRandomValues for true cryptographic security',
      'Real-time entropy bit rating and crack time calculation',
      'Avoid ambiguous characters option (excludes 1, l, I, 0, O)',
      'Memorable passphrase and numeric PIN generation modes',
      'Bulk generation to create up to 10 passwords at once',
    ],
    howToUse: [
      { step: '1. Select Mode', description: 'Choose Custom Characters, Memorable Passphrase, or Numeric PIN.' },
      { step: '2. Adjust Length & Rules', description: 'Use the slider to set length and toggle character sets.' },
      { step: '3. Copy Password', description: 'Click Copy Password to copy the secure result to your clipboard.' },
    ],
    faqs: [
      {
        question: 'Are generated passwords saved anywhere?',
        answer: 'Never. Passwords are generated strictly inside your browser memory using the Web Cryptography API and are destroyed as soon as you close or reload the page.',
      },
      {
        question: 'What password length is considered safe today?',
        answer: 'Security experts and NIST recommend a minimum of 16 characters with a combination of uppercase, lowercase, numbers, and symbols to achieve 80+ bits of entropy.',
      },
    ],
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor & Converter',
    category: 'image',
    badge: 'High Search',
    searchVolumeMonthly: '4.1M / mo',
    targetKeywords: ['image compressor', 'compress png', 'compress jpeg', 'convert to webp', 'reduce image file size'],
    shortDescription: 'Compress and resize JPG, PNG, and WebP images directly in your browser with zero quality loss.',
    longDescription:
      'Shrink image file sizes by up to 85% to boost your Core Web Vitals and SEO page speed. Convert images to modern Google WebP format without uploading your photos to third-party servers.',
    metaTitle: 'Free Client-Side Image Compressor & WebP Converter | Tektonis',
    metaDescription:
      'Compress PNG, JPG, and WebP images directly in your browser. Reduce file size up to 80% with zero quality loss and 100% privacy.',
    iconName: 'Image',
    component: ImageCompressor,
    features: [
      '100% client-side compression using HTML5 Canvas — zero file uploads',
      'Convert to high-efficiency next-gen WebP format',
      'Adjustable quality and max resolution sliders',
      'Before/After file size comparison with percentage savings calculator',
    ],
    howToUse: [
      { step: '1. Select Image', description: 'Upload a PNG, JPG, or WebP photo.' },
      { step: '2. Adjust Quality', description: 'Tune the quality slider and select your desired format.' },
      { step: '3. Inspect Savings', description: 'Compare original size against compressed size.' },
      { step: '4. Download', description: 'Download your lightweight, web-optimized image file.' },
    ],
    faqs: [
      {
        question: 'Why does Google recommend WebP?',
        answer: 'WebP provides lossless and lossy compression that makes images 25–35% smaller than comparable JPEGs and PNGs, accelerating page load speeds for better SEO rankings.',
      },
    ],
  },
  {
    id: 'base64-tool',
    slug: 'base64-tool',
    name: 'Base64 Encoder & Image Converter',
    category: 'developer',
    badge: 'Trending',
    searchVolumeMonthly: '2.9M / mo',
    targetKeywords: ['base64 encode', 'base64 decode', 'image to base64', 'base64 data url', 'base64 to image'],
    shortDescription: 'Encode and decode UTF-8 text or convert images into inline Base64 Data URIs.',
    longDescription:
      'Encode plain text into Base64 or decode Base64 strings back to readable UTF-8. Convert image files directly into Data URLs for embedding into HTML, CSS, or API request payloads.',
    metaTitle: 'Base64 Encoder, Decoder & Image to Base64 Tool | Tektonis',
    metaDescription:
      'Fast, free Base64 encoder and decoder. Convert text and images to Base64 data URIs instantly. 100% client-side execution.',
    iconName: 'FileCode',
    component: Base64Tool,
    features: [
      'UTF-8 compliant string encoding and decoding',
      'Convert image files to data:image/... base64 URIs',
      'Live image preview from Base64 string',
      'One-click HTML <img> tag generator',
    ],
    howToUse: [
      { step: '1. Select Mode', description: 'Choose Text Base64 or Image to Base64.' },
      { step: '2. Enter Data', description: 'Type/paste text or upload an image file.' },
      { step: '3. Copy Output', description: 'Copy the encoded string or HTML tag.' },
    ],
    faqs: [
      {
        question: 'When should I use Base64 for images?',
        answer: 'Base64 data URIs are ideal for tiny icons, SVGs, or email newsletters where eliminating extra HTTP roundtrips improves perceived rendering speed.',
      },
    ],
  },
  {
    id: 'color-converter',
    slug: 'color-converter',
    name: 'Color Converter & WCAG Contrast Checker',
    category: 'developer',
    badge: 'Popular',
    searchVolumeMonthly: '2.1M / mo',
    targetKeywords: ['color picker', 'hex to rgb', 'wcag contrast checker', 'accessible colors', 'color palette generator'],
    shortDescription: 'Convert HEX, RGB, HSL, and CMYK colors, evaluate WCAG accessibility contrast, and generate harmonious palettes.',
    longDescription:
      'All-in-one color utility for web designers and front-end developers. Convert across color formats, verify WCAG 2.1 AA and AAA accessibility contrast compliance, and build harmonious color schemes.',
    metaTitle: 'Color Converter, WCAG Contrast Checker & Palette Generator | Tektonis',
    metaDescription:
      'Convert HEX, RGB, HSL, and CMYK color values. Test WCAG 2.1 contrast ratios for accessible web design and generate harmonic palettes.',
    iconName: 'Pipette',
    component: ColorConverter,
    features: [
      'Instant conversion across HEX, RGB, HSL, and CMYK formats',
      'WCAG 2.1 AA/AAA contrast ratio verification with pass/fail badges',
      'Complementary, Analogous, Triadic, and Monochromatic palette generator',
      'Copy ready-to-use CSS variables and Tailwind classes',
    ],
    howToUse: [
      { step: '1. Select Color', description: 'Pick a color with the color picker or enter a HEX code.' },
      { step: '2. Check Formats', description: 'View the synchronized RGB, HSL, and CMYK values.' },
      { step: '3. Verify Accessibility', description: 'Test text and background contrast for WCAG compliance.' },
    ],
    faqs: [
      {
        question: 'What is WCAG AA contrast ratio?',
        answer: 'WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal body text and 3:1 for large text (18pt / 24px or bold 14pt).',
      },
    ],
  },
  {
    id: 'utm-builder',
    slug: 'utm-builder',
    name: 'UTM Campaign URL Builder',
    category: 'web-seo',
    badge: 'Popular',
    searchVolumeMonthly: '1.8M / mo',
    targetKeywords: ['utm builder', 'campaign url builder', 'google analytics utm', 'url encoder decoder', 'track marketing links'],
    shortDescription: 'Build Google Analytics UTM campaign tracking URLs and encode/decode query strings.',
    longDescription:
      'Generate tracking URLs for digital marketing campaigns. Add utm_source, utm_medium, utm_campaign, utm_term, and utm_content parameters effortlessly, or encode/decode complex URL query strings.',
    metaTitle: 'UTM Campaign URL Builder & URL Encoder Online | Tektonis',
    metaDescription:
      'Create Google Analytics UTM tracking URLs with preset mediums, live preview, and URL encoder/decoder. Free marketing tool.',
    iconName: 'Link2',
    component: UtmBuilder,
    features: [
      'Easily attach UTM source, medium, campaign, term, and content',
      'Quick presets for common channels (cpc, email, social, referral)',
      'Live syntax check and one-click URL test in a new tab',
      'Integrated URL Encoder & Decoder utility tab',
    ],
    howToUse: [
      { step: '1. Enter Destination URL', description: 'Type the webpage address you want to promote.' },
      { step: '2. Add Campaign Parameters', description: 'Fill in utm_source, utm_medium, and utm_campaign.' },
      { step: '3. Copy Tracking Link', description: 'Copy the complete URL and use it in your ad or email newsletter.' },
    ],
    faqs: [
      {
        question: 'Why are UTM parameters important for SEO & Marketing?',
        answer: 'UTM tags allow Google Analytics to attribute web traffic to specific campaigns, ads, and newsletters, giving you accurate conversion insights.',
      },
    ],
  },
  {
    id: 'epoch-converter',
    slug: 'epoch-converter',
    name: 'Unix Epoch & Timestamp Converter',
    category: 'converter',
    badge: 'Essential',
    searchVolumeMonthly: '2.7M / mo',
    targetKeywords: ['epoch converter', 'unix timestamp to date', 'current unix timestamp', 'timestamp calculator'],
    shortDescription: 'Convert Unix epoch timestamps to human-readable dates and vice versa with a live counter.',
    longDescription:
      'Real-time Unix epoch converter. Convert between timestamps in seconds or milliseconds and human-readable UTC/Local dates, ISO 8601 strings, and relative times.',
    metaTitle: 'Unix Timestamp & Epoch Converter Online | Tektonis',
    metaDescription:
      'Live Unix Epoch clock and converter. Convert timestamps to human-readable dates, ISO 8601, and local time with one click.',
    iconName: 'Clock',
    component: EpochConverter,
    features: [
      'Live ticking Unix timestamp counter in seconds',
      'Convert timestamps to UTC, Local, ISO 8601, and relative times',
      'Convert custom dates and times to epoch timestamps',
      'Quick offset buttons (+1 hour, +1 day, +1 week, +1 month)',
    ],
    howToUse: [
      { step: '1. View Current Time', description: 'See the current ticking epoch timestamp at the top.' },
      { step: '2. Timestamp to Date', description: 'Enter any number of seconds to get the exact human date.' },
      { step: '3. Date to Timestamp', description: 'Pick a calendar date and time to calculate its Unix epoch equivalent.' },
    ],
    faqs: [
      {
        question: 'What is Unix Epoch time?',
        answer: 'Unix epoch time is the total number of seconds elapsed since midnight UTC on January 1, 1970, excluding leap seconds. It is the universal standard for storing timestamps in computers.',
      },
    ],
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit & Measurement Converter',
    category: 'converter',
    badge: 'Popular',
    searchVolumeMonthly: '8.9M / mo',
    targetKeywords: ['unit converter', 'length converter', 'kg to lbs', 'celsius to fahrenheit', 'bytes to gb'],
    shortDescription: 'Convert units for length, weight, temperature, digital storage, and velocity.',
    longDescription:
      'Fast, multi-category unit converter. Convert metrics across distance, mass, digital memory, temperature, and speed simultaneously.',
    metaTitle: 'Universal Unit Converter Online – Length, Weight, Temp & Storage | Tektonis',
    metaDescription:
      'Free unit converter for distance, mass, temperature, bytes, and speed. Instant real-time conversion across all metrics.',
    iconName: 'Ruler',
    component: UnitConverter,
    features: [
      'Covers 5 core measurement categories: Length, Weight, Temp, Storage, Speed',
      'Calculates all target units at once without requiring multiple steps',
      'One-click copy for any converted measurement',
    ],
    howToUse: [
      { step: '1. Select Category', description: 'Pick Length, Weight, Temperature, Digital Storage, or Speed.' },
      { step: '2. Input Value & Source Unit', description: 'Enter the amount and pick your starting unit.' },
      { step: '3. View Conversions', description: 'All converted values update instantly across the grid.' },
    ],
    faqs: [
      {
        question: 'Does this use binary (1024) or decimal (1000) for storage?',
        answer: 'Digital storage uses the standard computing binary convention (1 KB = 1024 Bytes, 1 MB = 1024 KB, etc.).',
      },
    ],
  },
  {
    id: 'diff-checker',
    slug: 'diff-checker',
    name: 'Text & Code Diff Checker',
    category: 'developer',
    badge: 'Popular',
    searchVolumeMonthly: '1.9M / mo',
    targetKeywords: ['diff checker', 'text comparison online', 'compare two texts', 'code diff tool', 'find difference in text'],
    shortDescription: 'Compare two texts or code snippets to find additions, deletions, and percentage similarity.',
    longDescription:
      'Pinpoint differences between two versions of text or code. Features split and unified views, colored visual diff highlights, and a calculated similarity percentage.',
    metaTitle: 'Text Diff Checker Online – Compare Code & Text | Tektonis',
    metaDescription:
      'Compare two texts side-by-side or in unified view. See added, removed, and modified lines with exact similarity score.',
    iconName: 'Split',
    component: DiffChecker,
    features: [
      'Longest Common Subsequence (LCS) algorithm for accurate difference mapping',
      'Clear color-coded highlights: green for additions, red for deletions',
      'Toggle between Split View and Unified View',
      'Similarity percentage calculation',
    ],
    howToUse: [
      { step: '1. Paste Original Text', description: 'Enter the original content into the left box.' },
      { step: '2. Paste Modified Text', description: 'Enter the revised content into the right box.' },
      { step: '3. Analyze Diffs', description: 'Review the visual comparison and similarity percentage below.' },
    ],
    faqs: [
      {
        question: 'Can I use this for code diffs?',
        answer: 'Yes! It handles code snippets in Python, JavaScript, HTML, CSS, SQL, JSON, and plain prose equally well.',
      },
    ],
  },
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'SEO Meta Tag & SERP Generator',
    category: 'web-seo',
    badge: 'Essential',
    searchVolumeMonthly: '1.5M / mo',
    targetKeywords: ['meta tag generator', 'seo title description', 'serp snippet simulator', 'opengraph tags generator'],
    shortDescription: 'Generate HTML meta tags, OpenGraph cards, and preview live Google SERP snippets.',
    longDescription:
      'Optimize web pages for search engines and social platforms. Generate clean <head> meta tags with character count validation, Google SERP search result simulation, and social card preview.',
    metaTitle: 'SEO Meta Tag Generator & Google SERP Previewer | Tektonis',
    metaDescription:
      'Generate SEO title, description, and OpenGraph tags with live Google SERP preview and social media card mockup. Copy HTML instantly.',
    iconName: 'Search',
    component: MetaTagGenerator,
    features: [
      'Character length guides for Title (30–60 chars) and Description (120–160 chars)',
      'Live Google Search Result Snippet preview',
      'Interactive Social Media card preview (OpenGraph & Twitter)',
      'Copy complete HTML meta tags in 1 click',
    ],
    howToUse: [
      { step: '1. Enter Title & Description', description: 'Write your page title and summary.' },
      { step: '2. Check SERP Preview', description: 'Ensure the preview is catchy and within character limits.' },
      { step: '3. Add Social Image & URL', description: 'Include your canonical link and OpenGraph banner.' },
      { step: '4. Copy HTML', description: 'Copy and paste the generated tags into your website <head> tag.' },
    ],
    faqs: [
      {
        question: 'Why does Google truncate meta descriptions?',
        answer: 'Google search snippets typically display around 155 to 160 characters on desktop and slightly less on mobile. Keeping your description within 120–160 characters prevents cutoffs.',
      },
    ],
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Dummy Text Generator',
    category: 'text',
    badge: 'Popular',
    searchVolumeMonthly: '3.6M / mo',
    targetKeywords: ['lorem ipsum generator', 'dummy text generator', 'placeholder text', 'fake latin text'],
    shortDescription: 'Generate placeholder Lorem Ipsum text in paragraphs, sentences, words, or bullet lists.',
    longDescription:
      'Generate customizable dummy text for mockups, prototypes, and layouts. Choose paragraphs, sentences, words, or lists, with optional HTML tags wrapper.',
    metaTitle: 'Lorem Ipsum Generator – Dummy Text for Designers & Developers | Tektonis',
    metaDescription:
      'Generate customized placeholder text, paragraphs, words, and lists with optional HTML formatting. Fast and free.',
    iconName: 'Layers',
    component: LoremIpsumGenerator,
    features: [
      'Generate by Paragraphs, Sentences, Words, or Bullet lists',
      'Optional HTML tags formatting (<p>, <li>)',
      'Standard start with "Lorem ipsum dolor sit amet..." toggle',
      'Fast 1-click copy to clipboard',
    ],
    howToUse: [
      { step: '1. Select Type', description: 'Choose Paragraphs, Sentences, Words, or Lists.' },
      { step: '2. Choose Quantity', description: 'Use the slider to pick how much dummy text you need.' },
      { step: '3. Copy', description: 'Click Copy to Clipboard to paste directly into your design.' },
    ],
    faqs: [
      {
        question: 'What is the origin of Lorem Ipsum?',
        answer: 'Lorem Ipsum is derived from sections of Cicero\'s work "De Finibus Bonorum et Malorum" written in 45 BC. It has been used as the typesetting industry\'s standard placeholder text since the 1500s.',
      },
    ],
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age & Date Calculator',
    category: 'utilities',
    badge: 'Popular',
    searchVolumeMonthly: '22M / mo',
    targetKeywords: ['age calculator', 'calculate age from date of birth', 'date difference calculator', 'birthday countdown', 'days lived calculator'],
    shortDescription: 'Calculate exact chronological age in years, months, and days, plus birthday countdown and zodiac sign.',
    longDescription:
      'Find your precise age down to the day, hour, and minute. View the countdown to your next birthday, days lived, astrological zodiac sign, and calculate the exact difference between any two calendar dates.',
    metaTitle: 'Free Age Calculator Online – Calculate Age from Date of Birth | Tektonis',
    metaDescription:
      'Calculate exact age in years, months, days, and hours from your date of birth. Includes next birthday countdown and date difference calculator.',
    iconName: 'Calendar',
    component: AgeCalculator,
    features: [
      'Chronological age calculation in years, months, days, hours, and seconds',
      'Next birthday countdown and day-of-week birth analysis',
      'Astrological zodiac sign finder',
      'Date difference calculator for any two arbitrary calendar dates',
      '100% private in-browser computation with one-click summary copy',
    ],
    howToUse: [
      { step: '1. Enter Birth Date', description: 'Select your date of birth from the calendar picker.' },
      { step: '2. Select Target Date', description: 'Defaults to today or select any custom date to calculate age at.' },
      { step: '3. View Detailed Age Breakdown', description: 'Inspect exact years, months, days, total hours, and next birthday countdown.' },
      { step: '4. Copy Summary', description: 'Click Copy Summary to share or save your age statistics.' },
    ],
    faqs: [
      {
        question: 'How is exact age calculated with leap years?',
        answer: 'The calculator accounts for leap years and the varying number of days in each calendar month to give mathematically exact year, month, and day durations.',
      },
      {
        question: 'Can I calculate the number of days between two arbitrary dates?',
        answer: 'Yes! Switch to the Date Difference tab to calculate total days, weeks, and hours between any start and end date.',
      },
    ],
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage & Discount Calculator',
    category: 'utilities',
    badge: 'Popular',
    searchVolumeMonthly: '16M / mo',
    targetKeywords: ['percentage calculator', 'what is x percent of y', 'percentage increase calculator', 'discount calculator', 'sale price calculator'],
    shortDescription: 'Calculate percentage values, ratios, percentage increase/decrease, and retail sale discounts.',
    longDescription:
      'All-in-one percentage calculation suite. Quickly compute X% of Y, find what percentage X is of Y, measure percentage increases and decreases, and calculate discounted shopping prices with total savings.',
    metaTitle: 'Percentage Calculator Online – Percentage Increase & Discount Calculator | Tektonis',
    metaDescription:
      'Free online percentage calculator. Solve what is X% of Y, percentage increase/decrease, ratios, and sale price discounts instantly.',
    iconName: 'Percent',
    component: PercentageCalculator,
    features: [
      'What is X% of Y? (Basic percentage)',
      'X is what percent of Y? (Fraction and ratio percentage)',
      'Percentage change calculator (growth, increase, and decrease rate)',
      'Discount & retail sale price calculator with total savings',
      'Instant real-time calculations as you type with 1-click copy',
    ],
    howToUse: [
      { step: '1. Pick a Mode', description: 'Select one of the 4 dedicated calculation cards.' },
      { step: '2. Input Numbers', description: 'Enter your values in the input boxes.' },
      { step: '3. Get Instant Result', description: 'Results update instantly without page reloads or submit buttons.' },
    ],
    faqs: [
      {
        question: 'How do you calculate percentage increase or decrease?',
        answer: 'Subtract the original value from the new value, divide by the original value, and multiply by 100. A positive result is an increase; a negative result is a decrease.',
      },
    ],
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    name: 'Loan & EMI Calculator',
    category: 'utilities',
    badge: 'Essential',
    searchVolumeMonthly: '19M / mo',
    targetKeywords: ['loan calculator', 'emi calculator', 'mortgage calculator', 'car loan calculator', 'home loan emi calculator'],
    shortDescription: 'Calculate monthly loan EMI payments, total interest payable, and annual amortization schedule.',
    longDescription:
      'Plan your home loans, car financing, personal loans, and mortgages. Adjust principal loan amount, annual interest rate, and tenure to visualize monthly payments, total repayment, and year-by-year amortization.',
    metaTitle: 'Loan & EMI Calculator Online – Monthly Payment & Amortization | Tektonis',
    metaDescription:
      'Calculate monthly EMI payments, total interest, and annual amortization schedule for home, auto, or personal loans. Free and instant.',
    iconName: 'Calculator',
    component: LoanCalculator,
    features: [
      'Accurate monthly EMI calculation using standard financial formulas',
      'Principal vs. Interest percentage breakdown and visual ratio bar',
      'Multi-currency support ($, €, £, ₹)',
      'Interactive annual amortization schedule table showing yearly balance',
      'Interactive slider controls for real-time scenario modeling',
    ],
    howToUse: [
      { step: '1. Set Loan Amount', description: 'Use the slider or enter your target principal loan amount.' },
      { step: '2. Set Interest Rate & Tenure', description: 'Input your annual percentage rate (APR) and loan length in years.' },
      { step: '3. Review Payment Breakdown', description: 'See your monthly EMI, total interest cost, and amortization schedule.' },
    ],
    faqs: [
      {
        question: 'What is EMI in loans?',
        answer: 'EMI stands for Equated Monthly Installment. It is the fixed payment amount made by a borrower to a lender at a specified date each calendar month until the loan is fully repaid.',
      },
      {
        question: 'How is loan interest calculated?',
        answer: 'EMI is calculated using the reducing balance method: E = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is periodic interest rate, and n is total number of monthly payments.',
      },
    ],
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'BMI & Health Calculator',
    category: 'utilities',
    badge: 'Popular',
    searchVolumeMonthly: '18M / mo',
    targetKeywords: ['bmi calculator', 'body mass index calculator', 'ideal weight calculator', 'bmr calculator', 'daily calorie calculator'],
    shortDescription: 'Calculate Body Mass Index (BMI), WHO weight category, ideal body weight, and daily calorie needs (TDEE).',
    longDescription:
      'Evaluate healthy body weight with World Health Organization (WHO) BMI benchmarks. Supports Metric and Imperial units, displays your ideal healthy weight range, and estimates Basal Metabolic Rate (BMR) and daily calorie burn.',
    metaTitle: 'Free BMI Calculator Online – Body Mass Index & Ideal Weight | Tektonis',
    metaDescription:
      'Calculate your Body Mass Index (BMI), WHO weight status, ideal body weight range, and daily calorie expenditure (TDEE). Free and private.',
    iconName: 'Activity',
    component: BmiCalculator,
    features: [
      'Metric (cm/kg) and Imperial (ft-in/lbs) unit support',
      'WHO Body Mass Index classification gauge (Underweight, Normal, Overweight, Obese)',
      'Ideal healthy weight range based on normal BMI (18.5–24.9)',
      'Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) estimation',
    ],
    howToUse: [
      { step: '1. Select Units & Gender', description: 'Choose Metric or Imperial and select your gender and age.' },
      { step: '2. Input Height & Weight', description: 'Enter your height and weight measurements.' },
      { step: '3. Check Results', description: 'View your BMI score, weight category gauge, and ideal target weight.' },
    ],
    faqs: [
      {
        question: 'What is a healthy BMI for adults?',
        answer: 'According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered the normal, healthy weight range for adult men and women.',
      },
    ],
  },
  {
    id: 'box-shadow-generator',
    slug: 'box-shadow-generator',
    name: 'CSS Box Shadow Generator',
    category: 'developer',
    badge: 'Popular',
    searchVolumeMonthly: '2.2M / mo',
    targetKeywords: ['box shadow generator', 'css box shadow', 'css shadow generator', 'tailwind box shadow', 'inset shadow generator'],
    shortDescription: 'Visually design CSS and Tailwind box shadows with interactive sliders, blur, spread, and design presets.',
    longDescription:
      'Create stunning CSS box shadows visually. Customize horizontal offset, vertical offset, blur radius, spread, opacity, inset mode, and test on light and dark canvases. Generates copyable CSS and Tailwind CSS classes.',
    metaTitle: 'CSS Box Shadow Generator – Visual Shadow & Tailwind Code | Tektonis',
    metaDescription:
      'Visual CSS box shadow generator. Adjust blur, spread, offset, and color with real-time preview. Copy CSS and Tailwind shadow classes instantly.',
    iconName: 'Sliders',
    component: BoxShadowGenerator,
    features: [
      'Visual sliders for horizontal offset, vertical offset, blur radius, spread, and opacity',
      'Support for inset inner shadows',
      'Live interactive preview box with dark canvas toggle',
      'One-click copy for pure CSS (`box-shadow: ...`) and Tailwind CSS classes',
      'Curated designer presets: Soft Modern, Elevated Card, Float Glow, and Neo-Brutalist',
    ],
    howToUse: [
      { step: '1. Adjust Sliders', description: 'Tune X/Y offset, blur, spread radius, and opacity.' },
      { step: '2. Test Preview', description: 'Observe the shadow in real-time and toggle light/dark background.' },
      { step: '3. Copy Code', description: 'Copy the CSS rule or Tailwind arbitrary shadow class.' },
    ],
    faqs: [
      {
        question: 'How do I use this shadow in Tailwind CSS?',
        answer: 'Click "Copy Tailwind" to copy the arbitrary utility class (e.g. `shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.2)]`) directly into your HTML or JSX class list.',
      },
    ],
  },
  {
    id: 'markdown-converter',
    slug: 'markdown-converter',
    name: 'Markdown to HTML Converter',
    category: 'text',
    badge: 'Popular',
    searchVolumeMonthly: '3.1M / mo',
    targetKeywords: ['markdown to html', 'markdown editor online', 'convert markdown to html', 'live markdown previewer', 'markdown parser'],
    shortDescription: 'Convert formatted Markdown to clean HTML with split-screen editor, live preview, and syntax tools.',
    longDescription:
      'Edit and preview Markdown in real-time. Supports headings, bold/italics, blockquotes, code blocks, lists, links, and tables. Export clean HTML with a single click or download as a standalone .html file.',
    metaTitle: 'Markdown to HTML Converter Online – Live Preview & Editor | Tektonis',
    metaDescription:
      'Convert Markdown to HTML online with live split preview, formatting toolbar, and instant HTML export. 100% free and client-side.',
    iconName: 'FileText',
    component: MarkdownConverter,
    features: [
      'Split-view editor with live real-time HTML rendering',
      'Rich formatting toolbar for headings, bold, italics, code blocks, quotes, and links',
      'Clean HTML code output with one-click copy',
      'Download document as .html file directly from the browser',
      'Zero server upload — 100% client-side privacy',
    ],
    howToUse: [
      { step: '1. Type or Paste Markdown', description: 'Enter your markdown text into the left editor pane.' },
      { step: '2. Format with Toolbar', description: 'Use the quick formatting icons for headers, bold, code, and links.' },
      { step: '3. Copy or Export HTML', description: 'Click "Copy HTML" or download the generated HTML file.' },
    ],
    faqs: [
      {
        question: 'Does this converter support code blocks and lists?',
        answer: 'Yes! It supports fenced code blocks (` ``` `), inline code (` ` `), blockquotes, lists, bold, italics, links, and multi-level headings.',
      },
    ],
  },
];

