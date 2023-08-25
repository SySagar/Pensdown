export interface blogTypes {
    _id: string;
    title: string;
    blogId: string;
    date: string;
    content: string;
    authorName: string;
    likes: string;
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
        }
      }
    
  }