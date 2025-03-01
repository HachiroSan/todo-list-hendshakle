# Todo List Assessment

This project is an implementation of a todo list application built as part of a technical assessment for Hendshake Sdn Bhd. The goal was to create a functional, well-structured todo application that demonstrates modern web development practices and technical proficiency.

## Assessment Requirements Implementation

### 1. Adding to the List
✅ Implemented a form with the following fields:
- Activity (string) - Text input for task description
- Price (number) - Numeric input with validation
- Type (select) - Dropdown with predefined categories:
  - education
  - recreational
  - social
  - diy
  - charity
  - cooking
  - relaxation
  - music
  - busywork
- Booking Required (checkbox) - Boolean toggle
- Accessibility (slider) - Range from 0.0 to 1.0

### 2. Removing from the List
✅ Implemented with:
- Delete button for each todo item
- Immediate visual feedback
- Toast notifications for user confirmation

### 3. List Summary
✅ Implemented with:
- Total count display at the top
- Dynamic updates on add/remove

### 4. Data Persistence
✅ Implemented using:
- Local storage for data persistence
- State management through React Context
- Automatic state restoration on page reload

## Technical Implementation

### Key Technical Decisions

1. **Framework Choice: Next.js**
   - Modern React framework
   - Built-in TypeScript support
   - Excellent developer experience

2. **UI Components: shadcn/ui**
   - High-quality, accessible components
   - Customizable and maintainable
   - Consistent design language

3. **Form Management**
   - React Hook Form for efficient form handling
   - Zod schema validation for type safety
   - Controlled inputs for better user experience

4. **State Management**
   - React Context for global state
   - Local storage integration for persistence
   - Optimized re-renders

5. **Type Safety**
   - TypeScript for robust type checking
   - Zod schemas for runtime validation
   - Type definitions for all components

## Project Structure

```
src/
├── app/                   # Next.js app directory
├── components/           
│   ├── ui/               # shadcn/ui components (only used ones kept)
│   ├── TodoForm.tsx      # Form implementation
│   └── TodoList.tsx      # List and item management
├── contexts/             # State management
├── lib/                  # Utilities
├── styles/              # Global styles
└── types/               # TypeScript definitions
```

## Running the Project

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Development Considerations

- **Performance**: Minimized re-renders using React's useMemo and useCallback
- **Code Organization**: Clear separation of concerns and component structure