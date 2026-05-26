import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import {
  activateSubscription,
} from "../services/subscriptionService";

function ActivationPage() {

  const { activationCode } =
    useParams();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [successData, setSuccessData] =
    useState(null);

  const [error, setError] =
    useState("");

  const [agreed, setAgreed] =
    useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);

  }, []);

  const handleActivate = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await activateSubscription(
          activationCode,
        );

      setSuccessData(response.data);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Activation failed",
      );

    } finally {

      setLoading(false);

    }
  };

  if (pageLoading) {

    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">

        <p className="text-lg font-semibold">
          Loading...
        </p>

      </div>
    );
  }

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

          {!successData ? (
            <>
              <div className="mb-8">

                <h2 className="text-xl font-bold mb-4">
                  Indico x Netplay
                </h2>

                <p className="text-red-500 font-semibold mb-4">
                  Benefit Netplay Anda hanya dapat digunakan setelah login/signup Netplay dan diindico Anda dihubungkan.
                </p>

                <div className="text-sm text-gray-300 space-y-4">

                  <div>
                    <p className="font-semibold mb-1">
                      Syarat & Ketentuan
                    </p>

                    <ul className="list-decimal pl-5 space-y-2 text-gray-400">

                      <li>
                        Pelanggan otomatis berlangganan NETPLAY PREMIUM BULANAN selama 24 bulan terhitung sejak pembelian paket Netplay Premium Indico x Netplay.
                      </li>

                      <li>
                        Pelanggan otomatis berlangganan NETPLAY PREMIUM BULANAN selama 24 bulan terhitung sejak berlangganan paket Netplay Premium.
                      </li>

                      <li>
                        Pelanggan dapat berhenti kapan saja dengan mengakses: netplay.com/account, kemudian pilih “Kelola Langganan” untuk selanjutnya pilih “Batalkan langganan”
                      </li>

                      <li>
                        Informasi lebih lengkap dapat diakses di https://tsel.id/ atau menghubungi Call Center 188.
                      </li>

                    </ul>
                  </div>

                </div>

              </div>

              <div className="bg-zinc-900 rounded-2xl p-5 mt-10">

              <h3 className="text-center font-bold text-lg mb-6">
                PEMBERITAHUAN
              </h3>

              <div className="flex items-start gap-4">

                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  Dengan membeli paket ini, Anda menyetujui untuk
                  berlangganan Netplay Premium sesuai dengan
                  syarat dan ketentuan yang berlaku.
                </p>

                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) =>
                    setAgreed(e.target.checked)
                  }
                  className="w-5 h-5 mt-1 accent-red-600"
                />

              </div>

            </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-xl p-4 text-sm mb-6">
                  {error}
                </div>
              )}
            </>
          ) : (

            <div className="flex flex-col items-center text-center mt-20">

              <h2 className="text-3xl font-bold mb-4">
                Aktivasi Sukses!
              </h2>

              <p className="text-gray-400 mb-10">
                Langganan Netplay Premium bulanan Anda telah aktif.
              </p>

              <div className="bg-zinc-900 rounded-2xl p-5 w-full text-left space-y-3">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Status
                  </span>

                  <span className="text-green-400 font-semibold">
                    {successData.subscriptionStatus}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Plan
                  </span>

                  <span>
                    {successData.plan}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Provider
                  </span>

                  <span>
                    {successData.provider}
                  </span>
                </div>

              </div>

            </div>

          )}

        </div>

        <div className="p-6">

          {successData ? (

            <button
              className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 rounded-full"
            >
              Buka Netplay
            </button>

          ) : (

            <button
              onClick={handleActivate}
              disabled={loading || !agreed}
              className="
                w-full
                transition
                text-white
                font-semibold
                py-4
                rounded-full
                bg-red-600
                hover:bg-red-700
                disabled:bg-zinc-700
                disabled:text-zinc-400
              "
            >

              {loading
                ? "Mengaktivasi..."
                : "Aktivasi Sekarang"}

            </button>

          )}

        </div>

      </div>

    </div>
  );
}

export default ActivationPage;