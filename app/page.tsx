import RsvpForm from "@/components/rsvp-form"
import GiftSection from "@/components/gift-section"
import CountdownTimer from "@/components/countdown-timer"
import PhotoGallery from "@/components/photo-gallery"
import SocialShareButtons from "@/components/social-share-buttons"

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-center text-orange-600">You're Invited!</h1>
      <p className="text-center text-gray-700">
        Join us in celebrating Maxwell Kotay's graduation from Rocky River High School!
      </p>
      <CountdownTimer targetDate={new Date('2023-12-31T23:59:59')} />
      <PhotoGallery />
      <GiftSection />
      <RsvpForm />
      <SocialShareButtons />
    </main>
  )
}
