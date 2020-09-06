interface Upload {
  id: number;
  name: string;
  type: 'programming' | 'image' | 'video' | 'document' | 'other';
  size: number;
  created_at: string;
}