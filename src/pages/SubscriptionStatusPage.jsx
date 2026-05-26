import { useState } from "react";

import {
  getSubscriptionStatus,
} from "../services/subscriptionService";

function SubscriptionStatusPage() {

  const [activationToken, setActivationToken] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [data, setData] =
    useState(null);

  const [error, setError] =
    useState("");

  const handleCheckStatus = async () => {

    try {

      setLoading(true);
      setError("");
      setData(null);

      const response =
        await getSubscriptionStatus(
          activationToken,
        );

      setData(response.data);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Failed to get subscription status",
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">

      <div className="w-full max-w-md min-h-screen flex flex-col">

        <div className="flex-1 px-6 pt-16">

          <div className="flex justify-center mb-12">

            <div className="text-center">

              <h1 className="text-5xl font-extrabold text-red-600 tracking-wide">
                NETPLAY
              </h1>

              <p className="text-sm text-gray-400 mt-2">
                ORIGINALS
              </p>

            </div>

          </div>

          <div className="mb-8">

            <h2 className="text-2xl font-bold mb-2">
              Subscription Status
            </h2>

            <p className="text-gray-400">
              Check Netplay Premium subscription status kamu.
            </p>

          </div>

          <div className="mb-6">

            <label className="block text-sm text-gray-300 mb-3">
              Activation Token
            </label>

            <input
              type="text"
              value={activationToken}
              onChange={(e) =>
                setActivationToken(
                  e.target.value,
                )
              }
              placeholder="Masukkan activation token"
              className="
                w-full
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                px-4
                py-4
                text-white
                outline-none
                focus:border-red-600
              "
            />

          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-2xl p-4 text-sm mb-6">
              {error}
            </div>
          )}

          {data && (

            <div className="bg-zinc-900 rounded-2xl p-5 space-y-4 border border-zinc-800">

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Status
                </span>

                <span className="text-green-400 font-semibold">
                  {data.subscriptionStatus}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Provider
                </span>

                <span className="font-semibold">
                  {data.provider}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Plan
                </span>

                <span className="font-semibold">
                  {data.plan}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-400">
                  External Ref
                </span>

                <span className="font-semibold text-right break-all">
                  {data.externalReferenceId}
                </span>
              </div>

            </div>

          )}

        </div>

        <div className="p-6">

          <button
            onClick={handleCheckStatus}
            disabled={loading || !activationToken}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              disabled:bg-zinc-700
              disabled:text-zinc-400
              transition-all
              duration-200
              text-white
              font-semibold
              py-4
              rounded-full
            "
          >

            {loading
              ? "Checking..."
              : "Cek Status"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default SubscriptionStatusPage;