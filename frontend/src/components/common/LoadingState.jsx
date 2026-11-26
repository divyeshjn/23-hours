export default function LoadingState({
  message = "Loading..."
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="w-9 h-9 border-4 border-[#A8BBA2] border-t-[#354F40] rounded-full animate-spin" />

      <p className="mt-4 text-sm text-[#858780]">
        {message}
      </p>

    </div>
  );
}