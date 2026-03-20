// ─── Enums ────────────────────────────────────────────────────────────────────

export type Role = 'ADMIN' | 'MEDIA' | 'VOLUNTEER';

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

export interface AuthResponse {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  constituentName: string | null;
  profilePictureUrl: string | null;
  userRoles: UserRole[];
}

export interface UserRole {
  id: string;
  userId: string;
  role: Role;
  description: string | null;
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  title: string;
  subcontent: string | null;
  content: string;
  multilingualContent: MultilingualContentItem[] | null;
  authorId: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
  Media: MediaItem[];
}

export interface PostAuthor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MultilingualContentItem {
  language: string; // e.g. "ENGLISH", "YORUBA", "IGBO", "HAUSA", "PIDGIN"
  title: string;
  content: string;
}

// ─── Media ────────────────────────────────────────────────────────────────────

export interface MediaItem {
  id: string;
  url: string;
  cloudinaryPublicId: string | null;
  type: string;
  postId: string | null;
  projectId: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  subcontent?: string;
  status?: PostStatus;
  multilingualContent?: MultilingualContentItem[];
  images?: File[];
}

export interface UpdatePostPayload {
  title?: string;
  content?: string;
  subcontent?: string;
  status?: PostStatus;
  multilingualContent?: MultilingualContentItem[];
  images?: File[];
}

// ─── Petitions ────────────────────────────────────────────────────────────────

export interface Petition {
  id: string;
  constituentName: string;
  topic: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePetitionPayload {
  constituentName: string;
  topic: string;
  message: string;
}

// ─── Volunteers ───────────────────────────────────────────────────────────────

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  lga?: string | null;
  interests?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVolunteerPayload {
  fullName: string;
  email: string;
  phone?: string;
  lga?: string;
  interests?: string[];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectStatus = 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'SUSPENDED';

export interface Project {
  id: string;
  title: string;
  description?: string | null;
  status: ProjectStatus;
  constituentName: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  Media: MediaItem[];
}

export interface CreateProjectPayload {
  title: string;
  status: ProjectStatus;
  constituentName: string;
  latitude: number;
  longitude: number;
  description?: string;
  images?: File[];
}

// ─── API Error ────────────────────────────────────────────────────────────────

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}
