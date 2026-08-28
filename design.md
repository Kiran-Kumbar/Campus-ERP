# Campus ERP Design System (Stitch Rules)

This document defines the strict visual language for the Campus ERP POC. This must be followed to avoid generic "AI-generated" aesthetics and ensure a premium enterprise feel.

## 1. Color Palette

Use color semantically. Never turn every section into a colored box. 

### Backgrounds & Surfaces
- **Base Canvas:** `#F6F5F1` (Warm off-white)
- **Surface (Cards/Modals):** `#FFFFFF` (Pure white)
- **Surface Subtle:** `#F1F1EC` (Slightly darker off-white for secondary panels)

### Text & Ink
- **Primary Ink:** `#14212B` (Deep ink navy - use instead of pure black)
- **Secondary Text:** `#58656E` (For labels, metadata)
- **Muted Text:** `#7C878D` (For placeholders, disabled text)
- **Border:** `#D9DDD9` (Subtle borders)

### Brand & Interactive
- **Primary Teal:** `#0F766E` (Main action color)
- **Primary Teal Hover:** `#0B625C` (Hover state for primary actions)

### Semantic & Status
- **Warning/Amber:** `#B7791F`
- **Attention/Coral:** `#C95C45`
- **Success/Green:** `#28745A`
- **Danger/Red:** `#B84A4A`

## 2. Typography

- **Font Family:** `IBM Plex Sans` (or `Inter` tailored for enterprise density)
- **Display:** 32–36px
- **Page Title:** 24–28px
- **Section Title:** 18–20px
- **Body:** 14–15px
- **Dense Table:** 13–14px
- **Supporting Text:** 12–13px

## 3. Border Radius System

- **sm:** `6px`
- **md (DEFAULT):** `10px` (Strictly used for Inputs and standard Buttons)
- **lg:** `14px` (Used for Cards)
- **xl:** `18px` (Used for Dialogs/Modals)
- **pill:** `999px` (Used for Badges)
- **Avatar:** `50%`

## 4. Spacing System

- Strict base spacing system: `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`
- **Page horizontal padding:** `32px` desktop
- **Section spacing:** `24–32px`
- **Card padding:** `20–24px`
- **Form vertical spacing:** `16px`
- **Label gap:** `6–8px`
- **Table cell padding:** `12px 16px`
- **Toolbar gap:** `8–12px`

## 5. Shadows & Elevation

Do not use huge soft AI-style shadows. Prefer borders and subtle elevation.
- **Level 0:** Border only
- **Level 1:** Very subtle shadow
- **Level 2:** Dropdown/Menu
- **Level 3:** Dialog / Command Interface

## 6. Layout & Form Perfection (Eye-Soothing UI)

- **Center-Focused Layouts:** Single-task workflows (like login, onboarding, or critical approvals) must be center-focused, removing peripheral noise to maintain user concentration.
- **Eye-Soothing Alignment:** Forms must have mathematical alignment. Inputs and labels must align perfectly on the left axis. Avoid cluttered multi-column forms unless dictated by high data density.
- **Progressive Disclosure:** Break complex forms (like Admissions) into logical steps (e.g., Basic Info -> Documents -> Review) rather than an overwhelming single page.
- **Feedback & Validation:** Use inline validation. Avoid jarring red text; use our semantic Danger color with a subtle background to keep it easy on the eyes.

## 7. Features & Domain Workflows

All modules must follow the domain architecture. We do not use "generic" admin tables.
1. **Admissions:** Enquiry -> Application -> Document Verification -> Interview -> Offer -> Enrollment
2. **Student 360:** Unified view (Academics, Attendance, Fees, Transport, Library).
3. **Finance:** Fee Structures -> Accounts -> Invoices -> Payments.
4. **Academics & Attendance:** Task-oriented roster marking. Notification propagation.
