export type AppStackParamList = {
  Main: {
    screen: 'Home';
    params?: {
      newPost?: {
        id: string;
        title: string;
        creator: string;
        thumbnail: string;
      };
    };
  };
  Auth: undefined;
  ShortsStack: undefined;
  PhotoStack: undefined;
  ShortsPlayerScreen: {title: string; creator: string};
  PostVideoScreen: undefined;
};
