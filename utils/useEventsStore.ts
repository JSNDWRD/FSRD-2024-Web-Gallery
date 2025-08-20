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
  eventImages: GetImageResponseDto;
  images: GetImageResponseDto;
  eventComments: GetEventCommentResponseDto;
  comments: GetEventCommentResponseDto;
  loading: boolean;
  searchEvents: (eventName: string) => Promise<void>;
  searchComments: (eventName: string) => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchImages: () => Promise<void>;
  fetchComments: () => Promise<void>;
  clearCache: () => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  eventImages: [],
  images: [],
  eventComments: [],
  comments: [],
  loading: false,

  searchEvents: async (eventName: string) => {
    set({ loading: true, eventImages: [] });
    try {
      if (get().images.length === 0) {
        await get().fetchImages();
      }

      const { images } = get();
      const filtered = images.filter((img) =>
        img.key?.toLowerCase().startsWith(`${eventName.toLowerCase()}/`)
      );

      set({ eventImages: filtered, loading: false });
    } catch (error) {
      console.error("Error fetching event images:", error);
      set({ loading: false });
    }
  },
  fetchEvents: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/events");
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
      const data = await res.json();
      set({ images: data, loading: false });
    } catch (error) {
      console.error("Error fetching images:", error);
      set({ loading: false });
    }
  },
  searchComments: async (eventName: string) => {
    set({ loading: true, eventComments: [] });
    try {
      if (get().comments.length === 0) {
        await get().fetchComments();
      }

      const { comments } = get();
      const filtered = comments.filter((comment) =>
        comment.eventName.toLowerCase().startsWith(eventName.toLowerCase())
      );

      set({ eventComments: filtered, loading: false });
    } catch (error) {
      console.error("Error fetching event comments:", error);
      set({ loading: false });
    }
  },
  fetchComments: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/comments/`);
      const data = await res.json();
      console.log(data);
      set({ comments: data, loading: false });
    } catch (error) {
      console.error("Error fetching comments:", error);
      set({ loading: false });
    }
  },
  clearCache: () => set({ events: [], images: [], eventImages: [] }),
}));
