"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react'; // to know which user is logged in
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async(e) => {
    e.preventDefault(); // to prevent reload
    setSubmitting(true);

    try {
      // pass data from front-end to api using POST request
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally { //this happens with either try or catch
      setSubmitting(false);
    }
  }

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt