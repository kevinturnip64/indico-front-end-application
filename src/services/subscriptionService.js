import client from "../api/client";

export async function activateSubscription(
  activationCode,
) {
  const response = await client.post(
    "/subscriptions/activate",
    {
      activationCode,
    },
  );

  return response.data;
}

export async function getSubscriptionStatus(
  activationToken,
) {

  const response = await client.get(
    `/subscriptions/subscription-status?activationToken=${activationToken}`
  );

  return response.data;
}