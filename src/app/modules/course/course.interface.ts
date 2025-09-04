export interface ICourse {
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  instructor?: string;
  duration?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourseFilters {
  search?: string;
  category?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  isPublished?: boolean;
}
