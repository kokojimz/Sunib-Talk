import Comments from '@/components/comments';
import FormComment from '@/components/form-comments';
import prisma from '@/lib/db';
import { FC } from 'react';

interface BlogDetailPageProps {
    params: {
        id: string;
    };
}
const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
    const post = await prisma.post.findFirst({
        where: {
            id: params.id,
        },
        include: {
            author: true,
        },
    });

    return (
        <div className='max-w-4xl mx-auto py-8'>
            <h1 className='text-3xl font-bold mb-3'>{post?.title}</h1>
            <div className='mb-4 bg-slate-300 p-2 rounded-md'>
                <p className='text-gray-800 font-bold mr-2'>
                    Written by: {post?.author?.name}
                </p>
                <div className='mt-4'>{post?.content}</div>
            </div>
            <Comments postId={params.id} />
            <FormComment postId={params.id} />
        </div>
    );
};

export default BlogDetailPage;
