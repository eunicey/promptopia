import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const {userId, prompt, tag} = await req.json();

  try {
    await connectToDB(); // have to call this every time b/c it's a lamda function meaning it stops once it's done its job 
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    })

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201})

  } catch (error) {
    return new Response("Failed to create a new prompt", {status: 500})
  }
}

