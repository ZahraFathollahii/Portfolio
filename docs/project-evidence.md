# Project description evidence

Code inspection supports the feature descriptions below; the other applications were not built or tested during this portfolio task.
The user confirmed contribution to difficult/new frontend features across these projects, not sole ownership or complete authorship.
The user clarified that Salam and the former Helsan entry are the same product; `helsan-front-ts` is a legacy source-folder name, not a separate portfolio project. The standalone Helsan card was removed. 4040 remains a separate product with shared code, as previously confirmed by the user.
The user confirmed that docs-back and paraclinic-back were supplied by a colleague; their backend implementation is not attributed to the user.
Existing resume projects remain grounded in the supplied PDF. No dates, metrics, production deployments or unconfirmed live URLs were added.
The existing two-page PDF is unchanged. The copy decks list portfolio entries, not a proposal to put every project into a two-page resume.

## User-provided live URLs

- Salam → `https://inhso.ir/`; `helsan-front-ts` is its legacy source-folder name, as explicitly clarified by the user. This is the retained project card's primary URL.
- Salam consultation frontend → `https://consultation.inhso.ir/home`; `salam-consultation-front` uses this consultation domain.
- Payesh → `https://payesh.inhso.ir/login`.
- Paraclinic Management → `https://paraclinic.isikato.ir/home`.
- Pharmacy Aggregator → `https://pharmacy.isikato.ir/`.
- Pardazeshgaran Sepehr Website → `https://picsepehr.com/`.
- Registration Portal (`reg-front`) → `https://mokamel.isikato.ir/`, as explicitly mapped by the user.
- Previously linked and reconfirmed: MSSP, PicoPet, Sepehr Salamat (`inhs.isikato.ir`) and Sepehr Online Pharmacy (`pharmacy.isikato.ir/drgharaee`).
- Cancermed → `https://cancermed.inhso.ir/`. The user confirmed contributions to doctor introductions, appointment booking and PWA installation. Its source code is unavailable; supplied screenshots identify the precision-oncology product and its install prompt. Their technology-detector panel reports React, React Router, Tailwind CSS and Framer Motion. Its two project bullets are limited to the confirmed frontend contributions. No clinical efficacy, AI implementation, backend work or marketing metrics are attributed to the user.

## Additional frontend projects

### Cancermed

Source: user-provided screenshots and direct confirmation of doctor-profile interfaces, appointment booking and PWA installation. Source code is unavailable. Stack evidence comes from the supplied browser technology-detector screenshot. No offline support or server-side implementation is claimed.

### 4040

Source folder: `4040-front`.

Evidence:

- `src/pages/auth/SsoCallback.tsx`
- `src/components/appRoutes/appRoutes.tsx`
- `src/pages/userEMR/components/MyPrescriptions/index.tsx`
- `src/components/EmrLayout/Charts/BloodPressureChart.tsx`

### Salam — former Helsan source label (merged)

These features belong to the existing Salam project and are not a separate portfolio entry.

Source folder: `helsan-front-ts`.

Evidence:

- `src/pages/public/ProvidersDirectory/index.tsx`
- `src/pages/public/mapLocator/index.tsx`
- `src/pages/userEMR/index.tsx`
- `src/components/EmrLayout/Charts/BloodPressureChart.tsx`

### Salam Admin

Source folder: `helsan-admin-front`.

Evidence:

- `src/App.tsx`
- `services/actions/userManagement/upToDoctor.ts`
- `services/actions/userManagement/revokeUserRole.ts`
- `app/[lang]/(protected)/dashboard/support/[_id]/ReplyBox.tsx`
- `services/actions/appLogs/appLogs.ts`

### Consultation Admin

Source folder: `consultation-admin-front`.

Evidence:

- `src/pages/dashboard/orders/hooks/useAdminOrders.ts`
- `src/pages/dashboard/canceledAppointments/hooks/useCanceledAppointments.ts`
- `src/pages/dashboard/meetingLinkIssues/hooks/useMeetingLinkIssues.ts`
- `src/pages/dashboard/providerCategories/hooks/useCategoryManagement.ts`

### Document Management

Source folder: `docs-front`.

Evidence:

- `src/components/ManageDocs/DocsInformations.jsx`
- `src/components/ManageDocs/UploadVersions.jsx`
- `src/components/Media/index.jsx`
- `src/utils/downloadZip.jsx`

### Hub Panel

Source folder: `hub-panel-front`.

Evidence:

- `src/App.jsx`
- `src/components/Pages/adminPanel/allClientsManagement/assignServices.jsx`
- `src/components/Pages/managerPanel/servicesList/components/AddServices.jsx`
- `src/components/UI/publicReports/PublicReports.jsx`

### Laboratory Management

Source folder: `lab-front`.

