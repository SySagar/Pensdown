export interface userProfileTypes {
  isOpen: any;
  onClose: any;
  authorId: string;
}

export interface userTypes {
  name: string;
  displayName: string;
  followersCount: number;
  respect: number;
  blogsCount: number;
  bio: string;
}

export interface userBlogTypes {
  title: string;
  coverImageURL: string;
  likes: [];
  comments: [];
  date: string;
  _id: string;
}
