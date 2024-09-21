export const generateImage = async (prompt: string) => {
    console.log("Inside image generation method");
  
    const apiUrl = "https://api.openai.com/v1/images/generations";
    const apiKey = process.env.OPENAI_API_KEY;
  
    if (!apiKey) {
      throw new Error("OpenAI API key is not set");
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API Error Response:", errorData);
        throw new Error(`Failed to generate image: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("API Response Data:", data);
  
      if (data?.data?.length > 0) {
        return data.data.map((item: { url: string }) => item.url);
      }
  
      throw new Error("No image data received");
    } catch (error) {
      console.error("Error in generateImage:", error);
      throw error;
    }
  };