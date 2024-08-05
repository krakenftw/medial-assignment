import { generateOgImage } from "@/actions/doers/generateImage";
import { getPostData } from "@/actions/doers/post";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;
  const data = await getPostData(id);
  const ogImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE}/${id}.png`;
  return {
    openGraph: {
      title: data?.title!,
      description: data?.content!,
      images: [ogImageUrl],
    },
  };
}

export default async function Post({ params }: { params: { id: string } }) {
  const data = await getPostData(params.id);

  if (!data) {
    return <div className="text-center text-2xl mt-10">Invalid post ID</div>;
  }

  const ogImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE}/${params.id}.png`;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div className="flex items-center text-gray-600 mb-4">
        <span className="mr-4">
          Posted {formatDistanceToNow(new Date(data.createdAt))} ago
        </span>
      </div>
      <div className="prose max-w-none mb-6">{data.content}</div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Open Graph Image Preview
        </h2>
        <Image
          src={ogImageUrl}
          alt="Open Graph Image"
          width={600}
          height={315}
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
