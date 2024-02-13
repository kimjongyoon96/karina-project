export interface karinaData {
  uuid: string;
  menubar: string; // 메뉴바 카테고리 선택
  title: string; // 제목 선택
  photosumnail: string;
  photo: string[];
}

export interface AuthContextType {
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
}
