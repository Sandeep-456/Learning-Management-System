import useZoomLink from "../hooks/useZoomLink";
import Live from "../assets/Live.jpg";

export default function LiveClasses() {
  const { zoomLink: actualZoomLink } = useZoomLink();
  const dummyZoomLink = "https://zoom.us/j/1234567890";
  const zoomLink = actualZoomLink || dummyZoomLink;

  const joinZoom = () => {
    window.open(zoomLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 px-6 py-10">
      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-violet-900">Live Classes</h1>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Join interactive live sessions, ask doubts in real-time, and master
          full-stack development with expert guidance.
        </p>

        {/* MAIN CARD */}
        <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 flex flex-col lg:flex-row gap-10">
          {/* LEFT – IMAGE + STATUS */}
          <div className="w-full lg:w-1/2 relative">
            <img
              src={Live}
              alt="Live MERN Class"
              className="rounded-2xl w-full h-full object-cover"
            />

            {/* LIVE BADGE */}
            <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              ● LIVE / DAILY
            </span>
          </div>

          {/* RIGHT – CONTENT */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* COURSE INFO */}
            <div>
              <h2 className="text-2xl font-semibold text-violet-900">
                MERN Stack Development – Live Program
              </h2>
              <p className="text-slate-600 mt-1">
                Learn MongoDB, Express, React & Node.js by building real-world
                projects.
              </p>
            </div>

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-2">
              {[
                "MongoDB",
                "Express.js",
                "React.js",
                "Node.js",
                "JWT",
                "REST APIs",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-violet-100 text-violet-800 text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* INSTRUCTOR */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">Instructor</p>
              <p className="font-semibold text-slate-800">
                Rahul Sharma (Senior MERN Developer)
              </p>
              <p className="text-sm text-slate-600">
                6+ years industry experience • Worked on scalable SaaS products
              </p>
            </div>

            {/* SCHEDULE */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-violet-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Class Time</p>
                <p className="font-semibold text-violet-900">
                  7:00 PM – 9:00 PM (IST)
                </p>
              </div>

              <div className="bg-violet-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Duration</p>
                <p className="font-semibold text-violet-900">2 Hours / Day</p>
              </div>
            </div>

            {/* GUIDELINES */}
            <div>
              <h3 className="font-semibold text-violet-900 mb-2">
                📘 Live Class Guidelines
              </h3>
              <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li>Join 5 minutes before the session starts</li>
                <li>Keep your microphone muted unless instructed</li>
                <li>Use chat for questions & doubts</li>
                <li>Session recordings provided after class</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={joinZoom}
                className="w-full bg-violet-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-violet-800 hover:shadow-xl transition"
              >
                🚀 Join Live Class
              </button>

              {!actualZoomLink && (
                <p className="text-center text-xs text-gray-500 mt-2">
                  * Demo link shown. Actual live link will be updated.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
