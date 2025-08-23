import { GetEventCommentResponseDto, GetImageResponseDto } from "@/app/api/dto";
import { create } from "zustand";

interface Event {
  id: string;
  title: string;
  date: string;
  location?: string;
  coverUrl?: string;
  createdAt: string;
}

interface EventsState {
  events: Event[];
  images: GetImageResponseDto;
  comments: GetEventCommentResponseDto;
  loading: boolean;

  // Fetch functions
  fetchEvents: () => Promise<void>;
  fetchImages: () => Promise<void>;
  fetchComments: () => Promise<void>;

  // Comment posting
  postComment: (
    name: string,
    content: string,
    eventId: string,
    eventName: string
  ) => Promise<void>;

  // Cache management
  clearCache: () => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  images: [],
  comments: [],
  loading: false,

  fetchEvents: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/events");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: Event[] = await res.json();
      set({ events: data, loading: false });
    } catch (error) {
      console.error("Error fetching events:", error);
      set({ loading: false });
    }
  },

  fetchImages: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/r2-storage");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      set({ images: data, loading: false });
    } catch (error) {
      console.error("Error fetching images:", error);
      set({ loading: false });
    }
  },

  fetchComments: async () => {
    try {
      const res = await fetch("/api/comments");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      set({ comments: data });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },

  postComment: async (
    name: string,
    content: string,
    eventId: string,
    eventName: string
  ) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          content: content,
          eventId: eventId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Refresh comments after posting
      await get().fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error; // Re-throw to allow UI to handle the error
    }
  },

  clearCache: () =>
    set({
      events: [],
      images: [],
      comments: [],
    }),
}));
