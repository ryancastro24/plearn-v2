"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BackArrowComponent from "../../admin/LearningHubAdmin Components/BackArrowComponent";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getSpecificSectionActivityQuery } from "@/lib/sectionActivitiesQueryOptions";
import { getAllActivitySlidesQuery } from "@/lib/sectionActivitySlidesQueryOptions";

const CHANNEL_NAME = "activity-presentation-channel";

type SlideCategory =
  | "explanation"
  | "quiz"
  | "spelling"
  | "true/false"
  | "fillinblank";

interface ActivitySlide {
  _id: string;
  category: SlideCategory;

  discussion: string;

  question: string;

  correct_answer: string;

  option1: string;
  option2: string;
  option3: string;

  spelling_word: string;
  spelling_mode: string;

  slideDuration: number;

  order: number;

  activityId: string;

  createdAt: string;
  updatedAt: string;
}

type ChannelMessage = {
  type: "CHANGE_SLIDE";
  payload: number;
};

const ActivityPresentationClientComponent = ({ activityid }: any) => {
  const { data: activityDetailsData } = useQuery(
    getSpecificSectionActivityQuery(activityid),
  );

  const { data: slidesData, isLoading } = useQuery(
    getAllActivitySlidesQuery(activityid),
  );

  const activityDetails = activityDetailsData?.data || null;

  // ✅ SORTED DYNAMIC SLIDES
  const slides: ActivitySlide[] = useMemo(() => {
    const rawSlides = slidesData?.data || [];

    return [...rawSlides].sort(
      (a: ActivitySlide, b: ActivitySlide) => a.order - b.order,
    );
  }, [slidesData]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresentationWindow, setIsPresentationWindow] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [spellingResult, setSpellingResult] = useState<
    "correct" | "wrong" | null
  >(null);
  const [fillBlankAnswer, setFillBlankAnswer] = useState("");
  const [fillBlankResult, setFillBlankResult] = useState<
    "correct" | "wrong" | null
  >(null);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  // ✅ TIMER
  const [remainingTime, setRemainingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // ✅ Broadcast Channel
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [showAnswerResult, setShowAnswerResult] = useState(false);
  // ✅ Initialize Broadcast Channel
  useEffect(() => {
    if (typeof window === "undefined") return;

    const channel = new BroadcastChannel(CHANNEL_NAME);

    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<ChannelMessage>) => {
      const data = event.data;

      if (data.type === "CHANGE_SLIDE") {
        setCurrentSlide(data.payload);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  // ✅ Detect Presentation Window
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const presentationMode = params.get("presentation");

    if (presentationMode === "true") {
      setIsPresentationWindow(true);
    }
  }, []);

  // ✅ Fullscreen Detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // ✅ TIMER EFFECT
  useEffect(() => {
    if (!slides.length) return;

    const current = slides[currentSlide];

    const duration = current?.slideDuration || 0;

    setRemainingTime(duration);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentSlide, slides]);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowAnswerResult(false);
    setFillBlankAnswer("");
    setFillBlankResult(null);
  }, [currentSlide]);

  // ✅ Open Presentation Window
  const openPresentationWindow = useCallback(() => {
    if (typeof window === "undefined") return;

    const url = `${window.location.pathname}?presentation=true`;

    const newWindow = window.open(url, "_blank");

    if (!newWindow) {
      alert("Popup blocked. Please allow popups.");

      return;
    }

    newWindow.focus();
  }, []);

  // ✅ Change Slide
  const changeSlide = useCallback((index: number) => {
    setCurrentSlide(index);

    channelRef.current?.postMessage({
      type: "CHANGE_SLIDE",
      payload: index,
    });
  }, []);

  // ✅ Next Slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev < slides.length - 1 ? prev + 1 : prev;

      channelRef.current?.postMessage({
        type: "CHANGE_SLIDE",
        payload: next,
      });

      return next;
    });
  }, [slides.length]);

  // ✅ Previous Slide
  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev > 0 ? prev - 1 : 0;

      channelRef.current?.postMessage({
        type: "CHANGE_SLIDE",
        payload: next,
      });

      return next;
    });
  }, []);

  // ✅ Fullscreen
  const enterFullscreen = async () => {
    try {
      const elem = document.documentElement;

      if (elem.requestFullscreen && !document.fullscreenElement) {
        await elem.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen failed:", error);
    }
  };

  // ✅ Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }

      if (event.key === "f") {
        enterFullscreen();
      }

      if (event.key === "Escape") {
        document.exitFullscreen?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, previousSlide]);

  const handlePlaceLetter = (letter: string, index: number) => {
    setPlacedLetters((prev) => [...prev, letter]);

    setShuffledLetters((prev) => prev.filter((_, i) => i !== index));
  };

  const checkSpelling = () => {
    const answer = placedLetters.join("");

    if (answer === current.spelling_word) {
      setSpellingResult("correct");
    } else {
      setSpellingResult("wrong");

      // auto reset after wrong
      setTimeout(() => {
        setPlacedLetters([]);
        setShuffledLetters(
          current.spelling_word.split("").sort(() => Math.random() - 0.5),
        );
        setSpellingResult(null);
      }, 1200);
    }
  };

  const checkTypedSpelling = () => {
    if (
      typedAnswer.trim().toLowerCase() === current.spelling_word.toLowerCase()
    ) {
      setSpellingResult("correct");

      setTimeout(() => {
        nextSlide();
      }, 1500);
    } else {
      setSpellingResult("wrong");

      setTimeout(() => {
        setTypedAnswer("");
        setSpellingResult(null);
      }, 1200);
    }
  };

  const handleReturnLetter = (letter: string, index: number) => {
    setShuffledLetters((prev) => [...prev, letter]);

    setPlacedLetters((prev) => prev.filter((_, i) => i !== index));
  };
  const current = slides[currentSlide];

  const checkFillBlank = () => {
    const isCorrect =
      fillBlankAnswer.trim().toLowerCase() ===
      current.correct_answer.trim().toLowerCase();

    if (isCorrect) {
      setFillBlankResult("correct");

      setTimeout(() => {
        setFillBlankAnswer("");
        setFillBlankResult(null);
        nextSlide();
      }, 1500);
    } else {
      setFillBlankResult("wrong");

      setTimeout(() => {
        setFillBlankResult(null);
      }, 1200);
    }
  };

  useEffect(() => {
    setTypedAnswer("");
    setSpellingResult(null);
    setPlacedLetters([]);

    if (current?.category === "spelling") {
      const letters = current.spelling_word.split("");
      setShuffledLetters([...letters].sort(() => Math.random() - 0.5));
    }
  }, [currentSlide, current]);

  const shuffledFillBlankOptions = useMemo(() => {
    if (!current || current.category !== "fillinblank") {
      return [];
    }

    const options = [
      current.correct_answer,
      current.option1,
      current.option2,
      current.option3,
    ].filter(Boolean);

    const uniqueOptions = [...new Set(options)];

    return uniqueOptions.sort(() => Math.random() - 0.5);
  }, [current]);

  const fillBlankDisplayQuestion = useMemo(() => {
    if (current?.category !== "fillinblank") {
      return "";
    }

    // replace blank with selected correct answer
    if (showAnswerResult && selectedAnswer === current.correct_answer) {
      return current.question.replace(
        "_____",
        current.correct_answer.toUpperCase(),
      );
    }

    return current.question;
  }, [current, selectedAnswer, showAnswerResult]);

  const shuffledQuizOptions = useMemo(() => {
    if (!current || current.category !== "quiz") {
      return [];
    }

    const options = [
      current.correct_answer,
      current.option1,
      current.option2,
      current.option3,
    ].filter(Boolean);

    // Remove duplicates
    const uniqueOptions = [...new Set(options)];

    // Shuffle
    return uniqueOptions.sort(() => Math.random() - 0.5);
  }, [current]);
  // ✅ Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading presentation...
      </div>
    );
  }

  // ✅ Empty State
  if (!slides.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No slides available.
      </div>
    );
  }

  // ✅ PRESENTATION SCREEN
  if (isPresentationWindow) {
    return (
      <div
        className="
          fixed
          inset-0
          z-999999
          bg-black
          text-white
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >
        {/* Fullscreen */}
        {!isFullscreen && (
          <button
            type="button"
            onClick={enterFullscreen}
            className="
              absolute
              top-5
              right-5
              z-50
              bg-white
              text-black
              px-5
              py-3
              rounded-xl
              font-semibold
              shadow-lg
              hover:opacity-90
              transition
            "
          >
            Enter Fullscreen
          </button>
        )}

        {/* Timer */}
        <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl">
          <p className="text-lg font-bold">⏱ {remainingTime}s</p>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-6 right-8 text-lg opacity-70">
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Slide Category */}
        <div className="absolute top-5 right-40 bg-white/10 px-4 py-2 rounded-xl capitalize">
          {current.category}
        </div>

        {/* Content */}
        <div className="w-full h-full flex items-center justify-center px-10">
          {/* Explanation */}
          {current.category === "explanation" && (
            <div className="max-w-6xl text-center">
              <h1 className="text-6xl md:text-8xl font-black leading-tight">
                {current.discussion}
              </h1>
            </div>
          )}

          {/* Quiz */}
          {/* Quiz */}
          {current.category === "quiz" && (
            <div className="w-full max-w-6xl">
              {/* Question */}
              <h1 className="text-4xl md:text-6xl font-black text-center mb-16 leading-tight">
                {current.question}
              </h1>

              {/* Choices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {shuffledQuizOptions.map((option, index) => {
                  const isCorrect = option === current.correct_answer;

                  const isSelected = selectedAnswer === option;

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={showAnswerResult}
                      onClick={() => {
                        setSelectedAnswer(option);
                        setShowAnswerResult(true);
                        if (option === current.correct_answer) {
                          setTimeout(() => {
                            nextSlide();
                          }, 2000);
                        }
                      }}
                      className={`
              rounded-3xl
              p-10
              text-2xl
              md:text-3xl
              font-bold
              text-center
              transition-all
              duration-300
              border-2

              ${
                !showAnswerResult
                  ? `
                    bg-white/10
                    border-white/20
                    hover:scale-[1.02]
                    hover:bg-white/20
                  `
                  : isCorrect
                    ? `
                      bg-green-600
                      border-green-400
                      text-white
                    `
                    : isSelected
                      ? `
                        bg-red-600
                        border-red-400
                        text-white
                      `
                      : `
                        bg-white/10
                        border-white/10
                        opacity-40
                      `
              }
            `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Result */}
              {showAnswerResult && (
                <div className="mt-10 text-center">
                  {selectedAnswer === current.correct_answer ? (
                    <p className="text-green-400 text-3xl font-black">
                      ✅ Correct Answer
                    </p>
                  ) : (
                    <div>
                      <p className="text-red-400 text-3xl font-black">
                        ❌ Wrong Answer
                      </p>

                      <p className="mt-4 text-2xl opacity-90">
                        Correct Answer:{" "}
                        <span className="font-bold text-green-400">
                          {current.correct_answer}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Spelling */}

          {current.category === "spelling" && (
            <div className="text-center max-w-5xl w-full">
              <h1 className="text-xl md:text-7xl  mb-8">Spell the Word</h1>

              <h2 className="text-5xl md:text-7xl font-black mb-10">
                {current.spelling_word}
              </h2>

              {/* SHOW MODE */}
              <p className="mb-6 text-xl opacity-70 capitalize">
                Mode: {current.spelling_mode}
              </p>

              {/* RESULT */}
              {spellingResult === "correct" && (
                <p className="text-green-400 text-3xl font-black mb-6">
                  🎉 Congratulations!
                </p>
              )}

              {spellingResult === "wrong" && (
                <p className="text-red-400 text-3xl font-black mb-6">
                  ❌ Try Again
                </p>
              )}

              {/* ================= SHUFFLE MODE ================= */}
              {current.spelling_mode === "shuffle" && (
                <div className="space-y-10">
                  {/* ANSWER BOX */}
                  <div className="flex justify-center gap-3 flex-wrap">
                    {placedLetters.map((letter, i) => (
                      <div
                        key={i}
                        onClick={() => handleReturnLetter(letter, i)}
                        className={`
                w-14 h-14 flex items-center justify-center
                text-2xl font-bold border rounded-xl cursor-pointer
                ${
                  spellingResult === "correct"
                    ? "bg-green-500 text-white"
                    : spellingResult === "wrong"
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                }
              `}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>

                  {/* SHUFFLE POOL */}
                  <div className="flex justify-center gap-3 flex-wrap">
                    {shuffledLetters.map((letter, i) => (
                      <div
                        key={i}
                        onClick={() => handlePlaceLetter(letter, i)}
                        className="
                w-14 h-14 flex items-center justify-center
                text-2xl font-bold border rounded-xl cursor-pointer text-black
                bg-gray-100 hover:bg-gray-200
              "
                      >
                        {letter}
                      </div>
                    ))}
                  </div>

                  {/* CHECK BUTTON */}
                  <Button
                    onClick={checkSpelling}
                    className="mt-6 px-6 py-3 bg-black text-white rounded-xl"
                  >
                    Check Answer
                  </Button>
                </div>
              )}

              {/* ================= TYPE MODE ================= */}
              {current.spelling_mode === "type" && (
                <div className="space-y-6">
                  <input
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    className={`
            w-full max-w-xl mx-auto text-center text-3xl p-4 rounded-xl border
            ${
              spellingResult === "correct"
                ? "border-green-500 bg-green-100"
                : spellingResult === "wrong"
                  ? "border-red-500 bg-red-100"
                  : ""
            }
          `}
                    placeholder="Type the correct spelling..."
                  />

                  <button
                    onClick={checkTypedSpelling}
                    className="px-6 py-3 bg-black text-white rounded-xl"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TRUE OR FALSE */}
          {current.category === "true/false" && (
            <div className="w-full max-w-5xl text-center">
              <h1 className="text-5xl md:text-7xl font-black mb-16 leading-tight">
                {current.question}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {["true", "false"].map((option) => {
                  const isCorrect =
                    option.toLowerCase() ===
                    current.correct_answer.toLowerCase();

                  const isSelected = selectedAnswer === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={showAnswerResult}
                      onClick={() => {
                        setSelectedAnswer(option);
                        setShowAnswerResult(true);

                        if (isCorrect) {
                          setTimeout(() => {
                            nextSlide();
                          }, 1500);
                        }
                      }}
                      className={`
              rounded-3xl
              p-10
              text-4xl
              font-black
              transition-all
              border-2

              ${
                !showAnswerResult
                  ? `
                    bg-white/10
                    border-white/20
                    hover:bg-white/20
                  `
                  : isCorrect
                    ? `
                      bg-green-600
                      border-green-400
                    `
                    : isSelected
                      ? `
                        bg-red-600
                        border-red-400
                      `
                      : `
                        opacity-40
                        bg-white/10
                      `
              }
            `}
                    >
                      {option.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              {/* RESULT */}
              {showAnswerResult && (
                <div className="mt-10">
                  {selectedAnswer?.toLowerCase() ===
                  current.correct_answer.toLowerCase() ? (
                    <p className="text-green-400 text-3xl font-bold">
                      ✅ Correct
                    </p>
                  ) : (
                    <p className="text-red-400 text-3xl font-bold">❌ Wrong</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* FILL IN THE BLANK */}
          {current.category === "fillinblank" && (
            <div className="w-full max-w-6xl">
              {/* QUESTION */}
              <h1
                className="
    text-5xl
    md:text-7xl
    font-black
    text-center
    mb-16
    leading-tight
    transition-all
    duration-300
    text-white
  "
              >
                {current.question.split("_____").map((part, index) => (
                  <span key={index}>
                    {part}

                    {index === 0 && (
                      <span
                        className={`
            inline-block
            transition-colors duration-300
            ${
              showAnswerResult
                ? selectedAnswer === current.correct_answer
                  ? "text-green-400 font-extrabold"
                  : "text-white"
                : "text-white"
            }
          `}
                      >
                        {showAnswerResult
                          ? current.correct_answer.toUpperCase()
                          : "_____"}
                      </span>
                    )}
                  </span>
                ))}
              </h1>
              {/* CHOICES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {shuffledFillBlankOptions.map((option, index) => {
                  const isCorrect = option === current.correct_answer;

                  const isSelected = selectedAnswer === option;

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={showAnswerResult}
                      onClick={() => {
                        setSelectedAnswer(option);
                        setShowAnswerResult(true);

                        if (isCorrect) {
                          setTimeout(() => {
                            nextSlide();
                          }, 1500);
                        }
                      }}
                      className={`
                rounded-3xl
                p-10
                text-2xl
                md:text-3xl
                font-bold
                text-center
                transition-all
                duration-300
                border-2

                ${
                  !showAnswerResult
                    ? `
                      bg-white/10
                      border-white/20
                      hover:scale-[1.02]
                      hover:bg-white/20
                    `
                    : isCorrect
                      ? `
                        bg-green-600
                        border-green-400
                        text-white
                      `
                      : isSelected
                        ? `
                          bg-red-600
                          border-red-400
                          text-white
                        `
                        : `
                          bg-white/10
                          border-white/10
                          opacity-40
                        `
                }
              `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* RESULT */}
              {showAnswerResult && (
                <div className="mt-10 text-center">
                  {selectedAnswer === current.correct_answer ? (
                    <p className="text-green-400 text-3xl font-black">
                      ✅ Correct Answer
                    </p>
                  ) : (
                    <div>
                      <p className="text-red-400 text-3xl font-black">
                        ❌ Wrong Answer
                      </p>

                      <p className="mt-4 text-2xl opacity-90">
                        Correct Answer:{" "}
                        <span className="font-bold text-green-400">
                          {current.correct_answer}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ✅ CONTROLLER SCREEN
  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <BackArrowComponent />
      </div>

      {/* Top */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            Activity Presentation Controller
          </h1>

          <p className="text-muted-foreground mt-2">
            Control the presentation in realtime.
          </p>
        </div>

        <button
          type="button"
          onClick={openPresentationWindow}
          className="
            bg-black
            text-white
            px-6
            py-4
            rounded-2xl
            font-semibold
            hover:opacity-90
            transition
            shadow-lg
          "
        >
          Open Presentation Screen
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-10">
        <button
          type="button"
          onClick={previousSlide}
          disabled={currentSlide === 0}
          className="
            border
            px-5
            py-3
            rounded-xl
            font-medium
            hover:bg-gray-100
            transition
            disabled:opacity-40
          "
        >
          Previous
        </button>

        <button
          type="button"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
            hover:opacity-90
            transition
            disabled:opacity-40
          "
        >
          Next
        </button>
      </div>

      {/* Slide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {slides.map((slide: ActivitySlide, index: number) => (
          <button
            key={slide._id}
            type="button"
            onClick={() => changeSlide(index)}
            className={`
                rounded-3xl
                border
                p-6
                text-left
                transition-all
                hover:shadow-xl
                ${
                  currentSlide === index
                    ? "bg-black text-white border-black scale-[1.02]"
                    : "bg-white border-gray-200"
                }
              `}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm opacity-70">Slide {index + 1}</span>

              <span className="text-xs uppercase px-3 py-1 rounded-full bg-white/10 border">
                {slide.category}
              </span>
            </div>

            {slide.category === "explanation" && (
              <h2 className="text-3xl font-bold leading-tight">
                {slide.discussion}
              </h2>
            )}

            {slide.category === "quiz" && (
              <>
                <h2 className="text-2xl font-bold mb-5">{slide.question}</h2>

                <div className="space-y-2">
                  {[slide.option1, slide.option2, slide.option3]
                    .filter(Boolean)
                    .map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="text-sm opacity-80 border rounded-xl px-4 py-3"
                      >
                        {option}
                      </div>
                    ))}
                </div>
              </>
            )}

            {slide.category === "spelling" && (
              <div className="text-center max-w-5xl w-full">
                <h1 className=" mb-8">Spell the Word</h1>

                <h2 className="text-4xl font-black mb-10">
                  {slide.spelling_word}
                </h2>

                {/* SHOW MODE */}
                <p className="mb-6 text-xl opacity-70 capitalize">
                  Mode: {slide.spelling_mode}
                </p>
              </div>
            )}

            <div className="mt-6 text-sm opacity-60">
              Duration: {slide.slideDuration}s
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityPresentationClientComponent;