Evidence:

- `src/App.jsx`
- `src/components/Pages/dashboard/electronicPrescription/components/handleFinish.js`
- `src/components/Pages/dashboard/verifyResult/index.jsx`
- `src/components/Pages/resultPublicPage/index.jsx`

### Paraclinic Management

Source folder: `paraclinic-front`.

Evidence:

- `src/App.jsx`
- `src/components/Pages/dashboard/electronicPrescription/components/useLoadOption.js`
- `src/components/Pages/dashboard/sakhad/GetPrescsUploadedDocs.jsx`
- `src/services/acceptedPrescriptions/acceptedPrescriptionsServices.js`

### Pharmacy Aggregator

Source folder: `pharmacy-aggregator-front`.

Evidence:

- `src/pages/panel/supervisor/lib/useReservePrescription.ts`
- `src/pages/panel/operator/operatorOrderTracking/index.tsx`
- `src/pages/public/lib/useGetPharmaciesList.ts`
- `src/pages/public/lib/normalizePublicPharmacy.ts`
- `src/pages/public/pharmaciesMap/index.tsx`

### Specialized Pharmacy Aggregator

Source folder: `spec-pharmacy-aggregator-front`.

Evidence:

- `src/pages/panel/operator/prescriptionSender/index.tsx`
- `src/pages/panel/supervisor/lib/useReservePrescription.ts`
- `src/pages/panel/admin/operatorManagement/index.tsx`
- `src/pages/panel/admin/supervizorManagement/index.tsx`

### Pardazeshgaran Sepehr Website

Source folder: `pic-sepehr-front`.

Evidence:

- `src/pages/Panel/Article/AddNews.jsx`
- `src/hooks/useRouteMetadata.js`
- `src/App.jsx`

### Registration Portal

Source folder: `reg-front`.

Evidence:

- `src/routes/PrivateRoutes.jsx`
- `src/components/Pages/home/IsargaryInfo/filesTab.jsx`
- `src/components/Pages/Admin/Dashboard/Monitoring/charts.jsx`
- `src/components/Pages/Admin/Dashboard/UsersTable/usersTable.jsx`

### Training Management

Source folder: `train-front`.

Evidence:

- `src/routes/routes.tsx`
- `src/services/apiCall.ts`
- `src/features/auth/auth-context.tsx`
- `src/hooks/use-resource.ts`

### Education Workspace — Demo

Source folder: `education`.

Evidence:

- `src/features/courses/components/CourseForm.tsx`
- `src/features/courses/pages/CoursesPage.tsx`
- `src/lib/demo-store.ts`
- `src/features/learners/pages/LearnerPage.tsx`

## Existing frontend projects

- `mssp-front` → MSSP; API integrations and tests are confirmed in the resume. Mock-backed dashboards and news fixtures are not presented as live integrations.
- `payesh-front` → Payesh; clinical forms, role-specific workflows and shared Redux state.
- `picopet-front` → PicoPet; appointment, clinical-record and localization workflows.
- `salam-consultation-front` and `helsan-front-ts` → Salam; booking, consultation, payments and notification integrations.
- `pharmacy-front` → Sepehr Pharmacy; checkout, inventory, prescription and PWA workflows.
- `inhs-front` → Sepehr Salamat; multi-insurer prescription and React Flow cancer-pathway interfaces.
- Ganotic is retained from the supplied resume; its repository is not in the inspected folder.

## Excluded or qualified claims

- `education` is a local demo using browser storage and seeded records; it is labeled as a demo in both languages. No production authentication or tenant isolation is claimed.
- `pic-sepehr-front` recruitment/resume-review screens use mock data/local state. They are not described as a live recruitment system.
- `4040-front` background sync is limited to selected login requests in its service worker. No offline prescription submission is claimed.
- `train-front` retains unused healthcare chart components. They are not presented as training-platform features.
- Salam Admin (`helsan-admin-front`) has legacy `app/[lang]` directories, but its active entry point is Vite/React Router. It is not labeled as Next.js.
- NestJS, Express, MongoDB and MinIO found in the supplied backend repositories are not added to frontend project tech stacks.
- `docs-back` and `paraclinic-back` are context for their corresponding frontend integrations, not separate personal backend projects.

## Case-study copy audit

- Rechecked the five detail pages against the supplied resume and available frontend source. Ganotic remains resume-backed; its source is unavailable. Presence of a feature in a repository does not independently prove individual authorship.
- Removed the unverified “30+” examination-module count and the multi-tenant claim from Payesh in both locales. The replacement describes clinical forms, shared Redux state, onboarding and role-specific organization/clinic interfaces. No claim about backend tenant isolation is made.
- Decisions, challenges and results remain unwritten and hidden; the pages are currently project overviews rather than complete engineering case studies.
