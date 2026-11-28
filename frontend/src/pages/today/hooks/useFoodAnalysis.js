import {
  useState,
  useRef,
  useEffect
} from "react";

import {
  analyseFoodImage
} from "../../../services/foodAnalysisService";

import {
  compressFoodImage
} from "../../../utils/compressFoodImage";

export default function useFoodAnalysis() {
  const [analysing, setAnalysing] = useState(false);
  const [error, setError] = useState("");

  const requestRef = useRef(null);

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
      requestRef.current = null;
    };
  }, []);

  async function analyse(file) {
    if (!file || requestRef.current) {
      return null;
    }

    const controller = new AbortController();

    requestRef.current = controller;

    setAnalysing(true);
    setError("");

    try {
      const compressed = await compressFoodImage(file);

      if (controller.signal.aborted) {
        return null;
      }

      const result = await analyseFoodImage(
        compressed,
        controller.signal
      );

      return controller.signal.aborted
        ? null
        : result;

    } catch (err) {
      if (!controller.signal.aborted) {
        setError(
          err.message || "Unable to analyse food."
        );
      }

      return null;

    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setAnalysing(false);
      }
    }
  }

  function cancel() {
    requestRef.current?.abort();
    requestRef.current = null;

    setAnalysing(false);
    setError("");
  }

  return {
    analyse,
    analysing,
    error,
    cancel
  };
}