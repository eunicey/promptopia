"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // to get id from url
  const promptId = searchParams.get('id');

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  // Get Prompt
  useEffect(() => {
    const getPromptDetails = async() => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails();
  }, [promptId])
  
  // Update Prompt
  const updatePrompt = async(e) => {
    e.preventDefault(); // to prevent reload
    setIsSubmitting(true);

    if(!promptId) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
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
      setIsSubmitting(false);
    }
  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt