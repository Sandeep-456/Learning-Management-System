import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mcqData from "../data/mcqData";
import MCQTestHeader from "../components/MCQTest/MCQTestHeader";
import MCQQuestionArea from "../components/MCQTest/MCQQuestionArea";
import MCQQuestionGrid from "../components/MCQTest/MCQQuestionGrid";
import MCQInstructions from "../components/MCQTest/MCQInstructions";
import MCQSubmitModal from "../components/MCQTest/MCQSubmitModal";
import MCQReportModal from "../components/MCQTest/MCQReportModal";

export default function MCQTest() {
  const { topicName } = useParams();
  const navigate = useNavigate();

  const TOTAL_QUESTIONS = mcqData.length;
  const TOTAL_TIME = 30 * 60; // seconds

  // --- state
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const [current, setCurrent] = useState(0); // current question index
  const [answers, setAnswers] = useState({}); // { index: optionIndex }
  const [selected, setSelected] = useState(null); // current selection (mirror of answers[current])
  const [marked, setMarked] = useState({}); // { index: true } marked for review

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [report, setReport] = useState(null);

  // Timer
  useEffect(() => {
    if (!testStarted || testCompleted) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          submitAndComputeReport(); // auto-submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testStarted, testCompleted]);

  useEffect(() => {
    // auto start test immediately on page load
    setTestStarted(true);
    setTestCompleted(false);
    setCurrent(0);
    setSelected(answers[0] ?? null);
    setTimeLeft(TOTAL_TIME);
    // eslint-disable-next-line
  }, []);

  // helpers
  const formatTime = (secs = timeLeft) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSelect = (optIdx) => {
    setSelected(optIdx);
    setAnswers((prev) => ({ ...prev, [current]: optIdx }));
    // if user selected, ensure marked is not automatically removed; marking is separate
  };

  const next = () => {
    if (selected === null) return; // enforced by requirement
    if (current < TOTAL_QUESTIONS - 1) {
      const nextIdx = current + 1;
      setCurrent(nextIdx);
      setSelected(answers[nextIdx] ?? null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prev = () => {
    if (current > 0) {
      const prevIdx = current - 1;
      setCurrent(prevIdx);
      setSelected(answers[prevIdx] ?? null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleMark = (idx) => {
    setMarked((prev) => {
      const copy = { ...prev };
      if (copy[idx]) delete copy[idx];
      else copy[idx] = true;
      return copy;
    });
  };

  const clearAnswer = (idx) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
    if (idx === current) setSelected(null);
  };

  // compute live summary (for the submit modal)
  const computeLiveSummary = () => {
    const answered = Object.keys(answers).length;
    const markedCount = Object.keys(marked).length;
    const unread = TOTAL_QUESTIONS - answered;
    return { answered, markedCount, unread };
  };

  // final submission and report calculation
  const submitAndComputeReport = () => {
    // calculate correct, wrong, etc.
    let correct = 0;
    let wrong = 0;
    let answered = 0;

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const a = answers[i];
      if (a !== undefined && a !== null) {
        answered++;
        if (a === mcqData[i].correctAnswer) correct++;
        else wrong++;
      }
    }

    const unread = TOTAL_QUESTIONS - answered;
    const markedCount = Object.keys(marked).length;

    const summary = {
      score: correct,
      percentage: (correct / TOTAL_QUESTIONS) * 100,
      attempted: answered,
      unread,
      marked: markedCount,
      correct,
      wrong,
      timeTaken: TOTAL_TIME - timeLeft,
    };

    setReport(summary);
    setTestCompleted(true);
    setTestStarted(false);
    setShowSubmitModal(false);
    setShowReportModal(true);
  };

  // progress bar color logic
  const progressPct = (timeLeft / TOTAL_TIME) * 100;
  // blue/indigo gradient until last 5 minutes -> red
  const progressColorClass =
    timeLeft <= 5 * 60 ?
      "bg-red-500"
    : "bg-gradient-to-r from-blue-400 to-indigo-600";

  // progress count for header
  const progressCount = `${
    Object.keys(answers).length
  } / ${TOTAL_QUESTIONS} answered`;

  // --- RENDERING
  return (
    <div className="min-h-screen bg-indigo-50">
      <MCQTestHeader
        topicName={topicName}
        progressCount={progressCount}
        formatTime={formatTime}
        setShowSubmitModal={setShowSubmitModal}
        timeLeft={timeLeft}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-3 gap-6">
        <MCQQuestionArea
          current={current}
          mcqData={mcqData}
          selected={selected}
          handleSelect={handleSelect}
          prev={prev}
          next={next}
          toggleMark={toggleMark}
          marked={marked}
          clearAnswer={clearAnswer}
          TOTAL_QUESTIONS={TOTAL_QUESTIONS}
          progressPct={progressPct}
          progressColorClass={progressColorClass}
          setShowSubmitModal={setShowSubmitModal}
          answers={answers}
        />

        <aside className="col-span-1">
          <MCQQuestionGrid
            TOTAL_QUESTIONS={TOTAL_QUESTIONS}
            current={current}
            answers={answers}
            marked={marked}
            setCurrent={setCurrent}
            setSelected={setSelected}
          />
          <MCQInstructions />
        </aside>
      </main>

      <MCQSubmitModal
        showSubmitModal={showSubmitModal}
        setShowSubmitModal={setShowSubmitModal}
        computeLiveSummary={computeLiveSummary}
        formatTime={formatTime}
        submitAndComputeReport={submitAndComputeReport}
      />

      <MCQReportModal
        showReportModal={showReportModal}
        setShowReportModal={setShowReportModal}
        report={report}
        topicName={topicName}
        TOTAL_QUESTIONS={TOTAL_QUESTIONS}
        navigate={navigate}
      />
    </div>
  );
}
