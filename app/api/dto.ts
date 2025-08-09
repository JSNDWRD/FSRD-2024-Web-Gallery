export type GetImageResponseDto = {
  key: string | undefined;
  size: number | undefined;
  link: string;
  lastModified: Date | undefined;
  eventName: string;
}[];

export type GetEventCommentsRequestDto = {
  eventName: string;
};

export type GetEventCommentResponseDto = {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}[];

export type PostCommentRequestDto = {
  eventId: string;
  name: string;
  content: string;
};

export type PostCommentResponseDto = {
  success: boolean;
  name: string;
  content: string;
  createdAt: Date;
};
