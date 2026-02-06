import BeerScroll from "@/components/BeerScroll";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        variant: string;
    }>;
}

const validVariants = ["1", "2", "3", "4", "5"];

export function generateStaticParams() {
    return validVariants.map((variant) => ({
        variant,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { variant } = await params;

    const variantNames: Record<string, string> = {
        "1": "Classic Elegance",
        "2": "Brutalist Modern",
        "3": "Coastal Minimalism",
        "4": "Neon Nightlife",
        "5": "Vintage Pub",
    };

    const name = variantNames[variant] || "Experience";

    return {
        title: `Taptide | ${name}`,
        description: `Experience the ${name} version of Taptide Pub's perfect pour.`,
    };
}

export default async function VariantPage({ params }: PageProps) {
    const { variant } = await params;

    if (!validVariants.includes(variant)) {
        notFound();
    }

    const variantId = parseInt(variant, 10);

    return (
        <main className="relative">
            <BeerScroll variantId={variantId} />
        </main>
    );
}
