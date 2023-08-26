export interface blogTypes {
    _id: string;
    title: string;
    blogId: string;
    date: string;
    content: string;
    authorName: string;
    likes: number;
    comments: number;
    tags: string[];
    coverImageURL: string;
  }

  export interface SingleBlogTypes {
  data:
      {
        blogs:
        {
          authorName:string,
          content:string,
          title:string,
          date:string,
          coverImageURL:string,
          likes: [];
          comments: [];
        }
      }
    
  }

  export interface BlogCommentTypes {
    _id: string;
    blogId: string;
    comment: string;
    createdAt: string;

      authorId:{
        displayName: string;
    };
  }

  export interface CommentTypes {
    comment:string;
    createdAt: string;
    author: string;
  }