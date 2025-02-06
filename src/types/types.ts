export type CourseCategory = 
  | 'MK wajib ITB'
  | 'MK Wajib Prodi'
  | 'MK Pilihan Dalam Prodi'
  | 'MK Pilihan Luar Prodi'
  | 'MK Pilihan Bebas';

export interface Course {
  code: string;
  name: string;
  sks: number;
  category: CourseCategory;
  semester?: number;
}

export interface SKSMinima {
  category: CourseCategory;
  minimum: number;
  current: number;
}