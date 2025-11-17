import { Experience, TourCardProps } from '../../../types/experience';

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} phút`;
  const hours = minutes / 60;
  return `${hours} giờ`;
}
export const mapExperToTourCard = (experiences: Experience[]) => {
  return experiences.map(experience => ({
    id: experience.id,
    image: experience.media[0]?.url,
    title: experience.title,
    location: `${experience.district}, ${experience.city}`,
    price: experience.adultPrice,
    duration: formatDuration(experience.duration),
    cancellation:
      experience.cancellationPolicy === 'AlwaysFreeCancellation'
        ? 'Free cancellation'
        : undefined,
    activityLevel: experience.activityLevel,
  }));
};
