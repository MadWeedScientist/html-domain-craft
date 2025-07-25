import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProfileNotificationRequest {
  businessName: string;
  email: string;
  description: string;
  imageCount: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessName, email, description, imageCount }: ProfileNotificationRequest = await req.json();

    console.log("Sending notification email for:", businessName);

    const emailResponse = await resend.emails.send({
      from: "Shake Finder <onboarding@resend.dev>",
      to: ["madweedscientist@gmail.com"], // Your email
      subject: `New Business Profile Submitted: ${businessName}`,
      html: `
        <h1>New Business Profile Submission</h1>
        <h2>Business Details:</h2>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Contact Email:</strong> ${email}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
        <p><strong>Images Submitted:</strong> ${imageCount} images</p>
        
        <hr>
        <p><small>Log into your admin panel to review and manage this submission.</small></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);