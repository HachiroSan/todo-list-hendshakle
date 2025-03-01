/**
 * Represents the different categories of todo activities
 * These categories help organize and filter todos based on their nature
 */
export type TodoType = 
  | "education"    // Learning activities and educational tasks
  | "recreational" // Fun and leisure activities
  | "social"       // Activities involving social interaction
  | "diy"          // Do-it-yourself projects and crafts
  | "charity"      // Volunteer work and charitable activities
  | "cooking"      // Food preparation and culinary activities
  | "relaxation"   // Activities focused on rest and relaxation
  | "music"        // Music-related activities
  | "busywork";    // General tasks and errands

/**
 * Represents a todo item in the application
 * Contains all necessary information about a specific task or activity
 */
export interface Todo {
  /** Unique identifier for the todo item */
  id: string;
  /** The name or description of the activity */
  activity: string;
  /** The cost associated with the activity (in currency units) */
  price: number;
  /** The category this todo belongs to */
  type: TodoType;
  /** Indicates whether this activity requires advance booking */
  bookingRequired: boolean;
  /** A measure from 0 to 1 indicating how accessible this activity is */
  accessibility: number;
  /** Timestamp when this todo was created */
  createdAt: Date;
} 