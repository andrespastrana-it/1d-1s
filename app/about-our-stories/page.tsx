import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AboutOurStoriesPage() {
  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        About Our AI-Generated Stories
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          At Daily Tales, we harness the power of artificial intelligence to
          create engaging, thought-provoking stories that resonate with our
          readers. While our stories are generated using AI technology, they
          represent authentic narratives that reflect real human experiences,
          emotions, and perspectives.
        </p>

        <h2>Our Approach</h2>
        <p>
          Each story on Daily Tales is carefully crafted using advanced AI
          language models that have been trained on a diverse range of literary
          works, articles, and narratives. This allows us to create content that
          spans various genres, themes, and writing styles.
        </p>

        <h2>Curation and Quality</h2>
        <p>
          Although our stories are AI-generated, they undergo a thorough
          curation process. We ensure that each story meets our standards for
          quality, coherence, and engagement. Our team reviews the content to
          make sure it resonates with our readers and provides meaningful
          experiences.
        </p>

        <h2>The Human Element</h2>
        <p>
          While the initial drafts are created by AI, the human element remains
          central to our platform. The themes, emotions, and experiences
          depicted in our stories reflect the depth and complexity of human
          life. Additionally, our community&apos;s interactions—through
          comments, likes, and shares—bring a human dimension to the
          AI-generated content.
        </p>

        <h2>Transparency</h2>
        <p>
          We believe in being transparent about the nature of our content. All
          stories on Daily Tales are clearly labeled as AI-generated, allowing
          readers to appreciate the technological innovation while enjoying the
          narrative experience.
        </p>

        <h2>Join Our Community</h2>
        <p>
          We invite you to explore our collection of AI-generated stories,
          engage with our community, and experience the unique blend of
          artificial intelligence and authentic storytelling that defines Daily
          Tales.
        </p>
      </div>

      <div className="mt-8">
        <Button asChild>
          <Link href="/stories">Explore Our Stories</Link>
        </Button>
      </div>
    </div>
  );
}
