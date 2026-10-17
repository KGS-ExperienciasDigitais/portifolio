import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/content/site";
import { ProfilePhotos } from "./ProfilePhotos";

export function ProfileCard() {
  return (
    <GlassCard className="p-6 lg:p-8">
      <div className="mb-6 text-center">
        <div className="mb-4">
          <ProfilePhotos photos={site.profile.photos} />
        </div>
        <p className="text-xs text-subtle">{site.profile.eyebrow}</p>
        <h3 className="text-2xl font-bold">{site.name}</h3>
        <p className="text-sm text-muted">{site.profile.headline}</p>
      </div>
      <p className="text-center text-sm leading-relaxed text-muted">{site.profile.bio}</p>
    </GlassCard>
  );
}
