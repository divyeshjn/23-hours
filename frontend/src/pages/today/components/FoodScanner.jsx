import { useRef } from "react";

import {
  Camera,
  ImagePlus,
  LoaderCircle,
  Sparkles,
  ArrowLeft
} from "lucide-react";

import useFoodAnalysis from "../hooks/useFoodAnalysis";

export default function FoodScanner({
  onResult,
  onBack
}) {
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  const {
    analyse,
    analysing,
    error,
    cancel
  } = useFoodAnalysis();

  async function handleImage(event) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    const result = await analyse(file);

    if (result) {
      onResult(result);
    }
  }

  function handleBack() {
    cancel();
    onBack();
  }

  return (
    <div className="flex flex-col gap-4">

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
        disabled={analysing}
        className="hidden"
      />

      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        onChange={handleImage}
        disabled={analysing}
        className="hidden"
      />

      {analysing ? (

        <div className="flex flex-col
          items-center justify-center
          text-center gap-4 py-12">

          <div className="relative flex
            items-center justify-center
            w-20 h-20">

            <LoaderCircle
              size={76}
              strokeWidth={1.5}
              className="absolute text-sage
                animate-spin"
            />

            <Sparkles
              size={28}
              className="text-primary"
            />

          </div>

          <h3 className="font-heading
            font-bold text-lg">

            Analysing your meal...

          </h3>

          <p className="text-sm text-muted
            max-w-xs">

            Calculating estimated calories
            and protein from your photograph.

          </p>

        </div>

      ) : (

        <>

          <div className="flex flex-col
            items-center text-center gap-3
            rounded-2xl border-2 border-dashed
            border-sage bg-background py-8 px-4">

            <Camera
              size={42}
              strokeWidth={1.5}
              className="text-primary"
            />

            <h3 className="font-semibold">
              Scan your meal
            </h3>

            <p className="text-xs text-muted">
              Keep the entire meal visible
              for a better estimate.
            </p>

          </div>

          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="flex items-center
              justify-center gap-2 bg-primary
              text-white rounded-xl py-3.5
              font-semibold"
          >

            <Camera size={19} />

            Take photo

          </button>

          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            className="flex items-center
              justify-center gap-2 border
              border-border rounded-xl
              py-3.5 font-medium"
          >

            <ImagePlus size={19} />

            Choose from gallery

          </button>

        </>

      )}

      {error && (
        <p
          role="alert"
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleBack}
        className="flex items-center
          justify-center gap-2 text-sm
          text-muted py-2"
      >

        <ArrowLeft size={16} />

        {analysing ? "Cancel" : "Back"}

      </button>

    </div>
  );
}