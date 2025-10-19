export interface GuideData {
  title: string;
  author: string;
  description: string;
  content: string;
  images: ImageData[];
  htmlContent: string;
}

export interface ImageData {
  url: string;
  filename: string;
  localPath: string;
}
