import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { createUser } from "@/lib/actions/user.actions";

const webhookSecret: string = process.env.CLERK_CREATE_USER || "";

export async function POST(req: Request) {
  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    return new Response("Error occurred", {
      status: 400,
    });
  }
  // Create an object of the headers
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (_) {
    console.log("error");
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    const emailData = evt.data as {
      email_addresses?: { email_address: string }[];
    };

    if (emailData.email_addresses && emailData.email_addresses.length > 0) {
   
    createUser({
        id : evt?.data.id , 
        name : `${evt?.data.first_name ? evt?.data.first_name : ""} ${evt?.data.last_name ? evt?.data.last_name : ""}`, 
        image: evt?.data.image_url, 
        email: evt?.data.email_addresses[0].email_address, 
        username : evt?.data.username ?  evt?.data.username  : "test_ho_raha_hai"});
    
    }
  }

  return new Response("", {
    status: 201,
  });
}