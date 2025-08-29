import { useState, useCallback, useMemo } from "react";
import { Event } from "@/app/api/dto";
import { findEventBySlug, isValidEventSlug } from "./slugUtils";

interface UseEventSearchReturn {
  event: Event | undefined;
  eventImages: any[];
  eventComments: any[];
  isLoading: boolean;
  isSearching: boolean;
  searchEvent: (slug: string) => void;
  clearSearch: () => void;
  isValidSlug: boolean;
}

export function useEventSearch(
  events: Event[],
  images: any[],
  comments: any[],
  onSearchImages?: (eventName: string) => Promise<void>,
  onSearchComments?: (eventName: string) => Promise<void>
): UseEventSearchReturn {
  const [currentSlug, setCurrentSlug] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const event = useMemo(() => {
    if (!currentSlug || events.length === 0) return undefined;
    return findEventBySlug(events, currentSlug);
  }, [currentSlug, events]);

  const isValidSlug = useMemo(() => {
    if (!currentSlug || events.length === 0) return false;
    return isValidEventSlug(events, currentSlug);
  }, [currentSlug, events]);

  const eventImages = useMemo(() => {
    if (!event || images.length === 0) return [];
    return images.filter((img) =>
      img.eventName?.toLowerCase().startsWith(`${event.title.toLowerCase()}`)
    );
  }, [event, images]);

  const eventComments = useMemo(() => {
    if (!event || comments.length === 0) return [];
    return comments.filter(
      (comment) => comment.eventName.toLowerCase() === event.title.toLowerCase()
    );
  }, [event, comments]);

  const searchEvent = useCallback(
    async (slug: string) => {
      if (!slug || slug === currentSlug) return;
      setCurrentSlug(slug);
      setIsSearching(true);

      try {
        if (onSearchImages && isValidEventSlug(events, slug)) {
          const event = findEventBySlug(events, slug);
          if (event) {
            await onSearchImages(event.title);
          }
        }

        if (onSearchComments && isValidEventSlug(events, slug)) {
          const event = findEventBySlug(events, slug);
          if (event) {
            await onSearchComments(event.title);
          }
        }
      } catch (error) {
        console.error("Error searching event:", error);
      } finally {
        setIsSearching(false);
      }
    },
    [currentSlug, events, onSearchImages, onSearchComments]
  );

  const clearSearch = useCallback(() => {
    setCurrentSlug("");
    setIsSearching(false);
  }, []);

  return {
    event,
    eventImages,
    eventComments,
    isLoading: events.length === 0,
    isSearching,
    searchEvent,
    clearSearch,
    isValidSlug,
  };
}
