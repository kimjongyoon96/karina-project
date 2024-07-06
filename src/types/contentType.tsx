export interface karinaData {
  uuid: string;
  menubar: string; // 메뉴바 카테고리 선택
  title: string; // 제목 선택
  photosumnail: string;
  photos: string[];
  userNickName: string;
  likeCount: number;
  postView: number;
  commentCount: number;
  s3Url: string;
}

export interface AuthContextType {
  // isLoading: boolean;
  // setIsLoading: (loading: boolean) => void;
}

export interface myWrite {
  comments: object;
  likes: object;
  posts: object;
  total: number;
}
//* 게시물 업로드(write 컴포넌트)에 타입
export interface writeData {
  uuid: string;
  menubar: string; // 메뉴바 카테고리 선택
  title: string; // 제목 선택
  photosumnail: string;
  photos: string[];
}
