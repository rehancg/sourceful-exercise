# Sourceful Exercise - Fullstack Engineer Role

This project is a technical exercise for the **Sourceful Fullstack Engineer** position. The primary objective was to recreate the **Prompt Box component** from the original Sourceful website, implementing a dynamic, configurable, and user-friendly interface for AI-powered design generation.

## 🚀 Live Demo

**Demo URL:** [https://sourceful-exercise.vercel.app/](https://sourceful-exercise.vercel.app/)

## 📋 Project Overview

The application is a Next.js-based web application that allows users to create AI-generated designs through a sophisticated prompt box interface. The system supports both guest and authenticated users, with different experiences and capabilities for each user type.

### Key Pages

- **Landing Page** (`/`) - Public-facing page with hero section and prompt box
- **Home Page** (`/home`) - Authenticated user dashboard with full feature access
- **Session Page** (`/dashboard/session/[sessionId]`) - Design session view with request/response cards
- **Login Page** (`/login`) - Email-based authentication

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.0.2** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **tailwind-merge** - Merge Tailwind classes intelligently
- **clsx** - Conditional class names

### Testing
- **Vitest 4.0.9** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **happy-dom** - Lightweight DOM implementation for testing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## ✨ Features

### 1. **Dynamic Prompt Box Component**
The centerpiece of the application is a highly configurable prompt box that adapts based on:
- Selected feature (AI Imagery, Logo Design, Packaging Design, etc.)
- User authentication status (guest vs. logged-in)
- Feature-specific configurations (placeholders, action buttons, tooltips, info messages)
- Support for reference image uploads
- **Query Parameter Support** - Features can be pre-selected via URL query parameters (see [Use Cases](#use-cases) below)

### 2. **Mobile-First Responsive Design**
- Fully responsive layouts for all screen sizes
- Mobile-optimized navigation with full-screen modals
- Touch-friendly interactions
- Adaptive tooltip positioning

### 3. **Coin Balance Tracking**
- Real-time credit balance display
- Credit usage tracking and history
- Balance-aware feature availability (e.g., image generation cost calculation)
- Credit transaction history view

### 4. **Authentication & Route Protection**
- Email-based authentication (no password required)
- Protected routes for authenticated users
- Guest user experience with limited features
- Automatic redirects based on authentication status
- Bearer token authentication

### 5. **UI Component Library**
- **Sidebar Navigation** - Transparent side nav with help and chat icons
- **Tooltips** - Contextual help with images and descriptions
- **Popovers** - Dropdown menus for account and credit usage
- **Full-Screen Modals** - Mobile-friendly overlay components
- **Buttons** - Primary and secondary variants with icons
- **Shared UI Components** - Reusable, consistent design system

### 6. **Context-Based State Management**
- **AuthContext** - Global authentication state, user data, and balance management
- **PromptBoxContext** - Feature selection, prompt input, and image upload state
- **MobileMenuContext** - Mobile navigation state management

### 7. **Accessibility (a11y)**
- ARIA labels and roles throughout
- Keyboard navigation support
- Screen reader optimizations
- Focus management
- Semantic HTML structure

### 8. **Unit Testing**
- Comprehensive test coverage with Vitest
- Component unit tests
- Context testing
- Test utilities and mocks

## 🎯 Use Cases

The Prompt Box supports multiple design use cases that can be selected via the UI or through URL query parameters. Each use case has its own configuration, placeholder text, action buttons, and tooltips.

### Query Parameter Support

You can pre-select a specific use case by adding the `use-case` query parameter to the URL:

```
https://sourceful-exercise.vercel.app/?use-case=ai-imagery
https://sourceful-exercise.vercel.app/?use-case=logo-design
https://sourceful-exercise.vercel.app/home?use-case=packaging-design
```

### Available Use Cases

| Use Case ID | Label | Status | Description |
|------------|-------|--------|-------------|
| `ai-imagery` | Create image | New | Create AI imagery using state-of-the-art image models |
| `packaging-design` | Packaging design | Available | Design packaging that looks ready for the shelf |
| `logo-design` | Logo design | New | Create a logo that feels right, fast |
| `edit-image` | Edit image | Coming Soon | Transform and enhance your images with AI-powered editing tools |
| `ai-photoshoot` | AI Photoshoot | New | Create professional product photoshoots with AI |
| `brand-moodboard` | Brand moodboard | New | Create visual moodboards that capture your brand essence |
| `social-ads` | Social ads | Coming Soon | Create engaging social media ads that convert |
| `product-mockups` | Product mockups | New | Generate realistic product mockups for your designs |
| `cards-posters` | Cards & posters | New | Design stunning cards and posters for any occasion |

### Example URLs

- **Landing Page with AI Imagery:** `/?use-case=ai-imagery`
- **Home Page with Logo Design:** `/home?use-case=logo-design`
- **Home Page with Packaging Design:** `/home?use-case=packaging-design`

The query parameter is validated against available features, and if an invalid value is provided, it defaults to `ai-imagery`.

## 📁 Project Structure

```
sourceful-exercise/
├── app/                    # Next.js App Router pages
│   ├── (landing)/         # Landing page group
│   ├── home/              # Home page
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Login page
│   └── api/               # API routes (mocked)
├── components/
│   ├── prompt-box/        # Prompt box component and sub-components
│   │   ├── context/       # PromptBox context
│   │   └── hooks/         # Custom hooks
│   ├── ui/                # Shared UI components
│   ├── layout/            # Layout components
│   ├── landing/           # Landing page components
│   ├── home/              # Home page components
│   ├── account/           # Account-related components
│   └── session/           # Session page components
├── contexts/              # React contexts (Auth, etc.)
├── lib/                   # Utilities and constants
├── __tests__/             # Unit tests
└── public/                # Static assets
```

## 🎯 Current Implementation Status

### ✅ Completed Features
- Dynamic prompt box with feature selection
- Guest and authenticated user flows
- Coin balance tracking and display
- Protected routes
- Mobile-responsive design
- Tooltip system with images
- Account menu and credit usage views
- Unit test setup and initial tests
- Accessibility improvements

### ⚠️ Current Limitations
- **All prompt box actions currently link to the same hardcoded session page** - In a production environment, each feature would route to its specific workflow
- **APIs are mocked** - All API endpoints return dummy data for demonstration purposes
- **Session page is static** - Displays hardcoded session data rather than dynamic results

## 🐛 Observations & Suggested Improvements

### User Experience Observations from Sourceful Website

While building this exercise and referencing the original Sourceful website, the following observations were made that could improve the user experience:

#### 1. **Logo Design Flow Enhancement**
Based on observations from the Sourceful website's logo design flow, it would be more user-friendly to replace text input fields with dropdowns for:
- **Target Audience** - Single or multi-select dropdown
- **Industry** - Single or multi-select dropdown

This would provide better UX by offering predefined options and reducing input errors.

#### 2. **AI Imagery Coin Balance Issue**
**Observation:** On the original Sourceful website, when a user has 8 coins, the image count selector and generator buttons are not available, even though 8 coins should allow generating 4 images (2 coins per image).

#### 3. **Cards & Posters Footer Actions**
**Observation:** On the original Sourceful website, the footer actions in the "Cards & Posters" section appear to be using actions from the "Package Design" feature instead of its own specific actions.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Development

The application runs on `http://localhost:3000` by default.

#### Testing Authentication
- Use any email address to log in (e.g., `test@example.com`)
- The login endpoint returns dummy user data with a balance of 16 coins
- No password is required

## 🧪 Testing

The project uses Vitest for unit testing. Test files are located in the `__tests__/` directory.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Code Quality

- **ESLint** - Configured with Next.js recommended rules
- **TypeScript** - Full type safety throughout the application
- **Component Structure** - Organized with clear separation of concerns

## 🎨 Design System

The application follows a consistent design system with:
- Custom color palette defined in Tailwind config
- Reusable UI components
- Consistent spacing and typography
- Gradient backgrounds for visual appeal
- Responsive breakpoints

## 📱 Mobile Experience

The application is fully responsive with:
- Mobile-first navigation
- Full-screen modals for mobile menus
- Touch-optimized interactions
- Adaptive tooltip positioning
- Responsive grid layouts

## 🔐 Authentication Flow

1. **Guest Users:**
   - Can view landing page
   - Can interact with prompt box (limited features)
   - Redirected to login when attempting protected actions

2. **Authenticated Users:**
   - Full access to all features
   - Coin balance tracking
   - Account management
   - Credit history
   - Protected routes accessible

## 🎯 Future Enhancements

1. **Feature-Specific Workflows** - Each prompt box feature should route to its own dedicated workflow
2. **Real API Integration** - Replace mocked endpoints with actual backend services
3. **Dynamic Session Management** - Real-time session updates and results
4. **Enhanced Form Controls** - Dropdowns for logo design flow fields
5. **Bug Fixes** - Address coin balance calculation and feature action mapping issues
6. **Performance Optimization** - Code splitting, lazy loading, and optimization
7. **Error Handling** - Comprehensive error boundaries and user feedback
8. **Loading States** - Better loading indicators for async operations

## 📄 License

This project is a technical exercise and is not intended for production use.

## 👤 Author

Created as part of the Sourceful Fullstack Engineer technical assessment.

---

**Note:** This is an exercise project. All APIs are mocked, and the session page displays hardcoded data for demonstration purposes.
